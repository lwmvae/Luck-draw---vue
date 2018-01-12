import axios from 'axios'

export function getMeeting() {
  const url = 'http://localhost:8080/static/meeting.json';
  return axios.get(url).then((res) => {
    return res.data;
  });
}