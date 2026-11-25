/*
 * Vencord, a Discord client mod
 * Copyright (c) 2026 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

/** Discord code and names this plugin matches. */
export const PATTERNS = {
    patches: {
        channelFind: "UNREAD_IMPORTANT:",
        channelMatch: /\.Children\.count.{0,200}?:null(?<=,channel:(\i).{0,500}?)/,
        threadFind: "18V16H9v2H6Zm3",
        threadMatch: /\(0,\i\.jsx\)\(\i,\{thread:(\i),countInVoice:.{0,100}?\}\)/
    },

    /** The HoneypotSafety plugin and where it keeps its channel list. */
    honeypotPlugin: "HoneypotSafety",
    honeypotSetting: "plugins.HoneypotSafety.honeypotChannels",

    /** RTCConnectionStore states. */
    rtc: {
        connected: "RTC_CONNECTED",
        bad: ["NO_ROUTE", "RTC_DISCONNECTED"]
    },

    /** Voice server hostnames look like "c-fra12-..." or "rotterdam1234...". */
    voiceServer: /^(?:c-)?([a-z]+)\d/i,

    /** Ids for badges that aren't channel types, kept clear of Discord's channel type numbers. */
    badgeIds: {
        nsfw: 6100,
        locked: 6101,
        rules: 6102,
        full: 6103,
        lockedVoice: 6104,
        region: 6105,
        honeypot: 6106
    }
} as const;
