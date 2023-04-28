
/* eslint-disable react/react-in-jsx-scope */
/*
@node_command.js Copyright (c) 2023 Jalasoft
2643 Av Melchor Perez de Olguin, Colquiri Sud, Cochabamba, Bolivia.
Av. General Inofuentes esquina Calle 20, Edificio Union No 1376, La Paz, Bolivia All rights reserved
This software is the confidential and proprietary information of
Jalasoft, Confidential Information "). You shall not
disclose such Confidential Information and shall use it only in
accordance with the terms of the license agreement you entered into with Jalasoft
*/
import { Box, Button, FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField, useTheme } from '@mui/material';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useState } from 'react';
import Header from '../../../components/header';
import { tokens } from '../../../alternative_theme';
import axios from 'axios';
import { gql, useMutation } from '@apollo/client'
import { CREATE_QUESTION_MUTATION } from "../../../graphql/questionnaire";


const initialValues = {
    testType: '',
    question: '',
    type: '',
    answer1: '',
    answer2: '',
    answer3: '',
    answer4: '',
  };

  const checkoutSchema = yup.object().shape({
    testType: yup.string().required('Test type is required'),
    question: yup.string().required('Question is required'),
    type: yup.string().required('Type of Question is required'),
    answer1: yup.string().required('Option 1 is required'),
    answer2: yup.string().required('Option 2  required'),
    answer3: yup.string().required('Option 3  required'),
    answer4: yup.string().required('Answer'),
  });

  export default function NewQuestionnaireForm() {
    const [count, setCount] = useState(0);
    const [questions, setQuestions] = useState([]);
    const [createQuestion] = useMutation(CREATE_QUESTION_MUTATION);
    const handleFormSubmit = (values, { resetForm }) => {
      const question = JSON.stringify(values);
      setQuestions([...questions, question]);
      resetForm();
    };

    const handleButtonClick = () => {
      setCount(count + 1);
    };

    const handleButtonClickSend = async () => {
      setCount(0);
      for (let index = 0; index < questions.length; index++) {
        let objQuestion = JSON.parse(questions[index]);
        let data = {
          question: objQuestion.question,
          test: objQuestion.testType.toLowerCase(),
          imgSrc: '', //If we have a image
          type: objQuestion.type.toLowerCase(),
          Answer: objQuestion.answer4, //If we have a image a correct answer
          options: [
            { value: 'op1', label: objQuestion.answer1 },
            { value: 'op2', label: objQuestion.answer2 },
            { value: 'op3', label: objQuestion.answer3 },
          ],
        };
        try {
          /*const response = await createQuestion({
            variables: {
              data,
            },
          });*/
          const response = await createQuestion({
            variables: {
              question: data.question,
              test: data.test,
              imgSrc: data.imgSrc,
              type: data.type,
              answer: data.answer,
              options: data.options,
            },
          });
          console.log(response.data.createQuestion);
        } catch (error) {
          console.log(error);
        }
      }
      setQuestions([]);

    };


    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <>
            <Box m="50px">
                <Header title="QUESTIONNAIRE" subtitle="Create Question" />
                <Formik
                    onSubmit={handleFormSubmit}
                    initialValues={initialValues}
                    validationSchema={checkoutSchema}
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                    }) => (
                        <form onSubmit={handleSubmit}>
                            <Box
                                display="grid"
                                gap="30px"
                                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                            >
                                <FormControl variant="filled">
                                    <InputLabel id="test-type-label">Type of Test*</InputLabel>
                                    <Select
                                        labelId="test-type-label"
                                        name="testType"
                                        value={values.testType}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={!!touched.testType && !!errors.testType}
                                    >
                                        <MenuItem value="">Select type of test</MenuItem>
                                        <MenuItem value="aptitude">Aptitude</MenuItem>
                                        <MenuItem value="concentration">Concentration</MenuItem>
                                        <MenuItem value="logical">Logical</MenuItem>
                                        <MenuItem value="reasoning">Reasoning</MenuItem>
                                        <MenuItem value="spatial">Spatial</MenuItem>
                                    </Select>
                                    {touched.testType && errors.testType && (
                                        <FormHelperText sx={{ color: 'red' }}>{errors.testType}</FormHelperText>
                                    )}
                                </FormControl>
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="Question*"
                                    name="question"
                                    value={values.question}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={!!touched.question && !!errors.question}
                                    helperText={touched.question && errors.question}
                                    sx={{ gridColumn: 'span 4' }}
                                />
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="Answer*"
                                    name="answer4"
                                    value={values.answer4}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={!!touched.answer4 && !!errors.answer4}
                                    helperText={touched.answer4 && errors.answer4}
                                    sx={{ gridColumn: 'span 4' }}
                                />
                                <FormControl variant="filled" required={true}>
                                    <InputLabel htmlFor="question-type">Type of Question</InputLabel>
                                    <Select
                                        id="question-type"
                                        name="type"
                                        value={values.type}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={touched.type && !!errors.type}
                                    >
                                        <MenuItem value="checkbox">Multiple Response</MenuItem>
                                        <MenuItem value="radiobutton">Single Response</MenuItem>
                                    </Select>
                                    {touched.type && errors.type && (
                                        <FormHelperText error={true}>{errors.type}</FormHelperText>
                                    )}
                                </FormControl>
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="Option 1"
                                    name="answer1"
                                    value={values.answer1}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={!!touched.answer1 && !!errors.answer1}
                                    helperText={touched.answer1 && errors.answer1}
                                    sx={{ gridColumn: 'span 4' }}
                                />
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="Option 2"
                                    name="answer2"
                                    value={values.answer2}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={!!touched.answer2 && !!errors.answer2}
                                    helperText={touched.answer2 && errors.answer2}
                                    sx={{ gridColumn: 'span 4' }}
                                />
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="Option 3"
                                    name="answer3"
                                    value={values.answer3}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={!!touched.answer3 && !!errors.answer3}
                                    helperText={touched.answer3 && errors.answer3}
                                    sx={{ gridColumn: 'span 4' }}
                                />
                            </Box>


                            <Box display="flex" justifyContent="end" mt="20px">
                                <Box mr={2}>
                                    <Button type="submit" style={{ background: colors.success[100] }} variant="contained" onClick={handleButtonClick}>
                                        Save Question ({count})
                                    </Button>
                                </Box>
                                <Box mr={2}>
                                    <Button type="submit" style={{ background: colors.primary[100] }} variant="contained" onClick={handleButtonClickSend}>
                                        Send All
                                    </Button>
                                </Box>
                            </Box>
                        </form>
                    )}
                </Formik>
            </Box>
        </>
    );
}
