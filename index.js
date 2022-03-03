const { Client, Intents } = require("discord.js");

const { token } = require("./config.json");
const { QOTDClient } = require("./qotd.client");

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.once("ready", async () => {
  const channel = client.channels.cache.find(
    (channel) => channel.name === "question-of-the-day"
  );

  const {
    activeDailyCodingChallengeQuestion: { link },
  } = await QOTDClient.getQuestionOfTheDay();

  channel.send(`https://leetcode.com${link}`);
});

client.login(token);
