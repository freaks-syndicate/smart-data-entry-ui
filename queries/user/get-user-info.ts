import { gql } from '@apollo/client';

export const GET_USER_INFO = gql`
  query User($where: WhereOptionsUser) {
    user: User(where: $where) {
      userId
      firstName
      lastName
      roles {
        name
        permissions
      }
    }
  }
`;
