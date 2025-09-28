'use client'

import type { Props } from "./data";

import { Dispatch, SetStateAction, useState } from "react";

import { useList } from "hooks/list.hook";
import { WebhookComponent } from "./webhook.components";

import { Dropdown } from "components/dropdown";

import styles from "app/dashboard/[guildId]/settings/page.module.css";
import { ChooseComponent, ChooseSendType, ChooseTypes } from "./choose-type.component";

const ConfigComponent = ({
  addData,
  choosedData,
  data,
  main,
  name,
  setType,
  type
}: Props & {
  setType: Dispatch<SetStateAction<ChooseSendType>>,
  type: ChooseSendType
}) => {
  const sendDataType: ChooseTypes = type[main] ? type[main][name] || "пусто" : "пусто";

  const channel = (
    <div className={`${styles.settings_data} post-settings`}>
      <label htmlFor={`channel__${main}_${name}`}>Канал:</label>
      <input className="post-settings" name={`channel__${main}_${name}`} id={`channel__${main}_${name}`} type="text" />
    </div>
  );

  const webhook = <WebhookComponent {...{main,name,addData,data,choosedData}}/>;

  return (
    <>
      <ChooseComponent {...{main,name, type, setType}}/>
      {
        sendDataType === "вебхук"
          ? webhook
          : channel
      }
      <div className={`${styles.settings_data} post-settings`}>
        <label htmlFor={`message__${main}_${name}`}>Сообщение:</label>
        <textarea className="post-settings" maxLength={2048} name={`message__${main}_${name}`} id={`message__${main}_${name}`}></textarea>
      </div>
    </>
  )
}

export const SettingsComponent = ({
  main,
  name,
  addData,
  data,
  choosedData
}: Props) => {
  const [ rolesList, setRolesList ] = useState<string[]>(data.roles.map(role => role.name));
  const [ choosedRoles, setChoosedRoles ] = useState<string[]>([]);
  const [ type, setType ] = useState<ChooseSendType>({}); 

  const [ rolesItem, choosedRolesItem ] = useList({
    list: rolesList,
    choosedList: choosedRoles,
    setChoosedList: setChoosedRoles,
    setList: setRolesList
  });
  
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

  return <ConfigComponent {...{main,name,addData,data,choosedData,type,setType}} />
};