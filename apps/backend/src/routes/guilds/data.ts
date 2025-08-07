import { Optional, ConfigurableMessage } from "types/config.type";
import type { IGuild } from "types/guild.type";
import type { AllPartial } from "types/utility.types";

export class ConfigDto implements AllPartial<IGuild["config"]> {
  guild?: Partial<{
    when_user_join_into_guild_grant_roles: string[];
    when_user_leave_from_guild_send_message_to_user: Partial<ConfigurableMessage>;
    when_user_join_into_guild_send_hello_message_to_channel: Partial<ConfigurableMessage>;
    when_user_leave_from_guild_send_goodbye_message_to_channel: Partial<ConfigurableMessage>;
    when_user_join_into_guild_send_message_to_user: Partial<ConfigurableMessage>;
  }>;

  logging?: Partial<{
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
  }>;
};