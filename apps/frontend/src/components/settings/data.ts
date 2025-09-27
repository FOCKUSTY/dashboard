import type { APIRole, APIWebhook } from "discord.js";
import type { IConfig } from "types/config.type";

export const settings: {
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

export type DataType = Record<"webhooks"|"roles", {
  guild: Partial<Record<keyof IConfig["guild"], {[key: string]: unknown}>>,
  logging: Partial<Record<keyof IConfig["logging"], {[key: string]: unknown}>>
}>;

export type LazyDataType = Record<"webhooks"|"roles", {
  [key: string]: Partial<Record<keyof IConfig["logging"] | keyof IConfig["guild"], {[key: string]: unknown}>>
}>;

export type Props = {
  main: keyof IConfig,
  name: keyof IConfig["guild"] | keyof IConfig["logging"],
  data: { webhooks: APIWebhook[], roles: APIRole[] },
  addData: (name: "webhooks" | "roles", data: {[key: string]: unknown}, key: string) => void,
  choosedData: LazyDataType
};