import { definePluginSettings } from "@api/Settings";
import { OptionType } from "@utils/types";

export const settings = definePluginSettings({
    autoChange: {
        type: OptionType.BOOLEAN,
        description: "Change message text",
        default: true,
    },
});
