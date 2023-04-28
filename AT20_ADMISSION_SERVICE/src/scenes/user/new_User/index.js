import { Box, Button, TextField, Select, MenuItem } from "@mui/material";
import { Formik } from "formik";
//import * as yup from "yup";
//import axios from "axios";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useState } from "react"
import { useMutation, useQuery } from '@apollo/client'
import { CONVERT_IMAGE, CREATE_USER, UPLOAD_IMAGE } from "../../../graphql/user";
import Header from '../../../components/header';
import { GET_ROLES } from "../../../graphql/role";
import "./profileFormStyle.css";

export default function Form() {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const [convert] = useMutation(CONVERT_IMAGE);

  const [selectedFile, setSelectedFile] = useState(null);
  const [fileUploaded, setFileUploaded] = useState(false);

  const handleFileInputChange = async (event) => {
    const file = event.target.files[0];
    try {
      const result = await convert({
        variables: {
          image: file,
          width: 180,
          height: 180,
        },
      });
      console.log(result.data.convertImage.url);
      setFileUploaded(true);
    } catch (error) {
      console.error(error);
    }
  };

  const [user, setUser] = useState({
    globalID: "",
    firstName: "",
    lastName: "",
    userName: "",
    firstPassword: "",
    password: "",
    email: "",
    phone: "",
    country: "",
    city: "",
    age: 0,
    roleId: "",
    photo: "",
  });

  const [createUser, { loading, error }] = useMutation(CREATE_USER, {
    onCompleted: () => {
      alert('User created successfully!');
      setUser({ firstName: '', lastName: '', email: '', password: '', phone: '', role: '', photo: '' });
    },
  });

  const [singleUpload] = useMutation(UPLOAD_IMAGE);
  const [newImage, setnewImage] = useState(null);

  const [userPhoto, setUserPhoto] = useState(null);
  const { data: rolesData, loading: rolesLoading, error: rolesError } = useQuery(GET_ROLES);
  const handlePhotoChange = (e) => {
    setUserPhoto(e.target.files[0]);
    setnewImage(e.target.files[0]);
    setFileUploaded(true); // Set fileUploaded to true when a file is uploaded
  };

  const handlePhotoUpload = async () => {
    const result = await convert({
      variables: {
        image: userPhoto,
        width: 300,
        height: 300,
      },
    });
    return result.data.convertImage.url;
  };

  if (loading) return <p>Loading...</p>
  if (error) return `Submission error! ${error.message}`;


  const handleSubmit = async (e) => {
    e.preventDefault();
    const photoName = await handlePhotoUpload();
    console.log(photoName);
    createUser({
      variables: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: "",
        phone: user.phone,
        roleId: user.role,
        photo: photoName,
      }
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));

  };

  return (

    <Box className="form-container">
      <Header title="CREATE USER" subtitle="NEW USER" />
      <Formik
        onSubmit={handleSubmit}
      >
        {({
          errors,
          touched,
          isSubmitting,
        }) => (
          <form onSubmit={handleSubmit}>
          <Box className="form-grid">
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="First Name"
                onChange={handleChange}
                name="firstName"
                error={!!touched.name && !!errors.name}
                helperText={touched.name && errors.name}
                className="form-grid-span2"
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Last Name"
                onChange={handleChange}
                name="lastName"
                error={!!touched.lastName && !!errors.lastName}
                helperText={touched.lastName && errors.lastName}
                className="form-grid-span2"
              />
              <TextField
                fullWidth
                variant="filled"
                type="email"
                label="Email"
                onChange={handleChange}
                name="email"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Phone"
                onChange={handleChange}
                name="phone"
                error={!!touched.name && !!errors.name}
                helperText={touched.name && errors.name}
                className="form-grid-span2"
              />
              <Box  className="form-grid-span2">
                <Select
                  fullWidth
                  variant="filled"
                  label="Role"
                  name="role"
                  onChange={handleChange}
                  value={user.role}
                  error={!!touched.role && !!errors.role}
                >
                  {rolesData && rolesData.roles.map((role) => (
                    <MenuItem key={role._id} value={role._id}>{role.name}</MenuItem>
                  ))}
                </Select>
              </Box>
            </Box>
            <Box className="form-end">
              <div className="custom-file-container">
                <Button
                  className="custom-file-input"
                  component="label"
                  color="secondary"
                  variant="contained"
                  disabled={isSubmitting}
                >
                  {selectedFile || "Choose File"}
                  <input
                    type="file"
                    name="photo"
                    value={user.photo}
                    onChange={handlePhotoChange}
                  />
                </Button>
                <span className="no-file-chosen">{!fileUploaded ? "No file chosen" : "Uploaded file"}</span> 
              </div>
              <Button
                type="submit"
                color="secondary"
                variant="contained"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Creating..." : "Create New User"}
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};