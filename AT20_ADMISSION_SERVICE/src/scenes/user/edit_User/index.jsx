import { Box, Button, TextField, useTheme } from "@mui/material";
import { Formik } from "formik";
//import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useState } from "react"
import { useMutation, useQuery } from '@apollo/client'
import { GET_USER, UPDATE_USER } from "../../../graphql/user";
import Header from '../../../components/header';
import { tokens } from '../../../alternative_theme';
import "./editFormStyle.css";

export default function Edit(props) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { loginData } = props;

  const isNonMobile = useMediaQuery("(min-width:600px)");

  const [userData, setUserData] = useState({
    firstName: loginData.info.firstName,
    lastName: loginData.info.lastName,
    email: loginData.info.email,
    userName: loginData.info.userName,
    age: loginData.info.age,
    password: loginData.info.password,
    country: loginData.info.country,
    city: loginData.info.city,
  });

  const { loading, error, data } = useQuery(GET_USER, {
    variables: { id: loginData.info._id },
    onCompleted: (data) => {
      setUserData(data.user);
    },
  });

  const [updateUser] = useMutation(UPDATE_USER);
  const handleSubmit = async (event) => {
    event.preventDefault();
    await updateUser({
      variables: {
        id: loginData.info._id,
        ...userData,
      },
    })
      .then(() => {
        alert("User updated successfully!");
      })
      .catch((error) => {
        alert("Error updating user: " + error.message);
      });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <Box m="50px">
      <Header title="EDIT PROFILE" subtitle="COMPLETE YOUR INFORMATION" />
      <Formik
        onSubmit={handleSubmit}
      >
        {({
          errors,
          touched,
          isSubmitting,
        }) => (
          <form onSubmit={handleSubmit}>
          <Box className="edit-form">
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="First Name"
                onChange={handleInputChange}
                name="firstName"
                error={!!touched.name && !!errors.name}
                helperText={touched.name && errors.name}
                className="span-2"
                value={userData.firstName}

              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Last Name"
                onChange={handleInputChange}
                name="lastName"
                error={!!touched.lastName && !!errors.lastName}
                helperText={touched.lastName && errors.lastName}
                className="span-2"
                value={userData.lastName}
              />
              <TextField
                fullWidth
                variant="filled"
                type="email"
                label="Email"
                onChange={handleInputChange}
                name="email"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                className="span-4"
                value={userData.email}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="User Name"
                onChange={handleInputChange}
                name="userName"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                className="span-4"
                value={userData.userName}
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Age"
                onChange={(event) => {
                  const { name, value } = event.target;
                  setUserData((prevData) => ({ ...prevData, [name]: parseInt(value) }));
                }}
                name="age"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                className="span-2"
                value={userData.age}
              />
              <TextField
                fullWidth
                variant="filled"
                type="password"
                label="Password"
                onChange={handleInputChange}
                name="firstPassword"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                className="span-2"
                value= {userData.firstPassword}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Country"
                onChange={handleInputChange}
                name="country"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                className="span-2"
                value={userData.country}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="City"
                onChange={handleInputChange}
                name="city"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                className="span-2"
                value={data.user.city}
              />
            </Box>
            <Box className="button-box">
              <Button
                type="submit"
                variant="contained"
                style={{ background: colors.primary[100] }}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Update..." : "Update Personal Information"}
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

