import {gql} from 'graphql-tag'

export const typeDefs = gql`

    scalar File
    scalar Upload
    type Query{
        users: [User]
        user(_id: ID): User
        role(_id: ID): Role
        roles: [Role]
        note(_id: ID): Note
        notes: [Note]
        photo(filename: String): String
        getMeetings: [Meeting]
        
    }
    type Mutation {
        createRole(name: String): Role
        createUser(
            globalID: String,
            firstName: String, 
            lastName: String,
            userName: String,
            firstPassword: String,
            password: String,
            email: String,
            phone: String,
            country: String,
            city: String,
            age: Int,
            roleId: ID, 
            photo: String): User
        
        uploadNote(userId: ID, nameTest: String, answers: [String], score: String): Note
        
        login(userName: String, email: String, password: String): LoginResponse
        
        updateRole(_id: ID, name: String): Role        
        updateUser(_id: ID, 
            firstName: String, 
            lastName: String,
            userName: String,
            firstPassword: String,
            email: String,
            phone: String,
            country: String,
            city: String,
            age: Int,
            photo: String): User

        deleteRole(_id: ID): Role
        deleteUser(_id: ID): User
        singleUpload(file: Upload): String
        compiler(file: Upload!, language: String!): String
        convertImage(image: Upload!, width: Int!, height: Int!): ConvertedResult!
        newMeeting(data: String): String

    }
    type Role {
        _id: ID
        name: String
        createdAt: String
        updatedAt: String
        users: [User]
    }
    type User {
        _id: ID
        globalID: String
        firstName: String
        lastName: String
        userName: String
        firstPassword: String
        password: String
        email: String
        phone: String
        country: String
        city: String
        age: Int
        createdAt: String
        updatedAt: String
        role: Role
        notes: [Note]
        photo: String
    }

    type LoginResponse {
        message: String!
        info: User
    }

    type Note {
        _id: ID
        user: User
        nameTest: String
        answers: [String]
        score: String
    }

    type ConvertedResult {
        url: String!
    }

    type Meeting {
        _id: ID!
        id: String!
        host_global_id: [Host!]!
        guest_global_id: [Guest!]!
        meeting_name: String!
        description: String!
        date: String!
        start_time: String!
        end_time: String!
        time_zone: [TimeZone!]!
        active: Boolean
        createdAt: String!
        updatedAt: String!
    }

    type Host {
        id: String!
        name: String!
        phone: String!
        _id: ID!
    }

    type Guest {
        id: String!
        name: String!
        phone: String!
        _id: ID!
    }

    type TimeZone {
        value: String!
        label: String!
        _id: ID!
    }   


##questionnaire
type Question {
  id: ID
  question: String
  test: String
  imgSrc: String
  type: String
  Answer: String
  options: [Option]
}

type Option {
  Value: String
  Label: String
}

type QuestionObject {
  id: ID
  Question: String
  ImgScr: String
  test: String
  type: String
  Answer: String
  options: [OptionObject]
}

type QuestionObjects {
  IDQuestions: ID
  Question: String
  ImgScr: String
  test: String
  type: String
  Answer: String
  options: [OptionObject]
}

type OptionObject {
  Label: String
  Value: String
}

type Query {
    getQuestion: [Question]
    getQuestionCount: Int!
    getQuestions: [Question!]!
    getQuestionByID(id: ID!): QuestionObject
    getQuestionnaire(test: String!): [QuestionObjects]

},

type Mutation {
    createQuestion(
      question: String,
      test: String,
      imgSrc: String,
      type: String,
      answer: String,
      options: [OptionInput]
    ): Question
  },
  input OptionInput {
    value: String
    label: String
  }



`