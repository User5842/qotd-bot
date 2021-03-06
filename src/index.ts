import { Client, Intents } from "discord.js";
import { schedule } from "node-cron";

import { token } from "./config.json";
import { QOTDClient } from "./clients/qotd.client";
import { LEETCODE_BASE_URL, QOTD_CHANNEL_ID } from "./constants/constants";

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.once("ready", () => {
  const channel = client.channels.cache.find(
    (channel) => channel.id === QOTD_CHANNEL_ID
  );

  const emote = client.emojis.cache
    .find((emoji) => emoji.name === "vaultboycelebration")
    ?.toString() as string;

  /**
   * This will run every day at 0800.
   */
  schedule("0 8 * * *", () => {
    (async () => {
      const {
        activeDailyCodingChallengeQuestion: {
          link,
          question: { title },
        },
      } = await QOTDClient.getQuestionOfTheDay();

      if (channel?.isText()) {
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
