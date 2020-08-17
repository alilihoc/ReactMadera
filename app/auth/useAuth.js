import { useContext, useState } from "react";
import jwtDecode from "jwt-decode";

import AuthContext from "./context";
import authStorage from "./storage";
import userApi from "../api/users";

export default useAuth = () => {
  const { user, setUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const logIn = async (authToken) => {
    try {
      const user = jwtDecode(authToken);
      setLoading(true);
      const result = await userApi.getUserByMAil(user.username);
      setUser(result.data[0]);
      authStorage.storeToken(authToken);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const logOut = () => {
    setUser(null);
    authStorage.removeToken();
  };

  const getUser = async () => {};

  return { user, loading, logIn, logOut };
};
