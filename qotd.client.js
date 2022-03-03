const { GraphQLClient, gql } = require("graphql-request");

class QOTDClient {
  static async getQuestionOfTheDay() {
    const graphQLClient = new GraphQLClient("https://leetcode.com/graphql");
    return graphQLClient.request(gql`
      {
        activeDailyCodingChallengeQuestion {
          link
        }
      }
    `);
  }
}

module.exports = { QOTDClient };
