// eslint-disable-next-line no-unused-vars
import { JaaSMeeting, JitsiMeeting } from '@jitsi/react-sdk';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';
import { searchMeeting } from '../helpers/searchMeeting';
import WaitingRoom from '../components/waiting';

const Room = () => {
    const user = {
        info: {
            name: 'Pepito Perez',
            email: 'pepito@gmail.com'
        },
        jwt: 'eyJraWQiOiJ2cGFhcy1tYWdpYy1jb29raWUtZTMwZDNmZWNjMzU2NDM4M2EwOTlkMTllNzI3NWI1NmQvNjU2YjA4LVNBTVBMRV9BUFAiLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJqaXRzaSIsImlzcyI6ImNoYXQiLCJpYXQiOjE2ODAyNDc2NzEsImV4cCI6MTY4MDI1NDg3MSwibmJmIjoxNjgwMjQ3NjY2LCJzdWIiOiJ2cGFhcy1tYWdpYy1jb29raWUtZTMwZDNmZWNjMzU2NDM4M2EwOTlkMTllNzI3NWI1NmQiLCJjb250ZXh0Ijp7ImZlYXR1cmVzIjp7ImxpdmVzdHJlYW1pbmciOnRydWUsIm91dGJvdW5kLWNhbGwiOnRydWUsInNpcC1vdXRib3VuZC1jYWxsIjpmYWxzZSwidHJhbnNjcmlwdGlvbiI6dHJ1ZSwicmVjb3JkaW5nIjp0cnVlfSwidXNlciI6eyJoaWRkZW4tZnJvbS1yZWNvcmRlciI6ZmFsc2UsIm1vZGVyYXRvciI6dHJ1ZSwibmFtZSI6IlBlcGl0byBQZXJleiIsImlkIjoiZ29vZ2xlLW9hdXRoMnwxMDEzMjExMjI1MTYzMDQ3ODMzMzMiLCJhdmF0YXIiOiJodHRwczovL3d3dy5ncmF2YXRhci5jb20vYXZhdGFyLzIwNWU0NjBiNDc5ZTJlNWI0OGFlYzA3NzEwYzA4ZDUwIiwiZW1haWwiOiJwZXBpdG9AZ21haWwuY29tIn19LCJyb29tIjoiKiJ9.FJvZ_CvNciXXNnsJqiIerD2-OOqVEjxMMdpU0ksSxwQ9BbRBOVPs54NgcFxfG9gCwelku4KHbDk2B9gMCW9qnP9FvkbdLzhnvqNyaBdGqezisa8CWwx0QtnJD8PXmQnNDLsHgGpUgUVscF3XqaLZnS8NEWNd3q3k0dfyPj_SLQjjSjPUdEi5tuYzW4S1aGMDWL2dmgWQfzKW0UT1KvsaqcYMgNwLGaCG3QuYYpZW8V06iR62a_lJXZvU9ewn7zYVxipel0xUiTlkvqj_2TD2zFM4BwxpPlQlME2_DJHa3lPzWb3Z3uHkHRdR46-ECBhSNQCuMa-ZmRxoESp7UTLXLA'
    };
    const { id } = useParams();
    const meeting = searchMeeting(id);
    const [canJoin, setCanJoin] = useState(false);

    const JoinRoom = () => {
        // if meeting is not started yet, redirect to waiting room
        // if meeting is started, redirect to meeting
        const now = new Date();
        const meetingDate = new Date(meeting.date);
        const meetingStartTime = new Date(`${meeting.date} ${meeting.start_time}`);
        const meetingEndTime = new Date(`${meeting.date} ${meeting.end_time}`);

        if (now < meetingDate) {
            // REDIRECT TO WAITING ROOM
            setCanJoin(false);
        }

        if (now > meetingDate && now < meetingStartTime) {
            setCanJoin(false);
        }

        if (now > meetingDate && now > meetingStartTime && now < meetingEndTime) {
            setCanJoin(true);
        }

        if (now > meetingDate && now > meetingEndTime) {
            alert('Meeting has ended');
            return;
        }
        // eslint-disable-next-line no-console
        console.log('can join: ', canJoin);
    };

    useEffect(() => {
        JoinRoom();
    }, []);

    const apiRef = useRef();

    // eslint-disable-next-line no-unused-vars
    const handleJitsiIFrameRef1 = iframeRef => {
        iframeRef.style.border = '10px solid #3d3d3d';
        iframeRef.style.background = '#3d3d3d';
        iframeRef.style.height = '400px';
        iframeRef.style.marginBottom = '20px';
    };

    // eslint-disable-next-line no-unused-vars
    const handleJitsiIFrameRef2 = iframeRef => {
        iframeRef.style.marginTop = '10px';
        iframeRef.style.border = '10px dashed #df486f';
        iframeRef.style.padding = '5px';
        iframeRef.style.height = '400px';
    };

    const handleJaaSIFrameRef = iframeRef => {
        iframeRef.style.border = '10px solid #3d3d3d';
        iframeRef.style.background = '#3d3d3d';
        iframeRef.style.height = '90%';
        iframeRef.style.marginBottom = '20px';
    };

    // eslint-disable-next-line no-unused-vars
    const handleApiReady = apiObj => {
        apiRef.current = apiObj;
    };

    const renderSpinner = () => (
        <div style={{
            fontFamily: 'sans-serif',
            textAlign: 'center',
            color: 'red'
        }}>
            Loading..
        </div>
    );

    return (
        <>
            {/* <JitsiMeeting
                roomName = "at20-reu-meeting"
                spinner = { renderSpinner }
                configOverwrite = {{
                    subject: 'lalalala',
                    hideConferenceSubject: false
                }}
                getIFrameRef = { handleJitsiIFrameRef1 } /> */}
            {(canJoin &&
                <JaaSMeeting
                    appId='vpaas-magic-cookie-e30d3fecc3564383a099d19e7275b56d'
                    roomName="at20-reu-meeting"
                    configOverwrite={{
                        subject: meeting.meeting_name,
                        hideConferenceSubject: false,
                        readOnlyName: true,
                        startWithAudioMuted: true,
                        startWithVideoMuted: true
                        // hiddenPremeetingButtons: ['camera','invite'],
                        // toolbarButtons: ['microphone','chat','hangup']
                    }}
                    spinner={renderSpinner}
                    // Update this with the `8x8.vc` or `stage.8x8.vc` version of interest
                    // and avoid mixing up different domains and release versions
                    // on the same page at the same time, as only the first
                    // external api script will be loaded.
                    // // release = 'release-1234'
                    userInfo={user.info}
                    jwt={user.jwt}
                    getIFrameRef={handleJaaSIFrameRef} />
            ) ||
                <WaitingRoom meeting={meeting} />}

        </>
    );
};

export default Room;
