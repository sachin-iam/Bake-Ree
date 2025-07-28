import axios from "axios";

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await axios.post("http://localhost:5000/api/login", {
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
