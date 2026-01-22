import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/api/login`, {
      email,
      password,
    });

    const { token } = response.data;

    // ✅ Save token in localStorage
    localStorage.setItem("token", token);

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const registerUser = async (
  firstName: string,
  lastName: string,
  email: string,
  password: string
) => {
  try {
    const response = await axios.post(`${API_URL}/api/register`, {
      name: `${firstName} ${lastName}`.trim(),
      email,
      password,
    });

    const { token } = response.data;

    // ✅ Save token in localStorage
    localStorage.setItem("token", token);

    return response.data;
  } catch (error) {
    throw error;
  }
};
