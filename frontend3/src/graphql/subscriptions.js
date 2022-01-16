import { gql } from "@apollo/client";

export const TASK_RENEW_SUBSCRIPTION = gql`
  subscription TaskRenew {
    taskrenew {
        image
        class
        text
        prob
    }
  }
`;

