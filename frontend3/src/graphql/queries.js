import { gql } from "@apollo/client";


export const GET_USER_FILE_QUERY = gql`
  query GetUserFile($username: String!, $class: String!,) {
    getUserFile(username: $username, class: $class) {
      image
      text
      prob
    }
  }
`;

