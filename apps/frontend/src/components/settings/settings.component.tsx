'use client'

import type { Props } from "./data";

import { useState } from "react";

import { useList } from "hooks/list.hook";
import { WebhookComponent } from "./webhook.components";

import { Dropdown } from "components/dropdown";

import styles from "app/dashboard/[guildId]/settings/page.module.css";

export const SettingsComponent = ({
  main,
  name,
  addData,
  data,
  choosedData
}: Props) => {
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