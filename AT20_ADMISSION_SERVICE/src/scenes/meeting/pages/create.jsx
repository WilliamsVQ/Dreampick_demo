/* eslint-disable react/react-in-jsx-scope */
/*
@index.js Copyright (c) 2023 Jalasoft
2643 Av Melchor Perez de Olguin, Colquiri Sud, Cochabamba, Bolivia.
Av. General Inofuentes esquina Calle 20, Edificio Union No 1376, La Paz, Bolivia All rights reserved
This software is the confidential and proprietary information of
Jalasoft, Confidential Information '). You shall not
disclose such Confidential Information and shall use it only in
accordance with the terms of the license agreement you entered into with Jalasoft
*/
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import Autocomplete from '@mui/material/Autocomplete';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import Header from '../../../components/header';
import { useTheme } from '@mui/material';
import { tokens } from '../../../alternative_theme';
import useMediaQuery from '@mui/material/useMediaQuery';

// HELPERS
import timeZone from '../helpers/timezone';
import interview from '../helpers/interviews';

import { useQuery, useMutation } from '@apollo/client'
import { GET_USERS } from '../../../graphql/user';
import { CREATE_MEETING } from '../../../graphql/metting';

const icon = <CheckBoxOutlineBlankIcon fontSize='small' />;
const checkedIcon = <CheckBoxIcon fontSize='small' />;

export default function NewMeeting() {
    const isNonMobile = useMediaQuery('(min-width:600px)');
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [selectedInterview, setSelectedMeeting] = useState('');
    const [description, setDescription] = useState('');
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedStartTime, setSelectedStartTime] = useState(null);
    const [selectedEndTime, setSelectedEndTime] = useState(null);
    const [selectedTimeZone, setSelectedTimeZone] = useState('');
    const [selectedHost, setSelectedHost] = useState([]);
    const [selectedGuests, setSelectedGuests] = useState([]);

    const { loading, error, data } = useQuery(GET_USERS);
    const [response, setResponse] = useState('');
    const [newMeeting] = useMutation(CREATE_MEETING);


    const onSubmitForm = () => {
        const data = JSON.stringify({
            host_global_id: selectedHost.map(host => ({
                id: host._id,
                name: host.firstName,
                phone: host.phone,
            })),
            guest_global_id: selectedGuests.map(guest => ({
                id: guest._id,
                name: guest.firstName,
                phone: guest.phone,
            })),
            meeting_name: selectedInterview.label,
            description,
            date: selectedDate,
            start_time: selectedStartTime,
            end_time: selectedEndTime,
            time_zone: {
                "value": "UTC-7",
                "label": "Pacific Daylight Time (PDT)"
            },
            active: true
        });

        newMeeting({ variables: { data } })
            .then(result => setResponse(result.data.saveInterview))
            .catch(error => console.log(error));

        alert('¡Meeting creado exitosamente!');
    };

    if (loading) return <p>Loading</p>
    if (error) return <p>Error</p>

    return (
        <Box m='50px'>
            <Header title='MEETING' subtitle='Create new Meeting' />

            <div style={{ width: '100%' }}>
                <Box
                    sx={{
                        display: 'grid',
                        columnGap: 2,
                        rowGap: 1,
                        gridTemplateColumns: 'repeat(4, 1fr)',
                        '& > div': { gridColumn: isNonMobile ? undefined : 'span 4' }
                    }}
                >
                    <Autocomplete
                        disablePortal
                        id='combo-box-demo'
                        label='interview'
                        options={interview}
                        onChange={(event, value) => {
                            setSelectedMeeting(value);
                        }}
                        sx={{ gridColumn: 'span 2' }}
                        renderInput={(params) => <TextField {...params} id='filled-basic' variant='filled' label='Meeting' />}
                    />
                    <TextField fullWidth
                        id='filled-basic'
                        variant='filled'
                        label='Description'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        sx={{ gridColumn: 'span 2' }}
                    />
                </Box>
            </div>

            <div style={{ width: '100%' }}>
                <h3 style={{
                    color: colors.primary[100]
                }}>Schedule</h3>
                <Box
                    sx={{
                        display: 'grid',
                        columnGap: 2,
                        rowGap: 1,
                        gridTemplateColumns: 'repeat(3, 1fr)',
                        '& > div': { gridColumn: isNonMobile ? undefined : 'span 4' }
                    }}
                >
                    <LocalizationProvider
                        dateAdapter={AdapterDayjs}
                        sx={{ gridColumn: 'span 1' }}
                    >
                        <DemoContainer components={['DatePicker']} >
                            <DatePicker label='Select a Date' value={selectedDate} onChange={(newValue) => {
                                setSelectedDate(newValue);
                            }} slotProps={{ textField: { variant: 'filled' } }} sx={{ width: '100% !important' }} />
                        </DemoContainer>
                    </LocalizationProvider>

                    <LocalizationProvider
                        dateAdapter={AdapterDayjs}
                        sx={{ gridColumn: 'span 1', textAlign: 'row' }}
                    >

                        <DemoContainer components={['TimePicker']} >
                            <TimePicker label='Start time' value={selectedStartTime} onChange={(newValue) => {
                                setSelectedStartTime(newValue);
                            }} slotProps={{ textField: { variant: 'filled' } }} sx={{ width: '100% !important' }} />
                        </DemoContainer>
                    </LocalizationProvider>

                    <LocalizationProvider
                        dateAdapter={AdapterDayjs}
                        sx={{ gridColumn: 'span 1' }}
                    >
                        <DemoContainer components={['TimePicker']}>
                            <TimePicker label='End time' value={selectedEndTime} onChange={(newValue) => {
                                setSelectedEndTime(newValue);
                            }} slotProps={{ textField: { variant: 'filled' } }} sx={{ width: '100% !important' }} />
                        </DemoContainer>
                    </LocalizationProvider>
                </Box>
            </div>
            <div style={{ width: '100%' }}>
                <h3 style={{
                    color: colors.primary[100]
                }}>Participants</h3>
                <Box
                    sx={{
                        display: 'grid',
                        columnGap: 2,
                        rowGap: 1,
                        gridTemplateColumns: 'repeat(2, 1fr)',
                        '& > div': { gridColumn: isNonMobile ? undefined : 'span 4' }
                    }}
                >
                    <Autocomplete
                        multiple
                        id='combo-box-demo'
                        options={data.users.filter(option => option.role.name === "Admin" || option.role.name === "Trainer")}
                        disableCloseOnSelect
                        getOptionLabel={(option) => option.firstName + ' ' + option.lastName}
                        sx={{ gridColumn: 'span 1' }}
                        value={selectedHost}
                        onChange={(event, newValue) => {
                            setSelectedHost(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} label='Select Guests' id='filled-basic' variant='filled' placeholder=' ' />}
                    />
                    <Autocomplete
                        multiple
                        id='combo-box-demo'
                        options={data.users.filter(option => option.role.name === "Candidate")}
                        disableCloseOnSelect
                        getOptionLabel={(option) => option.firstName + ' ' + option.lastName}
                        sx={{ gridColumn: 'span 1' }}
                        value={selectedGuests}
                        onChange={(event, newValue) => {
                            setSelectedGuests(newValue);
                        }}
                        renderInput={(params) => (
                            <TextField {...params} label='Select Guests' id='filled-basic' variant='filled' placeholder=' ' />
                        )}
                    />
                </Box>
            </div>
            <Box
                sx={{
                    my: 5,
                    '& > div': { gridColumn: isNonMobile ? undefined : 'span 4' }
                }}
            >
                <Stack spacing={2} direction='row'
                    textAlign='center'
                    sx={{ '& > :not(style)': { ml: 'auto' } }}>
                    <Button
                        variant='contained'
                        style={{
                            background:
                                colors.success[100]
                        }}
                        size='medium'
                        href='#outlined-buttons'
                        onClick={onSubmitForm}
                    >
                        Save
                    </Button>
                    {response && <p>{response}</p>}
                    <Button variant='contained' style={{ background: colors.secondary[100] }} size='medium' href='#outlined-buttons'>Cancel</Button>
                </Stack>
                <p style={{
                    color: colors.secondary[100],
                    marginTop: 50
                }}>Organized by: Pepito Perez</p>
            </Box>
        </Box>
    );
}