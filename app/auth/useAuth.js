import { useContext } from "react";
import jwtDecode from "jwt-decode";

import AuthContext from "./context";
import authStorage from "./storage";
import userApi from "../api/users";

export default useAuth = () => {
  const { user, setUser } = useContext(AuthContext);

  const logIn = async (authToken) => {
    try {
      const user = jwtDecode(authToken);
      const result = await userApi.getUserByMAil(user.username);
      setUser(result.data[0]);
      authStorage.storeToken(authToken);
    } catch (error) {
      console.log(error);
    }
  };

  const logOut = () => {
    setUser(null);
    authStorage.removeToken();
  };

  const getUser = async () => {};

  return { user, logIn, logOut };
};
