import jwtDecode from "jwt-decode";
import userApi from "../api/users";
import authStorage from "./storage";

const getUser = async () => {
  try {
    const token = await authStorage.getToken();
    if (token) {
      const user = jwtDecode(token);
      const result = await userApi.getUserByMAil(user.username);
      return result.data[0];
    } else {
      return null;
    }
  } catch (error) {}
};

export default { getUser };
