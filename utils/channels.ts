/*
 * Vencord, a Discord client mod
 * Copyright (c) 2026 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import type { Channel } from "@vencord/discord-types";
import { ChannelType } from "@vencord/discord-types/enums";

import { PATTERNS } from "../patterns";

export const isVoiceChannel = (channel: Channel) =>
    channel.type === ChannelType.GUILD_VOICE || channel.type === ChannelType.GUILD_STAGE_VOICE;

const REGION_ABBREVIATIONS: Record<string, string> = {
    "brazil": "SA",
    "hongkong": "HK",
    "india": "IN",
    "japan": "JP",
    "rotterdam": "EU",
    "singapore": "SG",
    "southafrica": "AF",
    "sydney": "OC",
    "us-central": "US-C",
    "us-east": "US-E",
    "us-south": "US-S",
    "us-west": "US-W",
    "europe": "EU",
    "russia": "RU",
    "south-korea": "KR",
    "dubai": "DXB",
};

export const getRegionAbbreviation = (region: string) =>
    Object.hasOwn(REGION_ABBREVIATIONS, region) ? REGION_ABBREVIATIONS[region] : region.toUpperCase();

export function getVoiceServerCode(hostname: string) {
    const code = hostname.match(PATTERNS.voiceServer)?.[1];
    return code ? getRegionAbbreviation(code.toLowerCase()) : null;
}
