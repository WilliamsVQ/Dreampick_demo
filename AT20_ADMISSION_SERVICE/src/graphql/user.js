import { gql } from '@apollo/client'

export const CREATE_USER = gql`
mutation($firstName: String!, $lastName: String!, $email: String!, $phone: String!, $roleId: ID!, $photo: String){
  createUser(firstName: $firstName, lastName: $lastName, email: $email, phone: $phone, roleId: $roleId, photo: $photo) {
    _id
    globalID
    firstName
    firstPassword
    userName
    photo
  }
}
`
export const UPLOAD_IMAGE = gql`
  mutation singleUpload($file: Upload) {
    singleUpload(file: $file)
  }
`

export const GET_USERS = gql`
{
  users {
    _id
    email
    firstName
    lastName
    userName
    phone
    firstPassword
    role {
      _id
      name
    }
    photo
  }
}
`

export const DELETE_USER = gql`
mutation($id: ID){
  deleteUser (_id: $id){
    _id
  }
}
`

export const GET_PHOTO = gql`
query ($filename: String) {
  photo(filename: $filename)
}
`
export const COMPILER = gql`
mutation($file: Upload!, $language: String!){
  compiler(file: $file, language: $language)
}
`
export const LOGIN = gql`
mutation($email: String, $password: String, ){
  login(email: $email, password: $password){
    message
    info {
      _id
      firstName
      lastName
      userName
      firstPassword
      email
      phone
      age
      country
      city
      role {
        _id
        name
      }
      photo
    }
  }
}`

export const UPDATE_USER = gql`
mutation($id: ID, $firstName: String, $lastName: String, $userName: String, $firstPassword: String, $email: String, $phone: String, $country: String, $city: String, $age: Int){
  updateUser (_id: $id, firstName: $firstName, lastName: $lastName, userName: $userName, firstPassword: $firstPassword, email: $email, phone: $phone, country: $country, city: $city, age: $age){
    _id
    firstName
    lastName
    userName
    firstPassword
    country
    city
    age
    role {
      name
    }
  }
}`

export const GET_USER = gql`
query ($id: ID) {
  user (_id: $id){
    firstName
    lastName
    userName
    email
    phone
    firstPassword
    phone
    age
    country
    city
    role {
      name
    }
    photo
  }
}`

export const CONVERT_IMAGE = gql`
  mutation ConvertImage($image: Upload!, $width: Int!, $height: Int!) {
    convertImage(image: $image, width: $width, height: $height) {
      url
    }
  }
`;