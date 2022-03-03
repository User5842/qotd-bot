const { Client, Intents } = require("discord.js");
const { GraphQLClient } = require("graphql-request");
const { gql } = require("graphql-request");

const { token } = require("./config.json");

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.once("ready", async () => {
  const channel = client.channels.cache.find(
    (channel) => channel.name === "question-of-the-day"
  );

  const query = gql`
    {
      activeDailyCodingChallengeQuestion {
        link
      }
    }
  `;

  const graphQLClient = new GraphQLClient("https://leetcode.com/graphql/");
  const {
    activeDailyCodingChallengeQuestion: { link },
  } = await graphQLClient.request(query);
  channel.send(`https://leetcode.com${link}`);
});

client.login(token);
