import { definePluginSettings } from "@api/Settings";
import { OptionType } from "@utils/types";

export const settings = definePluginSettings({
    oneBadgePerChannel: {
        type: OptionType.BOOLEAN,
        default: false,
        description: "Show only one badge per channel",
        restartNeeded: false,
    },
    showTextBadge: {
        type: OptionType.BOOLEAN,
        default: true,
        description: "Show Text badge",
        restartNeeded: false,
    },
    showVoiceBadge: {
        type: OptionType.BOOLEAN,
        default: true,
        description: "Show Voice badge",
        restartNeeded: false,
    },
    showCategoryBadge: {
        type: OptionType.BOOLEAN,
        default: true,
        description: "Show Category badge",
        restartNeeded: false,
    },
    showDirectoryBadge: {
        type: OptionType.BOOLEAN,
        default: true,
        description: "Show Directory badge",
        restartNeeded: false,
    },
    showAnnouncementThreadBadge: {
        type: OptionType.BOOLEAN,
        default: true,
        description: "Show Announcement Thread badge",
        restartNeeded: false,
    },
    showPublicThreadBadge: {
        type: OptionType.BOOLEAN,
        default: true,
        description: "Show Public Thread badge",
        restartNeeded: false,
    },
    showPrivateThreadBadge: {
        type: OptionType.BOOLEAN,
        default: true,
        description: "Show Private Thread badge",
        restartNeeded: false,
    },
    showStageBadge: {
        type: OptionType.BOOLEAN,
        default: true,
        description: "Show Stage badge",
        restartNeeded: false,
    },
    showAnnouncementBadge: {
        type: OptionType.BOOLEAN,
        default: true,
        description: "Show Announcement badge",
        restartNeeded: false,
    },
    showForumBadge: {
        type: OptionType.BOOLEAN,
        default: true,
        description: "Show Forum badge",
        restartNeeded: false,
    },
    showMediaBadge: {
        type: OptionType.BOOLEAN,
        default: true,
        description: "Show Media badge",
        restartNeeded: false,
    },
    showNSFWBadge: {
        type: OptionType.BOOLEAN,
        default: true,
        description: "Show NSFW badge",
        restartNeeded: false,
    },
    showLockedBadge: {
        type: OptionType.BOOLEAN,
        default: true,
        description: "Show Locked badge",
        restartNeeded: false,
    },
    showRulesBadge: {
        type: OptionType.BOOLEAN,
        default: true,
        description: "Show Rules badge",
        restartNeeded: false,
    },
    showUnknownBadge: {
        type: OptionType.BOOLEAN,
        default: true,
        description: "Show Unknown badge",
        restartNeeded: false,
    },
    showFullBadge: {
        type: OptionType.BOOLEAN,
        default: true,
        description: "Show Full (Voice) badge",
        restartNeeded: false,
    },
    showLockedVoiceBadge: {
        type: OptionType.BOOLEAN,
        default: true,
        description: "Show Locked (Voice) badge",
        restartNeeded: false,
    },

    textBadgeLabel: {
        type: OptionType.STRING,
        default: "Text",
        description: "Text badge label",
        restartNeeded: false,
    },
    voiceBadgeLabel: {
        type: OptionType.STRING,
        default: "Voice",
        description: "Voice badge label",
        restartNeeded: false,
    },
    categoryBadgeLabel: {
        type: OptionType.STRING,
        default: "Category",
        description: "Category badge label",
        restartNeeded: false,
    },
    announcementBadgeLabel: {
        type: OptionType.STRING,
        default: "News",
        description: "Announcement badge label",
        restartNeeded: false,
    },
    announcementThreadBadgeLabel: {
        type: OptionType.STRING,
        default: "News Thread",
        description: "Announcement Thread badge label",
        restartNeeded: false,
    },
    publicThreadBadgeLabel: {
        type: OptionType.STRING,
        default: "Thread",
        description: "Public Thread badge label",
        restartNeeded: false,
    },
    privateThreadBadgeLabel: {
        type: OptionType.STRING,
        default: "Private Thread",
        description: "Private Thread badge label",
        restartNeeded: false,
    },
    stageBadgeLabel: {
        type: OptionType.STRING,
        default: "Stage",
        description: "Stage badge label",
        restartNeeded: false,
    },
    directoryBadgeLabel: {
        type: OptionType.STRING,
        default: "Directory",
        description: "Directory badge label",
        restartNeeded: false,
    },
    forumBadgeLabel: {
        type: OptionType.STRING,
        default: "Forum",
        description: "Forum badge label",
        restartNeeded: false,
    },
    mediaBadgeLabel: {
        type: OptionType.STRING,
        default: "Media",
        description: "Media badge label",
        restartNeeded: false,
    },
    nsfwBadgeLabel: {
        type: OptionType.STRING,
        default: "NSFW",
        description: "NSFW badge label",
        restartNeeded: false,
    },
    lockedBadgeLabel: {
        type: OptionType.STRING,
        default: "Locked",
        description: "Locked badge label",
        restartNeeded: false,
    },
    rulesBadgeLabel: {
        type: OptionType.STRING,
        default: "Rules",
        description: "Rules badge label",
        restartNeeded: false,
    },
    unknownBadgeLabel: {
        type: OptionType.STRING,
        default: "Unknown",
        description: "Unknown badge label",
        restartNeeded: false,
    },
    fullBadgeLabel: {
        type: OptionType.STRING,
        default: "Full",
        description: "Full badge label",
        restartNeeded: false,
    },
    lockedVoiceBadgeLabel: {
        type: OptionType.STRING,
        default: "Locked",
        description: "Locked (Voice) badge label",
        restartNeeded: false,
    },

    textBadgeColor: {
        type: OptionType.STRING,
        description: "Text badge color",
        restartNeeded: false,
    },
    voiceBadgeColor: {
        type: OptionType.STRING,
        description: "Voice badge color",
        restartNeeded: false,
    },
    categoryBadgeColor: {
        type: OptionType.STRING,
        description: "Category badge color",
        restartNeeded: false,
    },
    announcementBadgeColor: {
        type: OptionType.STRING,
        description: "Announcement badge color",
        restartNeeded: false,
    },
    announcementThreadBadgeColor: {
        type: OptionType.STRING,
        description: "Announcement Thread badge color",
        restartNeeded: false,
    },
    publicThreadBadgeColor: {
        type: OptionType.STRING,
        description: "Public Thread badge color",
        restartNeeded: false,
    },
    privateThreadBadgeColor: {
        type: OptionType.STRING,
        description: "Private Thread badge color",
        restartNeeded: false,
    },
    stageBadgeColor: {
        type: OptionType.STRING,
        description: "Stage badge color",
        restartNeeded: false,
    },
    directoryBadgeColor: {
        type: OptionType.STRING,
        description: "Directory badge color",
        restartNeeded: false,
    },
    forumBadgeColor: {
        type: OptionType.STRING,
        description: "Forum badge color",
        restartNeeded: false,
    },
    mediaBadgeColor: {
        type: OptionType.STRING,
        description: "Media badge color",
        restartNeeded: false,
    },
    nsfwBadgeColor: {
        type: OptionType.STRING,
        description: "NSFW badge color",
        restartNeeded: false,
    },
    lockedBadgeColor: {
        type: OptionType.STRING,
        description: "Locked badge color",
        restartNeeded: false,
    },
    rulesBadgeColor: {
        type: OptionType.STRING,
        description: "Rules badge color",
        restartNeeded: false,
    },
    unknownBadgeColor: {
        type: OptionType.STRING,
        description: "Unknown badge color",
        restartNeeded: false,
    },
    fullBadgeColor: {
        type: OptionType.STRING,
        description: "Full badge color",
        restartNeeded: false,
    },
    lockedVoiceBadgeColor: {
        type: OptionType.STRING,
        description: "Locked (Voice) badge color",
        restartNeeded: false,
    },
});

export function isEnabled(type: number) {
    const fromValues = settings.store;

    switch (type) {
        case 0:
            return fromValues.showTextBadge;
        case 2:
            return fromValues.showVoiceBadge;
        case 4:
            return fromValues.showCategoryBadge;
        case 5:
            return fromValues.showAnnouncementBadge;
        case 10:
            return fromValues.showAnnouncementThreadBadge;
        case 11:
            return fromValues.showPublicThreadBadge;
        case 12:
            return fromValues.showPrivateThreadBadge;
        case 13:
            return fromValues.showStageBadge;
        case 14:
            return fromValues.showDirectoryBadge;
        case 15:
            return fromValues.showForumBadge;
        case 16:
            return fromValues.showMediaBadge;
        case 6100:
            return fromValues.showNSFWBadge;
        case 6101:
            return fromValues.showLockedBadge;
        case 6102:
            return fromValues.showRulesBadge;
        case 6103:
            return fromValues.showFullBadge;
        case 6104:
            return fromValues.showLockedVoiceBadge;
        default:
            return fromValues.showUnknownBadge;
    }
}

export function returnChannelBadge(type: number) {
    switch (type) {
        case 0:
            return { css: "text", label: settings.store.textBadgeLabel, color: settings.store.textBadgeColor };
        case 2:
            return { css: "voice", label: settings.store.voiceBadgeLabel, color: settings.store.voiceBadgeColor };
        case 4:
            return { css: "category", label: settings.store.categoryBadgeLabel, color: settings.store.categoryBadgeColor };
        case 5:
            return { css: "announcement", label: settings.store.announcementBadgeLabel, color: settings.store.announcementBadgeColor };
        case 10:
            return { css: "announcement-thread", label: settings.store.announcementThreadBadgeLabel, color: settings.store.announcementThreadBadgeColor };
        case 11:
            return { css: "thread", label: settings.store.publicThreadBadgeLabel, color: settings.store.publicThreadBadgeColor };
        case 12:
            return { css: "private-thread", label: settings.store.privateThreadBadgeLabel, color: settings.store.privateThreadBadgeColor };
        case 13:
            return { css: "stage", label: settings.store.stageBadgeLabel, color: settings.store.stageBadgeColor };
        case 14:
            return { css: "directory", label: settings.store.directoryBadgeLabel, color: settings.store.directoryBadgeColor };
        case 15:
            return { css: "forum", label: settings.store.forumBadgeLabel, color: settings.store.forumBadgeColor };
        case 16:
            return { css: "media", label: settings.store.mediaBadgeLabel, color: settings.store.mediaBadgeColor };
        case 6100:
            return { css: "nsfw", label: settings.store.nsfwBadgeLabel, color: settings.store.nsfwBadgeColor };
        case 6101:
            return { css: "locked", label: settings.store.lockedBadgeLabel, color: settings.store.lockedBadgeColor };
        case 6102:
            return { css: "rules", label: settings.store.rulesBadgeLabel, color: settings.store.rulesBadgeColor };
        case 6103:
            return { css: "full", label: settings.store.fullBadgeLabel, color: settings.store.fullBadgeColor };
        case 6104:
            return { css: "locked-voice", label: settings.store.lockedVoiceBadgeLabel, color: settings.store.lockedVoiceBadgeColor };
        default:
            return { css: "unknown", label: settings.store.unknownBadgeLabel, color: settings.store.unknownBadgeColor };
    }
}
