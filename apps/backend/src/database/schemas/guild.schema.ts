import mongoose, { Schema } from "mongoose";
import { Settings } from "src/settings/settings";

import type { IGuild } from "types/guild.type";
import type { ConfigurableMessage } from "types/config.type";
import type { SchemaParameters } from "src/types/mongodb.types";

const configurableMessage: SchemaParameters<ConfigurableMessage> = {
  channel_id: mongoose.SchemaTypes.String,
  message: mongoose.SchemaTypes.String
};

const data: SchemaParameters<IGuild> = {
  id: {
    type: mongoose.SchemaTypes.String,
    required: true,
    unique: true
  },

  name: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },

  icon_url: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },

  created_at: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },

  owner_id: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },

  members: {
    type: [mongoose.SchemaTypes.String],
    required: true,
  },

  settings: {
    type: mongoose.SchemaTypes.String,
    required: false,
    default: (Settings.CONSTANTS.raw.default.guild | Settings.CONSTANTS.raw.default.logging).toString()
  },

  config: {
    type: {
      guild: {
        /** roles id */
        when_user_join_into_guild_send_message_to_user: {
          type: [mongoose.SchemaTypes.String],
          required: false
        },

        when_user_leave_from_guild_send_message_to_user: {
          type: configurableMessage,
          required: false
        },
        when_user_join_into_guild_send_hello_message_to_channel: {
          type: configurableMessage,
          required: false
        },
      
        when_user_leave_from_guild_send_goodbye_message_to_channel: {
          type: configurableMessage,
          required: false
        },
        when_user_join_into_guild_grant_roles: {
          type: configurableMessage,
          required: false
        },
      },

      logging: {
        when_bot_join_into_guild_send_log_into_channel: {
          type: mongoose.SchemaTypes.String,
          required: false
        },
        when_bot_leave_from_guild_send_log_into_channel: {
          type: mongoose.SchemaTypes.String,
          required: false
        },
        
        when_user_join_into_guild_send_log_into_channel: {
          type: mongoose.SchemaTypes.String,
          required: false
        },
        when_user_leave_from_guild_send_log_into_channel: {
          type: mongoose.SchemaTypes.String,
          required: false
        },
        
        when_message_was_sended_send_log_into_channel: {
          type: mongoose.SchemaTypes.String,
          required: false
        },
        when_message_was_changed_send_log_into_channel: {
          type: mongoose.SchemaTypes.String,
          required: false
        },
        when_message_was_deleted_send_log_into_channel: {
          type: mongoose.SchemaTypes.String,
          required: false
        },
        
        when_user_change_profile_send_log_into_channel: {
          type: mongoose.SchemaTypes.String,
          required: false
        },
        when_user_change_activity_send_log_into_channel: {
          type: mongoose.SchemaTypes.String,
          required: false
        },
        when_user_takes_mute_send_log_into_channel: {
          type: mongoose.SchemaTypes.String,
          required: false
        },
        when_user_takes_ban_send_log_into_channel: {
          type: mongoose.SchemaTypes.String,
          required: false
        },
        
        when_roles_changes_at_user_send_log_into_channel: {
          type: mongoose.SchemaTypes.String,
          required: false
        },
        
        when_guild_profile_changes_send_log_into_channel: {
          type: mongoose.SchemaTypes.String,
          required: false
        },
      }
    },
    required: false,
    default: {
      guild: {
        when_user_join_into_guild_send_message_to_user: undefined,
        when_user_leave_from_guild_send_message_to_user: undefined,
        when_user_join_into_guild_send_hello_message_to_channel: undefined,
        when_user_leave_from_guild_send_goodbye_message_to_channel: undefined,
        when_user_join_into_guild_grant_roles: undefined,
      },
      logging: {
        when_bot_join_into_guild_send_log_into_channel: undefined,
        when_bot_leave_from_guild_send_log_into_channel: undefined,
        when_user_join_into_guild_send_log_into_channel: undefined,
        when_user_leave_from_guild_send_log_into_channel: undefined,
        when_message_was_sended_send_log_into_channel: undefined,
        when_message_was_changed_send_log_into_channel: undefined,
        when_message_was_deleted_send_log_into_channel: undefined,
        when_user_change_profile_send_log_into_channel: undefined,
        when_user_change_activity_send_log_into_channel: undefined,
        when_user_takes_mute_send_log_into_channel: undefined,
        when_user_takes_ban_send_log_into_channel: undefined,
        when_roles_changes_at_user_send_log_into_channel: undefined,
        when_guild_profile_changes_send_log_into_channel: undefined,
      }
    }
  },
};
const keys = Object.keys(data);
const schema = new Schema<IGuild>(data);

const database = mongoose.model("guild", schema);

export { schema as GuildSchema, keys as GuildKeys, data as GuildData };

export default database;
