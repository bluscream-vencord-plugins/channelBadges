//// Plugin originally written for Equicord at 2026-02-16 by https://github.com/Bluscream, https://antigravity.google
// region Imports
import "./style.css";

import { React, ChannelStore, GuildStore, PermissionStore, SelectedGuildStore, VoiceStateStore, PermissionsBits } from "@webpack/common";
import { Devs, EquicordDevs } from "@utils/constants";
import definePlugin from "@utils/types";
import { Logger } from "@utils/Logger";

import { isEnabled, returnChannelBadge, settings } from "./settings";
import { isVoiceChannel } from "./utils/channels";
import { JSX } from "react";
// endregion Imports

// region PluginInfo
export const pluginInfo = {
    id: "channelBadges",
    name: "Channel Badges",
    description: "Adds customizable badges to channels in the channel list (Locked, NSFW, Rules, etc.)",
    color: "#7289da",
    authors: [
        EquicordDevs.creations,
        Devs.thororen,
        { name: "Assistant", id: 0n }
    ],
};
// endregion PluginInfo

// region Variables
const logger = new Logger(pluginInfo.id, pluginInfo.color);
// endregion Variables

// region Utils
function renderBadge(id: number, title: string) {
    const { css, label, color } = returnChannelBadge(id);

    return (
        <div
            key={id}
            className={`channel-badge channel-badge-${css}`}
            style={color ? { backgroundColor: color } : undefined}
            title={title}
        >
            {label}
        </div>
    );
}
// endregion Utils

// region Definition
export default definePlugin({
    name: pluginInfo.id,
    description: pluginInfo.description,
    authors: pluginInfo.authors,
    settings,
    patches: [
        // TY TypingIndicator
        // Normal Channels
        {
            find: "UNREAD_IMPORTANT:",
            replacement: {
                match: /\.Children\.count.+?:null(?<=,channel:(\i).+?)/,
                replace: "$&,$self.renderChannelBadges($1)"
            }
        },
        // Threads
        {
            find: "18V16H9v2H6Zm3",
            replacement: {
                match: /mentionsCount:\i.+?null(?<=channel:(\i).+?)/,
                replace: "$&,$self.renderChannelBadges($1)"
            }
        }
    ],
    renderChannelBadges(channel: any) {
        if (!channel || !isEnabled(channel.type)) return null;

        const { type, nsfw, threadMetadata } = channel;
        const isPrivate = channel.isPrivate?.() || threadMetadata?.locked || channel.isArchivedThread?.();
        const isNSFW = nsfw || channel.isNSFW?.();

        const selectedGuildId = SelectedGuildStore.getGuildId();
        const guild = selectedGuildId ? GuildStore.getGuild(selectedGuildId) : null;

        const fullChannel = ChannelStore.getChannel(channel.id);
        const isVoice = isVoiceChannel(fullChannel);
        const userLimit = fullChannel?.userLimit ?? 0;
        const isFull = isVoice && userLimit > 0 && Object.keys(VoiceStateStore.getVoiceStatesForChannel(channel.id)).length >= userLimit;

        const isLockedVoice = isVoice && !PermissionStore.can(PermissionsBits.CONNECT, fullChannel);

        const badgeConditions = [
            { id: 6103, condition: isFull, title: "This voice channel is full." },
            { id: 6104, condition: isLockedVoice, title: "You do not have permission to connect to this voice channel." },
            { id: 6101, condition: isPrivate, title: "This channel is locked." },
            { id: 6100, condition: isNSFW, title: "This channel is marked as NSFW." },
            { id: 6102, condition: guild?.rulesChannelId === channel.id, title: "This channel is the server rules channel." },
        ];

        let badges: JSX.Element[] = [];

        if (settings.store.oneBadgePerChannel) {
            const first = badgeConditions.find(({ id, condition }) => condition && isEnabled(id));
            if (first) {
                badges.push(renderBadge(first.id, first.title));
            } else {
                badges.push(renderBadge(type, returnChannelBadge(type).label));
            }
        } else {
            badges = badgeConditions
                .filter(({ id, condition }) => condition && isEnabled(id))
                .map(({ id, title }) => renderBadge(id, title));

            badges.push(renderBadge(type, returnChannelBadge(type).label));
        }

        return <div className="badge-container">{badges}</div>;
    }
});
// endregion Definition
