import axios from "axios";

const DEV_BACKEND = "http://127.0.0.1:5000"

export const getFoods = async () => {
  const response = await axios.get(
    DEV_BACKEND + "/foods"
  );
  return response.data;
};

export const getFoodTypes = async () => {
  const response = await axios.get(
    DEV_BACKEND + "/types"
  );
  return response.data;
}