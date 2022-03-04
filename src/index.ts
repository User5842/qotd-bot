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

  /**
   * This will run every day at 0800.
   */
  schedule("0 8 * * *", async () => {
    const {
      activeDailyCodingChallengeQuestion: { link },
    } = await QOTDClient.getQuestionOfTheDay();

    if (channel?.isText()) {
      channel.send(`${LEETCODE_BASE_URL}${link}`);
    }
  });
});

client.login(token);
