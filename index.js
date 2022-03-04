const { Client, Intents } = require("discord.js");
const cron = require("node-cron");

const { token } = require("./config.json");
const { QOTDClient } = require("./qotd.client");

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
