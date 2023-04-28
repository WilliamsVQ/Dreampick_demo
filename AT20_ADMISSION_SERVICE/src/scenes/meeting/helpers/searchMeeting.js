import meetings from '../helpers/meetings.json';

export const searchMeeting = (id) => {
    const meeting = meetings.find(meeting => meeting.id === id);
    return meeting;
};
