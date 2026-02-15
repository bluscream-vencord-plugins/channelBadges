/*
 * Vencord, a Discord client mod
 * Copyright (c) 2024 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import "./style.css";

import { Devs, EquicordDevs } from "@utils/constants";
import definePlugin from "@utils/types";
import { Channel } from "@vencord/discord-types";
import { Constants, GuildStore, PermissionStore, React, SelectedGuildStore, VoiceStateStore, ChannelStore, PermissionsBits } from "@webpack/common";
import { isVoiceChannel } from "./utils/channels";
import { JSX } from "react";

import { isEnabled, returnChannelBadge, settings } from "./settings";

import { Logger } from "@utils/Logger";

const pluginId = "channelBadges";
const pluginName = "Channel Badges";
const logger = new Logger(pluginName, "#7289da");

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

export default definePlugin({
    name: pluginName,
    description: pluginName,
    authors: [EquicordDevs.creations, Devs.thororen],
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
