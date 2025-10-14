import type { APIRole, APIWebhook } from "discord.js";
import type { IConfig } from "types/config.type";

export type SettingsActionTypes = "dropdown"|"default";

export const settings: {
  guild: Record<keyof IConfig["guild"], { type: SettingsActionTypes, action: string }>;
  logging: Record<keyof IConfig["logging"], { type: SettingsActionTypes, action: string }>;
} = {
  guild: {
    when_user_join_into_guild_grant_roles: {
      type: "dropdown",
      action: "Награждать ролями при входе"
    },
    when_user_join_into_guild_send_hello_message_to_channel: {
      type: "default",
      action: "Отправлять сообщение в канал при входе"
    },
    when_user_join_into_guild_send_message_to_user: {
      type: "default",
      action: "Отправлять сообщение пользователю при входе"
    },
    when_user_leave_from_guild_send_goodbye_message_to_channel: {
      type: "default",
      action: "Отправлять сообщение в канал при выходе"
    },
    when_user_leave_from_guild_send_message_to_user: {
      type: "default",
      action: "Отправлять сообщение пользователю при выходе"
    }
  }, 
  logging: {
    when_bot_join_into_guild_send_log_into_channel: {
      action: "При входе бота",
      type: "default",
    },
    when_bot_leave_from_guild_send_log_into_channel: {
      action: "При выходе бота",
      type: "default",
    },
    when_user_join_into_guild_send_log_into_channel: {
      action: "При входе пользователя",
      type: "default",
    },
    when_user_leave_from_guild_send_log_into_channel: {
      action: "При выходе пользователя",
      type: "default",
    },
    when_message_was_sended_send_log_into_channel: {
      action: "При отправки сообщения",
      type: "default",
    },
    when_message_was_changed_send_log_into_channel: {
      action: "При изменении сообщения",
      type: "default",
    },
    when_message_was_deleted_send_log_into_channel: {
      action: "При удалении сообщения",
      type: "default",
    },
    when_user_change_profile_send_log_into_channel: {
      action: "При изменении профиля пользователем",
      type: "default",
    },
    when_user_change_activity_send_log_into_channel: {
      action: "При изменении статуса пользователем",
      type: "default",
    },
    when_user_takes_mute_send_log_into_channel: {
      action: "При мьюте пользователя",
      type: "default",
    },
    when_user_takes_ban_send_log_into_channel: {
      action: "При бане пользователя",
      type: "default",
    },
    when_roles_changes_at_user_send_log_into_channel: {
      action: "При изменении ролей пользователя",
      type: "default",
    },
    when_guild_profile_changes_send_log_into_channel: {
      action: "При изменении профиля гильдии",
      type: "default",
    }
  }
} as const;

export const rawSettings: {
  [key: string]: Record<string, { type: SettingsActionTypes, action: string }>
} = settings;

export const rawSettingsIndexes = Object.fromEntries(Object.keys(rawSettings).map(key => [key, Object.fromEntries(Object.keys(rawSettings[key]).map(key2 => [key2, 0]))]));

export type DataType = Record<"webhooks"|"roles", {
  guild: Partial<Record<keyof IConfig["guild"], {[key: string]: unknown}>>,
  logging: Partial<Record<keyof IConfig["logging"], {[key: string]: unknown}>>
}>;

export type LazyDataType = Record<"webhooks"|"roles", {
  [key: string]: Partial<Record<string, {[key: string]: unknown}>>
}>;

export type Props = {
  main: keyof IConfig,
  name: keyof IConfig["guild"] | keyof IConfig["logging"],
  data: { webhooks: APIWebhook[], roles: APIRole[] },
  addData: (name: "webhooks" | "roles", data: {[key: string]: unknown}, key: string) => void,
  choosedData: LazyDataType
};