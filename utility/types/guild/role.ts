export type RoleSubscriptionData = {
    role_subscription_listing_id: string
    tier_name: string
    total_months_subscribed: number
    is_renewal: boolean
}

export type Role = {
    id: string;
    name: string;
    position: number;
    color: number;
    hoist: boolean;
    managed: boolean;
    mentionable: boolean;
    icon?: string;
    unicode_emoji?: string;
    flags: number;
};