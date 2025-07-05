import type { Message as DiscordMessage } from "discord.js";

export type Optional<
  Main,
  Default = null
> = Main | Default;

export type ConfigurableMessage = {
  message: Optional<DiscordMessage<true>, string>;
  channel_id: Optional<string>;
};

export interface IConfig {
  guild: {
    /** roles id */
    when_user_join_into_guild_send_message_to_user: string[];

    when_user_leave_from_guild_send_message_to_user: ConfigurableMessage;
    when_user_join_into_guild_send_hello_message_to_channel: ConfigurableMessage;
  
    when_user_leave_from_guild_send_goodbye_message_to_channel: ConfigurableMessage;
    when_user_join_into_guild_grant_roles: ConfigurableMessage;
  };

  logging: {
    when_bot_join_into_guild_send_log_into_channel: Optional<string>;
    when_bot_leave_from_guild_send_log_into_channel: Optional<string>;
    
    when_user_join_into_guild_send_log_into_channel: Optional<string>;
    when_user_leave_from_guild_send_log_into_channel: Optional<string>;
    
    when_message_was_sended_send_log_into_channel: Optional<string>;
    when_message_was_changed_send_log_into_channel: Optional<string>;
    when_message_was_deleted_send_log_into_channel: Optional<string>;
    
    when_user_change_profile_send_log_into_channel: Optional<string>;
    when_user_change_activity_send_log_into_channel: Optional<string>;
    when_user_takes_mute_send_log_into_channel: Optional<string>;
    when_user_takes_ban_send_log_into_channel: Optional<string>;
    
    when_roles_changes_at_user_send_log_into_channel: Optional<string>;
    
    when_guild_profile_changes_send_log_into_channel: Optional<string>;
  };
}
