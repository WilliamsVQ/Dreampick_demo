import {gql} from '@apollo/client';

export const GET_ROLES = gql`
{
  roles {
        _id
        name
  }
}
`;

export const GET_ROLE = gql`
query ($id: ID) {
  project (_id: $id) {
    _id
    name
    users {
      _id
      name
    }
  }
}
`

/*export const CREATE_ROLES = gql`mutation($name: String) {
  createRole(name: $name) {
    _id
    name
  }
}
`
*/