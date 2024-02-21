import { ChannelType, Client, GatewayIntentBits } from "discord.js";
import { schedule } from "node-cron";

import { token } from "./config.json";
import { QOTDClient } from "./clients/qotd.client";
import { LEETCODE_BASE_URL, QOTD_CHANNEL_ID } from "./constants/constants";

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once("ready", () => {
  const channel = client.channels.cache.find(
    (channel) => channel.id === QOTD_CHANNEL_ID,
  );

  const emote = client.emojis.cache
    .find((emoji) => emoji.name === "vaultboycelebration")
    ?.toString() as string;

  /**
   * This will run every day at 0100.
   */
  schedule("0 1 * * *", () => {
    (async () => {
      const {
        activeDailyCodingChallengeQuestion: {
          link,
          question: { title },
        },
      } = await QOTDClient.getQuestionOfTheDay();

      if (channel?.type === ChannelType.GuildText) {
        const message = await channel.send(`
          I have been programmed to remind you to do your question of the day.\n_whirring noise_ Here you go: ${LEETCODE_BASE_URL}${link}.\nPlease. React with ${emote} once you have completed your task.`);

        await message.startThread({
          autoArchiveDuration: 1440,
          name: title,
          reason: `Needed a separate thread for ${title}`,
        });
      }
    })().catch(console.error);
  });
});

client.login(token).catch(console.error);
