import React, { useState } from "react";
import { StyleSheet, Image, ScrollView } from "react-native";
import * as Yup from "yup";

import Screen from "../../components/Screen";
import {
  Form,
  FormField,
  SubmitButton,
  ErrorMessage,
} from "../../components/forms";
import authApi from "../../api/auth";
import useAuth from "../../auth/useAuth";
import useApi from "../../hooks/useApi";
import ActivityIndicator from "../../components/ActivityIndicator";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
});

function LoginScreen(props) {
  const auth = useAuth();
  const loginApi = useApi(authApi.login);
  const [loginFailed, setLoginFailed] = useState(false);

  const handleSubmit = async ({ email, password }) => {
    const result = await loginApi.request(email, password);
    if (!result.ok) return setLoginFailed(true);
    setLoginFailed(false);
    auth.logIn(result.data.token);
  };

  return (
    <>
      <ActivityIndicator visible={loginApi.loading || auth.loading} />
      <ScrollView style={styles.scrollView}>
        <Screen style={styles.container}>
          <Image
            style={styles.logo}
            source={require("../../assets/logo-red.png")}
          />
          <Form
            initialValues={{ email: "", password: "" }}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            <ErrorMessage
              error="Invalid email and/or password."
              visible={loginFailed}
            />

            <FormField
              autoCapitalize="none"
              autoCorrect={false}
              icon="email"
              keyboardType="email-address"
              name="email"
              placeholder="Email"
              textContentType="emailAddress"
              style={styles.input}
            />
            <FormField
              autoCapitalize="none"
              autoCorrect={false}
              icon="lock"
              name="password"
              placeholder="Password"
              secureTextEntry
              textContentType="password"
              style={styles.input}
            />
            <SubmitButton title="Login" />
          </Form>
        </Screen>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  logo: {
    width: 80,
    height: 80,
    alignSelf: "center",
    marginTop: 50,
    marginBottom: 40,
  },
  input: {
    width: "45%",
    height: 80,
  },
});

export default LoginScreen;
