const enabledSymbols = '#1234567890abcdef';
const hexSymbolds = new Map();

for(const char of enabledSymbols) {
    hexSymbolds.set(char.toLowerCase(), true);
    hexSymbolds.set(char.toUpperCase(), true);
};

class Utils {
    public readonly getAvatar = (profile: { id: string, avatar?: string }) => {
        return profile.avatar
            ? `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}`
            : '/TheVoidAvatarSite.png';
    };

    public readonly getIcon = (guild?: { id: string, icon?: string }) => {
        return (guild && guild.icon)
            ? `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`
            : '/TheVoidAvatarSite.png';
    };

    public readonly getHexSymbol = (char: string): boolean => {
        return !!hexSymbolds.get(char);
    };
};

export default Utils;