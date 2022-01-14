import { gql } from "@apollo/client";

export const CREATE_FILE_MUTATION = gql`
  mutation CreateFile($user: String!, $class: String!, $num:Int!,$image:Upload!,$text:[String!],$prob:[Float!]) {
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

export const REGISTER_USER_MUTATION= gql`
  mutation RegisterUser($username: String!, $email: String!, $password: String!){
    registerUser(
      username: $username
      email: $email
      password: $password
    ) {
      id
      username
      email
      password
    }
  }
`;

export const LOG_IN_USER = gql`
  mutation LogInUser($username: String!, $password: String!,) {
    getUserFile(usernamename: $usernamename, password: $password) {
      id
      task
      username
      email
      password 
    }
  }
`;

