/**
 * A partial interface representing the LeetCode
 * question of the day.
 */
export interface IQOTD {
  readonly activeDailyCodingChallengeQuestion: {
    /**
     * Relative link to the question.
     */
    readonly link: string;

    /**
     * Question data bag.
     */
    readonly question: {
      /**
       * Normalized question title.
       */
      readonly title: string;
    };
  };
}
