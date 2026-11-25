/*
 * Vencord, a Discord client mod
 * Copyright (c) 2026 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import "./style.css";

import { isPluginEnabled } from "@api/PluginManager";
import { Settings, useSettings } from "@api/Settings";
import ErrorBoundary from "@components/ErrorBoundary";
import { Devs, EquicordDevs } from "@utils/constants";
import { classNameFactory } from "@utils/css";
import definePlugin from "@utils/types";
import type { Channel } from "@vencord/discord-types";
import { GuildStore, PermissionsBits, PermissionStore, RTCConnectionStore, Tooltip, useStateFromStores, VoiceStateStore } from "@webpack/common";

import { PATTERNS } from "./patterns";
import { badgeDef, SETTING_KEYS, settings } from "./settings";
import { getRegionAbbreviation, getVoiceServerCode, isVoiceChannel } from "./utils/channels";

const cl = classNameFactory("vc-channelBadgesFork-");
const { badgeIds } = PATTERNS;

type Store = ReturnType<typeof settings.use>;
type Status = "good" | "average" | "bad";

interface BadgeEntry {
    id: number;
    title?: string;
    label?: string;
    status?: Status;
}

function getConnectionStatus(): Status {
    const state = RTCConnectionStore.getState();
    if (state === PATTERNS.rtc.connected)
        return ({ fine: "good", average: "average", bad: "bad", unknown: "good" } as const)[RTCConnectionStore.getQuality()];
    return (PATTERNS.rtc.bad as readonly string[]).includes(state) ? "bad" : "average";
}

function Badge({ entry: { id, title, label, status }, s }: { entry: BadgeEntry; s: Store; }) {
    const def = badgeDef(id);
    const color = String(s[def.color]);
    return (
        <Tooltip text={title ?? def.title}>
            {props => (
                <div
                    {...props}
                    className={cl("badge", def.css, { [`status-${status}`]: status != null })}
                    style={color && !status ? { backgroundColor: color } : undefined}
                >
                    {label ?? (def.label ? String(s[def.label]) : "")}
                </div>
            )}
        </Tooltip>
    );
}

const ChannelBadges = ErrorBoundary.wrap(({ channel }: { channel: Channel; }) => {
    const s = settings.use(SETTING_KEYS);
    useSettings([PATTERNS.honeypotSetting]);

    const isVoice = isVoiceChannel(channel);
    const isFull = useStateFromStores([VoiceStateStore], () =>
        isVoice && channel.userLimit > 0 && Object.keys(VoiceStateStore.getVoiceStatesForChannel(channel.id)).length >= channel.userLimit, [channel, isVoice]);
    const isLockedVoice = useStateFromStores([PermissionStore], () => isVoice && !PermissionStore.can(PermissionsBits.CONNECT, channel), [channel, isVoice]);
    const connectedHere = useStateFromStores([RTCConnectionStore], () => RTCConnectionStore.getChannelId() === channel.id, [channel.id]);
    const hostname = useStateFromStores([RTCConnectionStore], () => connectedHere ? RTCConnectionStore.getHostname() : "", [connectedHere]);
    const quality = useStateFromStores([RTCConnectionStore], () => connectedHere ? getConnectionStatus() : undefined, [connectedHere]);
    const rulesChannelId = useStateFromStores([GuildStore], () => GuildStore.getGuild(channel.guild_id)?.rulesChannelId, [channel.guild_id]);

    const honeypots = isPluginEnabled(PATTERNS.honeypotPlugin)
        ? new Set(String(Settings.plugins[PATTERNS.honeypotPlugin].honeypotChannels ?? "").split(",").map(id => id.trim()))
        : null;

    const entries: BadgeEntry[] = [];
    const add = (condition: boolean, entry: BadgeEntry) => {
        if (condition && s[badgeDef(entry.id).show]) entries.push(entry);
    };

    add(!!honeypots?.has(channel.id), { id: badgeIds.honeypot });
    add(isFull, { id: badgeIds.full });
    add(isLockedVoice, { id: badgeIds.lockedVoice });
    add(channel.isLockedThread() || channel.isArchivedThread(), { id: badgeIds.locked });
    add(channel.isNSFW(), { id: badgeIds.nsfw });
    add(rulesChannelId === channel.id, { id: badgeIds.rules });

    if (isVoice) {
        const region = channel.rtcRegion;
        const server = s.showUsedServer && hostname ? getVoiceServerCode(hostname) : null;
        const status = s.colorRegionByQuality ? quality : undefined;
        const regionTitle = region ? `Voice region: ${region}` : "Voice region: automatic";
        add(!!region || s.showRegionAutoBadge || !!server, server
            ? { id: badgeIds.region, title: `Voice server in use: ${hostname}\n${regionTitle}`, label: server, status }
            : { id: badgeIds.region, title: regionTitle, label: region ? getRegionAbbreviation(region) : s.regionAutoBadgeLabel, status });
    }

    if (s.oneBadgePerChannel) entries.splice(1);
    if (!entries.length || !s.oneBadgePerChannel) add(true, { id: channel.type });

    if (!entries.length) return null;
    return <div className={cl("container")}>{entries.map(entry => <Badge key={entry.id} entry={entry} s={s} />)}</div>;
}, { noop: true });

export default definePlugin({
    name: "ChannelBadges (Fork)",
    description: "Adds customizable badges to channels in the channel list.",
    tags: ["Appearance", "Customisation", "Servers"],
    authors: [
        EquicordDevs.creations,
        Devs.thororen,
        { name: "Antigravity.AI", id: 0n }
    ],
    settings,
    patches: [
        {
            find: PATTERNS.patches.channelFind,
            replacement: {
                match: PATTERNS.patches.channelMatch,
                replace: "$&,$self.renderChannelBadges($1)"
            }
        },
        {
            find: PATTERNS.patches.threadFind,
            replacement: {
                match: PATTERNS.patches.threadMatch,
                replace: "$&,$self.renderChannelBadges($1)"
            }
        }
    ],

    renderChannelBadges(channel: Channel | undefined) {
        return channel ? <ChannelBadges channel={channel} /> : null;
    }
});
