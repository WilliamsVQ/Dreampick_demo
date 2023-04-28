import { gql } from '@apollo/client'

export const CREATE_QUESTION_MUTATION = gql`
    mutation CreateQuestion($question: String, $test: String, $imgSrc: String, $type: String, $answer: String, $options: [OptionInput]) {
      createQuestion(question: $question, test: $test, imgSrc: $imgSrc, type: $type, answer: $answer, options: $options) {
        id
        question
        test
        imgSrc
        type
        Answer
        options {
          Label
          Value
        }
      }
    }
  `;

export const GET_QUESTIONS_BY_TEST = gql`
  query GetQuestionnaire($test: String!) {
  getQuestionnaire(test: $test) {
    IDQuestions
    ImgScr
    Question
    Answer
    options {
      Label
      Value
    }
    test
    type
  }
}
`;
export const GET_ANSWERS_BY_TEST = gql`
query GetQuestionnaire($test: String!) {
  getQuestionnaire(test: $test) {
    Answer
  }
}
`;