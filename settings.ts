/*
 * Vencord, a Discord client mod
 * Copyright (c) 2026 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { definePluginSettings } from "@api/Settings";
import { OptionType } from "@utils/types";
import { ChannelType } from "@vencord/discord-types/enums";

import { PATTERNS } from "./patterns";

const show = (description: string, def = true) => ({ type: OptionType.BOOLEAN as const, default: def, description });
const label = (description: string, def: string) => ({ type: OptionType.STRING as const, default: def, description });
const color = (description: string) => ({ type: OptionType.STRING as const, default: "", description });

export const settings = definePluginSettings({
    oneBadgePerChannel: show("Show only one badge per channel.", false),
    showTextBadge: show("Show the Text badge."),
    showVoiceBadge: show("Show the Voice badge."),
    showCategoryBadge: show("Show the Category badge."),
    showDirectoryBadge: show("Show the Directory badge."),
    showAnnouncementThreadBadge: show("Show the Announcement Thread badge."),
    showPublicThreadBadge: show("Show the Public Thread badge."),
    showPrivateThreadBadge: show("Show the Private Thread badge."),
    showStageBadge: show("Show the Stage badge."),
    showAnnouncementBadge: show("Show the Announcement badge."),
    showForumBadge: show("Show the Forum badge."),
    showMediaBadge: show("Show the Media badge."),
    showNSFWBadge: show("Show the NSFW badge."),
    showLockedBadge: show("Show the Locked badge on locked or archived threads."),
    showRulesBadge: show("Show the Rules badge."),
    showUnknownBadge: show("Show the Unknown badge."),
    showFullBadge: show("Show the Full badge on full voice channels."),
    showLockedVoiceBadge: show("Show the Locked badge on voice channels you can't join."),
    showRegionBadge: show("Show the configured voice region of voice channels, like EU or US-E.", false),
    showRegionAutoBadge: show("Also show a Region badge on voice channels set to automatic. Needs the Region badge.", false),
    showUsedServer: show("On the voice channel you're connected to, show the voice server in use, like FRA, instead of the configured region. Needs the Region badge."),
    colorRegionByQuality: show("On the voice channel you're connected to, color the Region badge by connection quality like the Voice Connected panel. Needs the Region badge."),
    showHoneypotBadge: show("Show the Honeypot badge on channels marked by the HoneypotSafety plugin."),

    textBadgeLabel: label("Text badge label.", "Text"),
    voiceBadgeLabel: label("Voice badge label.", "Voice"),
    categoryBadgeLabel: label("Category badge label.", "Category"),
    announcementBadgeLabel: label("Announcement badge label.", "News"),
    announcementThreadBadgeLabel: label("Announcement Thread badge label.", "News Thread"),
    publicThreadBadgeLabel: label("Public Thread badge label.", "Thread"),
    privateThreadBadgeLabel: label("Private Thread badge label.", "Private Thread"),
    stageBadgeLabel: label("Stage badge label.", "Stage"),
    directoryBadgeLabel: label("Directory badge label.", "Directory"),
    forumBadgeLabel: label("Forum badge label.", "Forum"),
    mediaBadgeLabel: label("Media badge label.", "Media"),
    nsfwBadgeLabel: label("NSFW badge label.", "NSFW"),
    lockedBadgeLabel: label("Locked badge label.", "Locked"),
    rulesBadgeLabel: label("Rules badge label.", "Rules"),
    unknownBadgeLabel: label("Unknown badge label.", "Unknown"),
    fullBadgeLabel: label("Full badge label.", "Full"),
    lockedVoiceBadgeLabel: label("Locked (Voice) badge label.", "Locked"),
    regionAutoBadgeLabel: label("Automatic region badge label.", "Auto"),
    honeypotBadgeLabel: label("Honeypot badge label.", "🍯"),

    textBadgeColor: color("Text badge color."),
    voiceBadgeColor: color("Voice badge color."),
    categoryBadgeColor: color("Category badge color."),
    announcementBadgeColor: color("Announcement badge color."),
    announcementThreadBadgeColor: color("Announcement Thread badge color."),
    publicThreadBadgeColor: color("Public Thread badge color."),
    privateThreadBadgeColor: color("Private Thread badge color."),
    stageBadgeColor: color("Stage badge color."),
    directoryBadgeColor: color("Directory badge color."),
    forumBadgeColor: color("Forum badge color."),
    mediaBadgeColor: color("Media badge color."),
    nsfwBadgeColor: color("NSFW badge color."),
    lockedBadgeColor: color("Locked badge color."),
    rulesBadgeColor: color("Rules badge color."),
    unknownBadgeColor: color("Unknown badge color."),
    fullBadgeColor: color("Full badge color."),
    lockedVoiceBadgeColor: color("Locked (Voice) badge color."),
    regionBadgeColor: color("Region badge color."),
    honeypotBadgeColor: color("Honeypot badge color.")
});

export type SettingKey = keyof typeof settings.def;
export const SETTING_KEYS = Object.keys(settings.def) as SettingKey[];

interface BadgeDef {
    css: string;
    show: SettingKey;
    label?: SettingKey;
    color: SettingKey;
    title: string;
}

const { badgeIds } = PATTERNS;

const UNKNOWN: BadgeDef = { css: "unknown", show: "showUnknownBadge", label: "unknownBadgeLabel", color: "unknownBadgeColor", title: "A channel type this plugin doesn't know." };

const BADGES: Record<number, BadgeDef> = {
    [ChannelType.GUILD_TEXT]: { css: "text", show: "showTextBadge", label: "textBadgeLabel", color: "textBadgeColor", title: "Text channel." },
    [ChannelType.GUILD_VOICE]: { css: "voice", show: "showVoiceBadge", label: "voiceBadgeLabel", color: "voiceBadgeColor", title: "Voice channel." },
    [ChannelType.GUILD_CATEGORY]: { css: "category", show: "showCategoryBadge", label: "categoryBadgeLabel", color: "categoryBadgeColor", title: "Category." },
    [ChannelType.GUILD_ANNOUNCEMENT]: { css: "announcement", show: "showAnnouncementBadge", label: "announcementBadgeLabel", color: "announcementBadgeColor", title: "Announcement channel, other servers can follow it." },
    [ChannelType.ANNOUNCEMENT_THREAD]: { css: "announcement-thread", show: "showAnnouncementThreadBadge", label: "announcementThreadBadgeLabel", color: "announcementThreadBadgeColor", title: "Thread in an announcement channel." },
    [ChannelType.PUBLIC_THREAD]: { css: "thread", show: "showPublicThreadBadge", label: "publicThreadBadgeLabel", color: "publicThreadBadgeColor", title: "Public thread." },
    [ChannelType.PRIVATE_THREAD]: { css: "private-thread", show: "showPrivateThreadBadge", label: "privateThreadBadgeLabel", color: "privateThreadBadgeColor", title: "Private thread, only invited members can see it." },
    [ChannelType.GUILD_STAGE_VOICE]: { css: "stage", show: "showStageBadge", label: "stageBadgeLabel", color: "stageBadgeColor", title: "Stage channel." },
    [ChannelType.GUILD_DIRECTORY]: { css: "directory", show: "showDirectoryBadge", label: "directoryBadgeLabel", color: "directoryBadgeColor", title: "Server directory." },
    [ChannelType.GUILD_FORUM]: { css: "forum", show: "showForumBadge", label: "forumBadgeLabel", color: "forumBadgeColor", title: "Forum channel." },
    [ChannelType.GUILD_MEDIA]: { css: "media", show: "showMediaBadge", label: "mediaBadgeLabel", color: "mediaBadgeColor", title: "Media channel." },
    [badgeIds.nsfw]: { css: "nsfw", show: "showNSFWBadge", label: "nsfwBadgeLabel", color: "nsfwBadgeColor", title: "This channel is marked as NSFW." },
    [badgeIds.locked]: { css: "locked", show: "showLockedBadge", label: "lockedBadgeLabel", color: "lockedBadgeColor", title: "This thread is locked or archived." },
    [badgeIds.rules]: { css: "rules", show: "showRulesBadge", label: "rulesBadgeLabel", color: "rulesBadgeColor", title: "This channel is the server rules channel." },
    [badgeIds.full]: { css: "full", show: "showFullBadge", label: "fullBadgeLabel", color: "fullBadgeColor", title: "This voice channel is full." },
    [badgeIds.lockedVoice]: { css: "locked-voice", show: "showLockedVoiceBadge", label: "lockedVoiceBadgeLabel", color: "lockedVoiceBadgeColor", title: "You don't have permission to connect to this voice channel." },
    [badgeIds.region]: { css: "region", show: "showRegionBadge", color: "regionBadgeColor", title: "Voice region." },
    [badgeIds.honeypot]: { css: "honeypot", show: "showHoneypotBadge", label: "honeypotBadgeLabel", color: "honeypotBadgeColor", title: "This channel is marked as a honeypot. Sending messages is disabled." }
};

export const badgeDef = (id: number) => BADGES[id] ?? UNKNOWN;
