import { gql } from "@apollo/client";

export const CREATE_FILE_MUTATION = gql`
  mutation CreateFile($user: String!, $class: String!, $num:Int!,image:Upload!,text:[String!],prob:[Float!]) {
    createFile(user: $user, class: $class, num: $num, image:$image,text:$text,prob:$prob) {
      id
      class
      num
      image
      text
      prob
    }
  }
`;

export const DELETE_FILE_MUTATION= gql`
  mutation DeleteFile($id: ID!) {
    deleteFile(id: $id) {
      id
    }
  }
`;

