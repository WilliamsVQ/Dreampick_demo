import { useEffect } from 'react';
//import axios from 'axios';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { GET_USERS, DELETE_USER, GET_PHOTO } from '../../../graphql/user';
import { useQuery, useMutation } from '@apollo/client'
import Header from '../../../components/header';
import './styleUserList.css';

export function Dashboard() {

  const { loading, error, data, refetch } = useQuery(GET_USERS);

  /*const photo = useQuery(GET_PHOTO, {
    variables: {
      filename: "828d214c-1a64-4ee0-8338-4a7479202947-asd.jpg",
    },
  });*/

  useEffect(() => {
    refetch();
  }, [data, refetch]);

  const [deleteUser] = useMutation(DELETE_USER, {
    refetchQueries: [
      {
        query: GET_USERS,
      },
    ],
  });

  if (loading) return <p>Loading</p>
  if (error) return <p>Error</p>


  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      deleteUser({
        variables: {
          id: id,
        },
      });
    }
  };

  return (
    <Box className='general-view'>
      <Header title='USER LIST' subtitle='' />
      <TableContainer component={Paper} className='table-container'>
        <Table aria-label="simple table" className='table-view'>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Photo</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.users.map(user => (
              <TableRow key={user._id}>
                <TableCell>{user.firstName} {user.lastName}</TableCell>
                <TableCell>{user.userName}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>{user.role.name}</TableCell>
                <TableCell>
                  <Box
                    component="img"
                    sx={{
                      height: 233,
                      width: 350,
                      maxHeight: { xs: 233, md: 167 },
                      maxWidth: { xs: 350, md: 250 },
                    }}
                    src={user.photo}
                  />
                </TableCell>
                <TableCell>
                  <IconButton aria-label="delete" onClick={() => handleDelete(user._id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}