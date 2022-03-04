import { GraphQLClient } from "graphql-request";
import { LEETCODE_GRAPH_ENDPOINT } from "../constants/constants";
import { IQOTD } from "../interfaces/QOTD.interface";

export class QOTDClient {
  /**
   * Retrieves the LeetCode question of the day.
   * @returns The link representing the LeetCode question of the day.
   */
  static async getQuestionOfTheDay() {
    const query = /* GraphQL */ `
      {
        activeDailyCodingChallengeQuestion {
          link
          question {
            title
          }
        }
      }
    `;
    const graphQLClient = new GraphQLClient(LEETCODE_GRAPH_ENDPOINT);
    return graphQLClient.request<IQOTD>(query);
  }
}
