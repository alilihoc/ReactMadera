import React from "react";
import { useFormikContext } from "formik";
import { StyleSheet } from "react-native";

import TextInput from "../TextInput";
import ErrorMessage from "./ErrorMessage";

function AppFormField({ name, width, ...otherProps }) {
  const {
    setFieldTouched,
    setFieldValue,
    errors,
    touched,
    values,
  } = useFormikContext();

  return (
    <>
      <TextInput
        onBlur={() => setFieldTouched(name)}
        onChangeText={(text) => setFieldValue(name, text)}
        value={values[name]}
        width={width}
        {...otherProps}
      />
      <ErrorMessage
        error={errors[name]}
        visible={touched[name]}
        style={styles.errorMessageStyle}
      />
    </>
  );
}

const styles = StyleSheet.create({
  errorMessageStyle: {
    fontSize: 12,
    paddingLeft: 15,
  },
});

export default AppFormField;
