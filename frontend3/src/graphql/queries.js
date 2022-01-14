import { gql } from "@apollo/client";


export const GET_USER_FILE_QUERY = gql`
  query GetUserFile($name: String!, $class: String!,) {
    getUserFile(name: $name, class: $class) {
      id
    }
  }
`;

