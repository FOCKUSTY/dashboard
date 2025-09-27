'use client'

import styles from "./page.module.css";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { fetchRoles, fetchWebhooks } from "api/fetch-guild-data";
import { fetchGuild } from "api/fetch-guilds";
import { fetchUser } from "api/fetch-user";
import { validateCookies } from "api/validate-cookies";

import type { IGuild } from "types/guild.type";
import type { IUser } from "types/user.type";
import type { IConfig } from "types/config.type";
import type { APIRole, APIWebhook } from "discord.js";

import { Dropdown } from "components/dropdown";
import { Api } from "api";
import { useList } from "hooks/list.hook";

const settings: {
  guild: [keyof IConfig["guild"], string][];
  logging: [keyof IConfig["logging"], string][];
} = {
  guild: [
    ["when_user_join_into_guild_grant_roles", "Награждать ролями при входе"],
    ["when_user_join_into_guild_send_hello_message_to_channel", "Отправлять сообщение в канал при входе"],
    ["when_user_join_into_guild_send_message_to_user", "Отправлять сообщение пользователю при входе"],
    ["when_user_leave_from_guild_send_goodbye_message_to_channel", "Отправлять сообщение в канал при выходе"],
    ["when_user_leave_from_guild_send_message_to_user", "Отправлять сообщение пользователю при выходе"]
  ],
  logging: [
    ["when_bot_join_into_guild_send_log_into_channel", "При входе бота"],
    ["when_bot_leave_from_guild_send_log_into_channel", "При выходе бота"],
    ["when_user_join_into_guild_send_log_into_channel", "При входе пользователя"],
    ["when_user_leave_from_guild_send_log_into_channel", "При выходе пользователя"],
    ["when_message_was_sended_send_log_into_channel", "При отправки сообщения"],
    ["when_message_was_changed_send_log_into_channel", "При изменении сообщения"],
    ["when_message_was_deleted_send_log_into_channel", "При удалении сообщения"],
    ["when_user_change_profile_send_log_into_channel", "При изменении профиля пользователем"],
    ["when_user_change_activity_send_log_into_channel", "При изменении статуса пользователем"],
    ["when_user_takes_mute_send_log_into_channel", "При мьюте пользователя"],
    ["when_user_takes_ban_send_log_into_channel", "При бане пользователя"],
    ["when_roles_changes_at_user_send_log_into_channel", "При изменении ролей пользователя"],
    ["when_guild_profile_changes_send_log_into_channel", "При изменении профиля гильдии"]
  ]
} as const;

type DataType = Record<"webhooks"|"roles", {
  guild: Partial<Record<keyof IConfig["guild"], {[key: string]: unknown}>>,
  logging: Partial<Record<keyof IConfig["logging"], {[key: string]: unknown}>>
}>;
type LazyDataType = Record<"webhooks"|"roles", {
  [key: string]: Partial<Record<keyof IConfig["logging"] | keyof IConfig["guild"], {[key: string]: unknown}>>
}>

const WebhookComponent = ({
  choosedData,
  data,
  main,
  name,
  addData
}: {
  main: keyof IConfig,
  name: keyof IConfig["guild"] | keyof IConfig["logging"],
  data: { webhooks: APIWebhook[], roles: APIRole[] },
  addData: (name: "webhooks" | "roles", data: {[key: string]: unknown}, key: string) => void,
  choosedData: LazyDataType
}) => {
  if (data.webhooks.length === 0) {
    return <></>
  };
  
  return (
    <div className={`${styles.settings_data} post-settings`}>
      <label htmlFor="">Webhook:</label>
      <Dropdown
        mainClassName={styles.input_data}
        className={styles.dropdown}
        id={`webhook__${main}_${name}`}
        summary={choosedData["webhooks"][main][name]
          ? `${choosedData["webhooks"][main][name].name}`
          : "choose webhook"}
        summaryClassName={styles.input_data}
        >
          {
            data.webhooks.map(webhook => 
              <span
                key={webhook.id}
                onClick={() => addData("webhooks", {...webhook}, name)}
              >{webhook.name}</span>
            )
          }
      </Dropdown>
    </div>
  )
}

const SettingsComponent = ({
  main,
  name,
  addData,
  data,
  choosedData
}: {
  main: keyof IConfig,
  name: keyof IConfig["guild"] | keyof IConfig["logging"],
  data: { webhooks: APIWebhook[], roles: APIRole[] },
  addData: (name: "webhooks" | "roles", data: {[key: string]: unknown}, key: string) => void,
  choosedData: LazyDataType
}) => {
  const [ rolesList, setRolesList ] = useState<string[]>(data.roles.map(role => role.name));
  const [ choosedRoles, setChoosedRoles ] = useState<string[]>([]);

  const [ rolesItem, choosedRolesItem ] = useList({
    list: rolesList,
    choosedList: choosedRoles,
    setChoosedList: setChoosedRoles,
    setList: setRolesList
  });

  if (main === "logging") {
    return (
      <>
        <WebhookComponent {...{main,name,addData,data,choosedData}}/>
        <div className={`${styles.settings_data} post-settings`}>
          <label htmlFor="">Сообщение:</label>
          <textarea className="post-settings" name={`message__${main}_${name}`} maxLength={2048} id={`message__${main}_${name}`}></textarea>
        </div>
      </>
    )
  };

  
  if (name === "when_user_join_into_guild_grant_roles") {
    if (data.roles.length === 0) return <></>;

    return (
      <div className={`${styles.settings_data} post-settings`}>
        <Dropdown className={styles.dropdown} id={`roles_${main}_${name}`} summary="Выбрать роль">
          {rolesItem}
        </Dropdown>
        <Dropdown className={styles.dropdown} id={`choosed_roles_${main}_${name}`} summary="Выбранные роли">
          {choosedRolesItem}
        </Dropdown>
      </div>
    )
  }

  return (
    <>
      <WebhookComponent {...{main,name,addData,data,choosedData}}/>
      <div className={`${styles.settings_data} post-settings`}>
        <label htmlFor={`channel__${main}_${name}`}>Канал:</label>
        <input className="post-settings" name={`channel__${main}_${name}`} id={`channel__${main}_${name}`} type="text" />
      </div>
      <div className={`${styles.settings_data} post-settings`}>
        <label htmlFor={`message__${main}_${name}`}>Сообщение:</label>
        <textarea className="post-settings" maxLength={2048} name={`message__${main}_${name}`} id={`message__${main}_${name}`}></textarea>
      </div>
    </>
  )
};

const Page = () => {
  const [ user, setUser ] = useState<IUser | null>(null);
  const [ guild, setGuild ] = useState<IGuild | null>(null);
  const [ project, setProject ] = useState<"guild"|"logging">("guild");
  
  const [ { webhooks, roles }, setDatas ] = useState<{
    webhooks: APIWebhook[],
    roles: APIRole[],
  }>({ webhooks: [], roles: [] });
  
  const [ choosedData, setChoosedData ] = useState<DataType>({
    roles: {
      guild: {},
      logging: {}
    },
    webhooks: {
      guild: {},
      logging: {}
    }
  });

  const { guildId } = useParams<{guildId: string}>();

  const addData = (name: "webhooks"|"roles", data: {[key: string]: unknown}, key: string) => {
    setChoosedData({
      ...choosedData,
      [name]: {
        ...choosedData[name],
        [project]: {
          ...choosedData[name][project],
          [key]: data
        }
      }
    })
  };

  useEffect(() => {
    (async () => {
      const token = await validateCookies();

      if (!token) {
        return;
      }

      if (guildId) {
        const rolesData =  await fetchRoles(token, guildId) || []
        setGuild(await fetchGuild(token, guildId));
        setDatas({
          webhooks: await fetchWebhooks(token, guildId) || [],
          roles: rolesData
        });
      };

      setUser(await fetchUser(token));
    })();
  }, [guildId]);

  if (!user || !guild) {
    return (
      <div className="page-center">
        Загрузка...
      </div>
    )
  }

  return (
    <>
      <div className={`page-center ${styles.main}`}>
        <div className={styles.choose_settings}>
          <button onClick={() => {
            setProject(project === "guild" ? "logging" : "guild")
          }}>Сменить найстройки</button>
        </div>

        { /* !!!! ACTION !!!! */ }
        <form className={`${styles.config} post-settings`} action={() => {  }}>
          <div className={`${styles.info} post-settings`}>
            <span>Настройки {project === "guild" ? "гильдии" : "логирования"}</span>
            <input type="submit" value="Сохранить" />
          </div>

          <div className={styles.settings}>
            {
              settings[project].map(([key, value]) => {
                return (
                  <div className={styles.config_data} key={key + value}>
                    <span>{value}:</span>
                    <SettingsComponent
                      main={project}
                      name={key as keyof IConfig[typeof project]}
                      key={key}
                      data={{roles, webhooks}}
                      addData={addData}
                      choosedData={choosedData}
                    />
                  </div>
                );
              })
            }
          </div>
        </form>
      </div>
    </>
  )
}

export default Page;
