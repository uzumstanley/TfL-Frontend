import axios from "axios";

const API_URL = "https://tfl-bus-stop-tracking-system.onrender.com"; // Replace with your actual Render URL

export const getBusStops = async () => {
  const response = await axios.get(`${API_URL}/stops`);
  return response.data;
};

export const searchBusStops = async (query) => {
  const response = await axios.get(`${API_URL}/stops/search?name=${query}`);
  return response.data;
};
