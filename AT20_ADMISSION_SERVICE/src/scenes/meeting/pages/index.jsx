/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Tooltip,
  Box,
  Button
} from '@mui/material';
import { AccessTime, Person } from '@mui/icons-material';
import Header from '../../../components/header';
import { getMeetingData } from '../../../apis/meetingService';
import meetings from '../helpers/meetings';
import { useQuery, useMutation } from '@apollo/client'
import { GET_MEETINGS } from '../../../graphql/metting';
import './styleMeeting.css';

const MeetingsTable = (props) => {
  const { loginData } = props;
  const roleLogin = loginData.info._id;
  const roleData = loginData.info.role.name;

  /*const tryJoinMeeting = (meeting) => {
      window.location.href = `/meeting/room/${meeting.id}`;
  };*/

  const { loading, error, data, refetch } = useQuery(GET_MEETINGS);

  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  const tick = () => {
    setCurrentDateTime(new Date());
  };

  useEffect(() => {
    const intervalId = setInterval(() => tick(), 1000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    refetch();
  }, [data, refetch]);

  if (loading) return <p>Loading</p>
  if (error) return <p>Error</p>

  return (
    <Box className='general-view'>
      <Header title='MY MEETINGS' subtitle='' />
      <TableContainer component={Paper} className='table-container'>
        <Table aria-label="meetings table" className='table-view'>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Start Time</TableCell>
              <TableCell>End Time</TableCell>
              <TableCell>Host</TableCell>
              <TableCell>Join Meeting</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {roleData === 'Admin' || roleData === 'Trainer' ? (
              data.getMeetings.map((meeting) => (
                <TableRow key={meeting.id}>
                  <TableCell component="th" scope="row">
                    {meeting.meeting_name}
                  </TableCell>
                  <TableCell>
                    <Tooltip title={meeting.description}>
                      <span>
                        {meeting.description.substring(0, 25)}
                        {meeting.description.length > 20 && '...'}
                      </span>
                    </Tooltip>
                  </TableCell>
                  <TableCell style={{ color: new Date(meeting.date) < currentDateTime ? 'red' : 'inherit' }}>
                    {meeting.date.substring(0, 10)}
                  </TableCell>
                  <TableCell>
                    <AccessTime />
                    {new Date(meeting.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </TableCell>
                  <TableCell>
                    <AccessTime />
                    {new Date(meeting.end_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </TableCell>
                  <TableCell>
                    <Person />
                  </TableCell>
                  <TableCell>
                    <Button variant="contained" color="primary">
                      Join
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              data.getMeetings
                .filter((meeting) => meeting.guest_global_id.some((guest) => guest.id === roleLogin))
                .map((meeting) => (
                  <TableRow key={meeting.id}>
                    <TableCell component="th" scope="row">
                      {meeting.meeting_name}
                    </TableCell>
                    <TableCell>
                      <Tooltip title={meeting.description}>
                        <span>
                          {meeting.description.substring(0, 25)}
                          {meeting.description.length > 20 && '...'}
                        </span>
                      </Tooltip>
                    </TableCell>
                    <TableCell style={{ color: new Date(meeting.date) < currentDateTime ? 'red' : 'inherit' }}>
                      {meeting.date.substring(0, 10)}
                    </TableCell>
                    <TableCell>
                      <AccessTime />
                      {meeting.start_time.substring(11, 16)}
                    </TableCell>
                    <TableCell>
                      <AccessTime />
                      {meeting.end_time.substring(11, 16)}
                    </TableCell>
                    <TableCell>
                      <Person />
                      {/*meeting.host.map*/}
                    </TableCell>
                    <TableCell>
                      <Button variant="contained" color="primary">
                        Join
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default MeetingsTable;