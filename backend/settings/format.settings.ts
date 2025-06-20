/**
 * - this file was auto genereted by compiler
 * - if you see inconsistencies: https://github.com/FOCKUSTY/dashboard/issues
 */
export const settings = {
  users: {} as const,

  guild: {
    /** @value 1 */
    whenUserJoinIntoGuildSendMessageToUser: 1n << 0n,

    /** @value 2 */
    whenUserLeaveFromGuildSendMessageToUser: 1n << 1n,

    /** @value 4 */
    whenUserJoinIntoGuildSendHelloMessageIntoChannel: 1n << 2n,

    /** @value 8 */
    whenUserLeaveFromGuildSendGoodbyeMessageIntoChannel: 1n << 3n,

    /** @value 16 */
    whenUserJoinIntoGuildGrantRoles: 1n << 4n
  } as const,

  logging: {
    /** @value 2147483648 */
    whenBotJoinIntoGuildSendLogIntoChannel: 1n << 31n,

    /** @value 4294967296 */
    whenBotLeaveFromGuildSendLogIntoChannel: 1n << 32n,

    /** @value 8589934592 */
    whenUserJoinIntoGuildSendLogIntoChannel: 1n << 33n,

    /** @value 17179869184 */
    whenUserLeaveFromGuildSendLogIntoChannel: 1n << 34n,

    /** @value 34359738368 */
    whenMessageWasSendedSendLogIntoChannel: 1n << 35n,

    /** @value 68719476736 */
    whenMessageWasChangedSendLogIntoChannel: 1n << 36n,

    /** @value 137438953472 */
    whenMessageWasDeletedSendLogIntoChannel: 1n << 37n,

    /** @value 274877906944 */
    whenUserChangeProfileSendLogIntoChannel: 1n << 38n,

    /** @value 549755813888 */
    whenUserChangeActivitySendLogIntoChannel: 1n << 39n,

    /** @value 1099511627776 */
    whenUserTakesMuteSendLogIntoChannel: 1n << 40n,

    /** @value 2199023255552 */
    whenUserTakesBanSendLogIntoChannel: 1n << 41n,

    /** @value 4398046511104 */
    whenRolesChangesAtUserSendLogIntoChannel: 1n << 42n,

    /** @value 8796093022208 */
    whenGuildProfileChangesSendLogIntoChannel: 1n << 43n
  } as const,

  roles: {} as const
} as const;

export type Keys = keyof typeof settings;
export type Settings<T extends Keys> = (typeof settings)[T];
export type SettingsKeys<T extends Keys> = keyof Settings<T>;

export default settings;
