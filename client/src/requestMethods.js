import axios from "axios";

const BASE_URL = "http://localhost:5000/api/";
const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNDJhYzczZTQzZWVmYjY2YmMwY2U4MyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1MDQ4NDMwMiwiZXhwIjoxNjUwNzQzNTAyfQ.lG972DrRZ1uNwA-Qxj4xhokzfx6RPyojKbLO5hzO0KM`;

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  header: {
    token: `Bearer ${token}`,
  },
});
