import { GraphQLClient, gql } from "graphql-request";
import { IQOTD } from "./interfaces/QOTD.interface";

class QOTDClient {
  /**
   * Retrieves the LeetCode question of the day.
   * @returns The link representing the LeetCode question of the day.
   */
  static async getQuestionOfTheDay() {
    const query = /* GraphQL */ `
      {
        activeDailyCodingChallengeQuestion {
          link
        }
      }
    `;
    const graphQLClient = new GraphQLClient("https://leetcode.com/graphql");
    return graphQLClient.request<IQOTD>(query);
  }
}

module.exports = { QOTDClient };
