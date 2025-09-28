import { Dispatch, SetStateAction } from "react";

import { Dropdown } from "components/dropdown";

import styles from "app/dashboard/[guildId]/settings/page.module.css";
import { Props } from "./data";
import { IConfig } from "types/config.type";

export const CHOOSE_TYPES = [
  "вебхук",
  "канал"
] as const;
export type ChooseTypes = (typeof CHOOSE_TYPES)[number]|"пусто";
export type ChooseSendType = {
  [key: string]: Partial<Record<keyof IConfig["logging"] | keyof IConfig["guild"], ChooseTypes>>
}

export const ChooseComponent = ({
  type,
  setType,
  main,
  name,
}: {
  setType: Dispatch<SetStateAction<ChooseSendType>>,
  type: ChooseSendType
} & Pick<Props, "main"|"name">) => {
  const data = type[main]
    ? type[main][name] || "пусто"
    : "пусто";

  return (
    <div className={`${styles.settings_data} post-settings`}>
      <label htmlFor="">Выберите тип:</label>
      <Dropdown
        mainClassName={styles.input_data}
        className={styles.dropdown}
        summary={<span>{data}</span>}
        id="choose_send_type"
      >
        {
          CHOOSE_TYPES.filter((t) => t !== data).map(t =>
            <span
              key={t}
              onClick={() => setType((prev) => {
                return {
                  ...prev,
                  [main]: {
                    ...prev[main],
                    [name]: t
                  }
                }
              })}
            >{t}</span>
          )
        }
      </Dropdown>
    </div>
  )
};