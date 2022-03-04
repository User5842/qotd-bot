const { GraphQLClient, gql } = require("graphql-request");

class QOTDClient {
  /**
   * Retrieves the LeetCode question of the day.
   * @returns The link representing the LeetCode question of the day.
   */
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
