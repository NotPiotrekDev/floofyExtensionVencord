import definePlugin from "@utils/types";
import { findByPropsLazy } from "@webpack";
import { FluxDispatcher, MessageActions } from "@webpack/common";
import { settings } from "./settings"
import { addPreSendListener, removePreSendListener } from "@api/MessageEvents";
import { isPluginDev } from "@utils/misc";
import { BadgePosition, BadgeUserArgs, ProfileBadge } from "@api/Badges";
import { ApplicationCommandInputType, ApplicationCommandOptionType, findOption, sendBotMessage } from "@api/Commands";
import { RestAPI, UserStore } from "@webpack/common";
import { User } from "discord-types/general";
import vencordToolbox from "plugins/vencordToolbox";
const PendingReplyStore = findByPropsLazy("getPendingReply");
function sendMessage(channelId, message) {
    message = {
        // The following are required to prevent Discord from throwing an error
        invalidEmojis: [],
        tts: false,
        validNonShortcutEmojis: [],
        ...message
    };
    const reply = PendingReplyStore.getPendingReply(channelId);
    MessageActions.sendMessage(channelId, message, void 0, MessageActions.getSendMessageOptionsForReply(reply))
        .then(() => {
            if (reply) {
                FluxDispatcher.dispatch({ type: "DELETE_PENDING_REPLY", channelId });
            }
        });
}

function pickRandomGif<T>(choices: T[]): T | undefined {
    if (choices.length === 0) {
      return undefined;
    }
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
  }

const gifArray = ['https://tenor.com/view/boy-kisser-silly-cat-doom-nuts-wad-doom-wad-gif-6115213102110131046', 'https://tenor.com/view/boykisser-gif-7714055146300364487', 'https://tenor.com/view/i-know-what-you-are-boykisser-ominous-stare-gif-1854943194524266546', 'https://tenor.com/view/boykisser-meme-gif-10721481181001359046', 'https://tenor.com/view/chipichipi-boykisser-boykisser-chipichipi-chipichipichapachapa-gif-10758258345566257', 'https://tenor.com/view/boykisser-kiss-kiss-gif-kissing-smooch-gif-14255811052713401590', 'https://tenor.com/view/mauzymice-mauzy-mauzy-mice-silly-cat-silly-gif-13268035719236443520', 'https://tenor.com/view/mauzymice-cat-gif-7844744970396116880', 'https://tenor.com/view/mauzymice-cat-gif-27571557', 'https://tenor.com/view/mauzimice-mauzymice-mauzy-mice-boykisser-cute-gif-16690839224429433467', 'https://tenor.com/view/boykisser-close-face-paws-gif-16985833697949199825', 'https://tenor.com/view/boykisser-meme-gif-6685457771534397088', 'https://tenor.com/view/boykisser-gif-7099278856497118059', 'https://tenor.com/view/furry-dog-clap-happy-wholesome-gif-23836654', 'https://tenor.com/view/boy-kisser-boykisser-gif-7421460624716631752', 'https://tenor.com/view/hjk-gif-17535106170559177485', 'https://tenor.com/view/furry-wiggle-mrrp-nya-colon-three-gif-27633901', 'https://tenor.com/view/boy-kisser-boykisser-boy-kisser-type-type-typing-gif-4348094406361571449', 'https://tenor.com/view/this-is-flipping-insane-flipping-flip-insane-this-is-insane-gif-14014807786073580480', 'https://tenor.com/view/boykisser-boykisser-meme-gif-gif-27524383', 'https://tenor.com/view/boy-kisser-киссер-gif-18158458200631768784', 'https://tenor.com/view/boy-kisser-киссер-gif-17481603757316382089', 'https://tenor.com/view/boykisser-uwu-love-love-you-gif-14485099353569842281']

// Badges



export default definePlugin({
    name: "Floofy extension",
    description: "Superb plugin, paw-sitively awesome!",
    authors: [{
        name: "NotPiotrekDev",
        id: 1181840393927663697n
    }],
    dependencies: ["CommandsAPI"],
    settings,
    commands: [
        {
            name: "hewwo",
            description: "UwU, hewwo there!",
            inputType: ApplicationCommandInputType.BUILT_IN,
            options: [],
            execute: (_, ctx) => {
                sendMessage(ctx.channel.id, {
                    content: `UwU, hewwo there!`
                });
            }
        },
        {
            name: "fluffy-gif",
            description: 'Vewy fluffy gif',
            inputType: ApplicationCommandInputType.BUILT_IN,
            options: [],
            execute: (_, ctx) => {
                const randomGif = pickRandomGif(gifArray)
                sendMessage(ctx.channel.id, { content: `${randomGif}` })
            }
        },
        {
            name: "custom-badge",
            description: "Get custom badge",
            inputType: ApplicationCommandInputType.BUILT_IN,
            options: [
                {
                    name: "url",
                    description: "URL to badge image",
                    type: ApplicationCommandOptionType.STRING,
                    required: true
                },
                {
                    name: "title",
                    description: "Title of the badge",
                    type: ApplicationCommandOptionType.STRING,
                    required: true
                }
            ],
            execute: async (_, ctx) => {
                const url = findOption(_, "url", "");
                const name = findOption(_, "title", "")
                const currentUserID = UserStore.getCurrentUser().id;
                const CustomBadge: ProfileBadge = {
                    description: name,
                    image: url,
                    position: BadgePosition.START,
                    props: {
                        style: {
                            borderRadius: "50%",
                            transform: "scale(0.9)" // The image is a bit too big compared to default badges
                        }
                    },
                    shouldShow: ({ user }) => user.id === currentUserID,
                    link: "https://github.com/NotPiotrekDev/floofyExtensionVencord"
                };
                Vencord.Api.Badges.addBadge(CustomBadge)
                sendBotMessage(ctx.channel.id, {content: "Badge has been added! To remove custom badges, reload discord."})
            }
        }
    ],
    start() {
        const currentUserID = UserStore.getCurrentUser().id;
        const DEV_BADGE = "https://raw.githubusercontent.com/NotPiotrekDev/floofyExtensionVencord/main/devBadge.png";
        const DevBadge: ProfileBadge = {
            description: "Floofy Developer",
            image: DEV_BADGE,
            position: BadgePosition.START,
            props: {
                style: {
                    borderRadius: "50%",
                    transform: "scale(0.9)" // The image is a bit too big compared to default badges
                }
            },
            shouldShow: ({ user }) => isPluginDev(user.id),
            link: "https://github.com/NotPiotrekDev/floofyExtensionVencord"
        };
        const BOYKISSER_BADGE = "https://raw.githubusercontent.com/NotPiotrekDev/floofyExtensionVencord/main/boykisserBadge.png"
        const BoykiserBadge: ProfileBadge = {
            description: "Certified Boykisser",
            image: BOYKISSER_BADGE,
            position: BadgePosition.START,
            props: {
                style: {
                    borderRadius: "50%",
                    transform: "scale(0.9)"
                }
            },
            shouldShow: ({ user }) => user.id === currentUserID,
            link: "https://github.com/NotPiotrekDev/floofyExtensionVencord"
        }
        const FURRY_BADGE = "https://raw.githubusercontent.com/NotPiotrekDev/floofyExtensionVencord/main/furryBadge.png"
        const FurryBadge: ProfileBadge = {
            description: "Certified Furry",
            image: FURRY_BADGE,
            props: {
                style: {
                    borderRadius: "50%",
                    transform: "scale(0.9)"
                }
            },
            shouldShow: ({ user }) => user.id === currentUserID,
            link: "https://github.com/NotPiotrekDev/floofyExtensionVencord"
        }
        const PROTOGEN_BADGE = "https://raw.githubusercontent.com/NotPiotrekDev/floofyExtensionVencord/main/protogenBadge.png"
        const ProtogenBadge: ProfileBadge = {
            description: "Certified Protogen",
            image: PROTOGEN_BADGE,
            props: {
                style: {
                    borderRadius: "50%",
                    transform: "scale(0.9)"
                }
            },
            shouldShow: ({ user }) => user.id === currentUserID,
            link: "https://github.com/NotPiotrekDev/floofyExtensionVencord"
        }
        const COLONTHREE_BADGE = "https://raw.githubusercontent.com/NotPiotrekDev/floofyExtensionVencord/main/colonThreeBadge.png"
        const ColonThreeBadge: ProfileBadge = {
            description: ":3",
            image: COLONTHREE_BADGE,
            props: {
                style: {
                    borderRadius: "50%",
                    transform: "scale(0.9)"
                }
            },
            shouldShow: ({ user }) => user.id === currentUserID,
            link: "https://github.com/NotPiotrekDev/floofyExtensionVencord"
        }
        const FEMBOY_BADGE = "https://raw.githubusercontent.com/NotPiotrekDev/floofyExtensionVencord/main/femboyBadge.png"
        const FemboyBadge: ProfileBadge = {
            description: "Certified Femboy",
            image: FEMBOY_BADGE,
            props: {
                style: {
                    borderRadius: "50%",
                    transform: "scale(0.9)"
                }
            },
            shouldShow: ({ user }) => user.id === currentUserID,
            link: "https://github.com/NotPiotrekDev/floofyExtensionVencord"
        }
        this.preSend = addPreSendListener(async (_, message) => {
            if (!settings.store.autoChange) return;
            if (!message.content) return;
            message.content = message.content.replace("hello", "hewwo");
            message.content = message.content.replace("help", "hewp");
            message.content = message.content.replace("everyone", "evewyonye");
            message.content = message.content.replace("here", "hewe");
            message.content = message.content.replace("you", "youw");
            message.content = message.content.replace("under", "undew");
            message.content = message.content.replace("look", "wook");
            message.content = message.content.replace("small", "smaww");
            message.content = message.content.replace("hurray", "huwway");
            message.content = message.content.replace("scary", "scawy");
            message.content = message.content.replace("drawing", "dwawing");
            message.content = message.content.replace("oiled", "oiwed");
            message.content = message.content.replace("please", "pwease");
            message.content = message.content.replace("responsibly", "wesponsibwy");
            message.content = message.content.replace("very", "vewy");
            const randomValueHehe = Math.random() * 100
            if (randomValueHehe < 34) {
                message.content = message.content + " :3"
            }
        })
        if (settings.store.customBadgeCode === "EKj9a74GDB6ph2zhOi7BuLHuW") {
            if (settings.store.devBadge) {
                Vencord.Api.Badges.addBadge(DevBadge)
            }
            if (settings.store.BoykisserBadge) {
                Vencord.Api.Badges.addBadge(BoykiserBadge)
            }
            if (settings.store.FurryBadge) {
                Vencord.Api.Badges.addBadge(FurryBadge)
            }
            if (settings.store.ProtogenBadge) {
                Vencord.Api.Badges.addBadge(ProtogenBadge)
            }
            if (settings.store.ColonThreeBadge) {
                Vencord.Api.Badges.addBadge(ColonThreeBadge)
            }
            if (settings.store.femboyBadge) {
                Vencord.Api.Badges.addBadge(FemboyBadge)
            }
        }
        if (settings.store.NoneBadge) {
            Vencord.Api.Badges.removeBadge(DevBadge)
            Vencord.Api.Badges.removeBadge(BoykiserBadge)
            Vencord.Api.Badges.removeBadge(FurryBadge)
            Vencord.Api.Badges.removeBadge(ProtogenBadge)
            Vencord.Api.Badges.removeBadge(ColonThreeBadge)
            Vencord.Api.Badges.removeBadge(FemboyBadge)
        }
    },
    stop() {
        removePreSendListener(this.preSend);
    },
});
