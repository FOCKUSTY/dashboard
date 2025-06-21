import { BitBuilder } from "fbit-field";

type ISettigns<T extends any[] | readonly any[]> = Record<T[number], bigint>;

export const format = (string: string, capitalize: boolean) =>
  capitalize
    ? string.charAt(0).toUpperCase() + string.slice(1)
    : string.charAt(0).toLowerCase() + string.slice(1);

export const formatSettings = <T extends string>(
  settings: T[] | readonly T[]
) =>
  settings.map((string: T) =>
    format(
      string
        .toLowerCase()
        .replaceAll("__", " ")
        .replaceAll("_", " ")
        .split(" ")
        .map((v) => format(v, true))
        .join(""),
      false
    )
  );

export namespace Settings {
  export type Users = ISettigns<typeof Users.ALL>;
  export namespace Users {
    export const EXCLUDE = [] as const;

    export const ALL = [...EXCLUDE] as const;

    const builder = new BitBuilder(ALL);

    export const DEFAULT: Users = new BitBuilder(ALL).execute(0n);
    export const AVAILABLE: Users = new BitBuilder(ALL).execute(0n, EXCLUDE);
    export const RAW_DEFAULT: bigint = builder.resolve(DEFAULT);
    export const RAW_AVAILABLE: bigint = builder.resolve(AVAILABLE);
  }

  export type Guild = ISettigns<typeof Guild.ALL>;
  export namespace Guild {
    export const EXCLUDE = [
      "WHEN_USER__JOIN_INTO_GUILD__SEND_MESSAGE_TO_USER",
      "WHEN_USER__LEAVE_FROM_GUILD__SEND_MESSAGE_TO_USER",

      "WHEN_USER__JOIN_INTO_GUILD__SEND_HELLO_MESSAGE_TO_CHANNEL",
      "WHEN_USER__LEAVE_FROM_GUILD__SEND_GOODBYE_MESSAGE_TO_CHANNEL",

      "WHEN_USER__JOIN_INTO_GUILD__GRANT_ROLES"
    ] as const;

    export const ALL = [...EXCLUDE] as const;

    const builder = new BitBuilder(ALL);

    export const DEFAULT: Guild = builder.execute(Users.DEFAULT);
    export const AVAILABLE: Guild = builder.execute(Users.DEFAULT, EXCLUDE);
    export const RAW_DEFAULT: bigint = builder.resolve(DEFAULT);
    export const RAW_AVAILABLE: bigint = builder.resolve(AVAILABLE);
  }

  export type Logging = ISettigns<typeof Logging.ALL>;
  export namespace Logging {
    export const EXCLUDE = [
      "WHEN_BOT__JOIN_INTO_GUILD__SEND_LOG_INTO_CHANNEL",
      "WHEN_BOT__LEAVE_FROM_GUILD__SEND_LOG_INTO_CHANNEL",

      "WHEN_USER__JOIN_INTO_GUILD__SEND_LOG_INTO_CHANNEL",
      "WHEN_USER__LEAVE_FROM_GUILD__SEND_LOG_INTO_CHANNEL",

      "WHEN_MESSAGE__WAS_SENDED__SEND_LOG_INTO_CHANNEL",
      "WHEN_MESSAGE__WAS_CHANGED__SEND_LOG_INTO_CHANNEL",
      "WHEN_MESSAGE__WAS_DELETED__SEND_LOG_INTO_CHANNEL",

      "WHEN_USER__CHANGE_PROFILE__SEND_LOG_INTO_CHANNEL",
      "WHEN_USER__CHANGE_ACTIVITY__SEND_LOG_INTO_CHANNEL",

      "WHEN_USER__TAKES_MUTE__SEND_LOG_INTO_CHANNEL",
      "WHEN_USER__TAKES_BAN__SEND_LOG_INTO_CHANNEL",

      "WHEN_ROLES__CHANGES_AT_USER__SEND_LOG_INTO_CHANNEL",

      "WHEN_GUILD_PROFILE__CHANGES__SEND_LOG_INTO_CHANNEL"
    ] as const;

    export const ALL = [...EXCLUDE] as const;

    const builder = new BitBuilder(ALL);

    export const DEFAULT: Logging = builder.execute(Guild.DEFAULT);
    export const AVAILABLE: Logging = builder.execute(Guild.DEFAULT, EXCLUDE);
    export const RAW_DEFAULT: bigint = builder.resolve(DEFAULT);
    export const RAW_AVAILABLE: bigint = builder.resolve(AVAILABLE);
  }

  export type Roles = ISettigns<typeof Roles.ALL>;
  export namespace Roles {
    export const EXCLUDE = [] as const;

    export const ALL = [...EXCLUDE] as const;

    const builder = new BitBuilder(ALL);

    export const DEFAULT: Roles = builder.execute(Logging.DEFAULT);
    export const AVAILABLE: Roles = builder.execute(Logging.DEFAULT, EXCLUDE);
    export const RAW_DEFAULT: bigint = builder.resolve(DEFAULT);
    export const RAW_AVAILABLE: bigint = builder.resolve(AVAILABLE);
  }

  export const CONSTANTS = {
    raw: {
      default: {
        users: Users.RAW_DEFAULT,
        guild: Guild.RAW_DEFAULT,
        logging: Logging.RAW_DEFAULT,
        roles: Roles.RAW_DEFAULT
      } as const,

      available: {
        users: Users.RAW_AVAILABLE,
        guild: Guild.RAW_AVAILABLE,
        logging: Logging.RAW_AVAILABLE,
        roles: Roles.RAW_AVAILABLE
      } as const
    } as const,

    object: {
      default: {
        users: Users.DEFAULT,
        guild: Guild.DEFAULT,
        logging: Logging.DEFAULT,
        roles: Roles.DEFAULT
      } as const,

      available: {
        users: Users.AVAILABLE,
        guild: Guild.AVAILABLE,
        logging: Logging.AVAILABLE,
        roles: Roles.AVAILABLE
      } as const
    } as const
  } as const;
}
