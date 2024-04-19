import { definePluginSettings } from "@api/Settings";
import { OptionType } from "@utils/types";

export const settings = definePluginSettings({
    autoChange: {
        type: OptionType.BOOLEAN,
        description: "Change message text",
        default: true,
        restartNeeded: true
    },
    customBadgeCode: {
        type: OptionType.STRING,
        description: "Enter secret code to get access to custom badges",
    },
    devBadge: {
        type: OptionType.BOOLEAN,
        description: "Get Floofy Developer badge [Only for dev]",
        default: false,
        restartNeeded: true
    },
    BoykisserBadge: {
        type: OptionType.BOOLEAN,
        description: "Get Certified Boykisser badge [Code required]",
        default: false,
        restartNeeded: true
    },
    FurryBadge: {
        type: OptionType.BOOLEAN,
        description: "Get Certified Furry badge [Code required]",
        default: false,
        restartNeeded: true
    },
    ProtogenBadge: {
        type: OptionType.BOOLEAN,
        description: "Get Certified Protogen badge [Code required]",
        default: false,
        restartNeeded: true
    },
    ColonThreeBadge: {
        type: OptionType.BOOLEAN,
        description: "Get :3 badge [Code required]",
        default: false,
        restartNeeded: true
    },
    femboyBadge: {
        type: OptionType.BOOLEAN,
        description: "Get Certified Femboy badge [Code required]",
        default: false,
        restartNeeded: true
    },
    NoneBadge: {
        type: OptionType.BOOLEAN,
        description: "Remove all badges",
        default: true,
        restartNeeded: true
    },
});
