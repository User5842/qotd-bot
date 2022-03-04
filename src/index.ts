import { Client, Intents } from "discord.js";
import cron from "node-cron";

import { token } from "../config.json";
import { QOTDClient } from "./qotd.client";

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.once("ready", () => {
  const channel = client.channels.cache.find(
    (channel) => channel.name === "question-of-the-day"
  );

  /**
   * This will run every day at 0800.
   */
  cron.schedule("0 8 * * *", async () => {
    const {
      activeDailyCodingChallengeQuestion: { link },
    } = await QOTDClient.getQuestionOfTheDay();

    channel.send(`https://leetcode.com${link}`);
  });
});

client.login(token);
