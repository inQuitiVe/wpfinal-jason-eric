import { gql } from "@apollo/client";

export const CREATE_FILE_MUTATION = gql`
  mutation CreateFile($user:String, $class: String, $num: Int, $image: [String], $text: [String], $prob:[Float]) {
    createFile(user: $user,class: $class, num: $num, image: $image, text: $text, prob: $prob) {
      id
      class
      num
      image
      text
      prob
      user
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
      message
    }
  }
`;

export const LOG_IN_USER = gql`
  mutation LogInUser($username: String!, $password: String!,) {
    logInUser(username: $username, password: $password) {
      id
      message
    }
  }
`;




export const TEST = gql`
  mutation Test($a:String!){
    test(a:$a){
      a
    }
  }
`;
