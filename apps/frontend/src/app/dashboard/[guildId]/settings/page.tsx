'use client'

import type { APIRole, APIWebhook } from "discord.js";

import type { IGuild } from "types/guild.type";
import type { IUser } from "types/user.type";
import type { IConfig } from "types/config.type";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { fetchRoles, fetchWebhooks } from "api/fetch-guild-data";
import { fetchGuild } from "api/fetch-guilds";
import { fetchUser } from "api/fetch-user";
import { validateCookies } from "api/validate-cookies";

import { DataType, rawSettings, rawSettingsIndexes, settings } from "components/settings/data";
import { SettingsComponent } from "components/settings/settings.component";

import styles from "./page.module.css";
import { WebhookComponent } from "components/settings/webhook.components";
import { ChooseDropdownComponent } from "components/dropdown/choose.component";
import { ChannelComponent } from "components/settings/channel.component";

const Page = () => {
  const [ user, setUser ] = useState<IUser | null>(null);
  const [ guild, setGuild ] = useState<IGuild | null>(null);
  const [ project, setProject ] = useState<"guild"|"logging">("guild");
  
  const [ indexes, setIndexes ] = useState<{
    [key: string]: {
      [key: string]: number
    }
  }>(rawSettingsIndexes);

  const setIndex = (type: string, index: number) => {
    setIndexes((previous) => {
      return {
        ...previous,
        [project]: {
          ...previous[project],
          [type]: index
        }
      }
    })
  }

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

        <form className={`${styles.config} post-settings`} onSubmit={(e) => {
          e.preventDefault();

          const data = Object.fromEntries(new FormData(e.currentTarget).entries());
          console.log({data});
        }}>
          <div className={`${styles.info} post-settings`}>
            <span>Настройки {project === "guild" ? "гильдии" : "логирования"}</span>
            <input type="submit" value="Сохранить" />
          </div>

        {
          Object.keys(settings[project]).map(key => {
            const { action, type } = rawSettings[project][key];

            if (type === "dropdown") {
              return <></>;
            }

            const name = `channel__${project}_${key}`;
            const components = [
              <ChannelComponent
                className={`${styles.settings_data} post-settings`}
                label={{htmlFor: name}}
                input={{className: "post-settings", name, id: name}}
              />,
              <WebhookComponent
                key={2}
                addData={addData}
                choosedData={choosedData}
                data={{roles,webhooks}}
                main={project}
                name={key}
              />
            ];

            const summary = [
              "канал",
              "вебхук"
            ];

            return (
              <div>
                <span>{action}:</span>
                <ChooseDropdownComponent
                  components={summary}
                  currentIndex={indexes[project][key]}
                  onChange={(current) => {
                    return setIndex(key, current);
                  }}
                  dropdown={{
                    id: key + "_dropdown",
                    summary: "Choose a штуки"
                  }}
                />
                {components[indexes[project][key]]}
              </div>
            )
          })
        }

          {/* <div className={styles.settings}>
            {
              settings[project].map(([key, value]) => 
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
              )
            }
          </div> */}
        </form>
      </div>
    </>
  )
}

export default Page;
