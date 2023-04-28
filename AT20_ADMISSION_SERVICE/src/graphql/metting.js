import { gql } from '@apollo/client'

export const CREATE_MEETING = gql`
mutation newMeeting($data: String!) {
    newMeeting(data: $data)
  }
`
export const GET_MEETINGS = gql`
{
  getMeetings {
    _id
    id
    host_global_id {
      id
      _id
      name
      phone
    }
    guest_global_id {
      id
      _id
      name
      phone
    }
    meeting_name
    description
    date
    start_time
    end_time
    time_zone {
      value
      label
      _id
    }
    active
  }
}
`