import type { APIRole, APIWebhook } from "discord.js";
import type { LazyDataType } from "./data";

import { Dropdown } from "components/dropdown";

import styles from "app/dashboard/[guildId]/settings/page.module.css";

export const WebhookComponent = ({
  choosedData,
  data,
  main,
  name,
  addData
}: {
  main: string,
  name: string,
  data: { webhooks: APIWebhook[], roles: APIRole[] },
  addData: (name: "webhooks" | "roles", data: {[key: string]: unknown}, key: string) => void,
  choosedData: LazyDataType
}) => {
  if (data.webhooks.length === 0) {
    return <></>
  };
  
  const webhook = choosedData["webhooks"][main][name];

  return (
    <div className={`${styles.settings_data} post-settings`}>
      <label htmlFor="">Вебхук:</label>
      <Dropdown
        mainClassName={styles.input_data}
        className={styles.dropdown}
        id={`webhook__${main}_${name}`}
        summaryClassName={styles.input_data}
        summary={
          <input
            key={webhook ? `${webhook.id}` : `key__input_webhook__${main}_${name}`}
            className="post-settings"
            id={`input_webhook__${main}_${name}`}
            name={`webhook__${main}_${name}`}
            value={webhook
              ? `${webhook.name}:${webhook.id}`
              : "Выберите вебхук"
            }
            readOnly
          />
        }
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