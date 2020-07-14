import React, { useState } from "react";
import { StyleSheet, View, ScrollView, DatePickerAndroid } from "react-native";
import * as Yup from "yup";

import { Form, FormField, SubmitButton } from "../components/forms";
import Screen from "../components/Screen";
import projectsApi from "../api/projects";
import UploadScreen from "./UploadScreen";
import AppText from "../components/Text";
import colors from "../config/colors";
import AppFormDate from "../components/forms/AppformDate";

const validationSchema = Yup.object().shape({
  firstname: Yup.string().required().min(1).label("Fistname"),
  lastname: Yup.string().required().min(1).label("Lastname"),
  email: Yup.string().required().min(1).label("E-mail"),
  phone: Yup.string().label("Phone number"),
  name: Yup.string().required().min(1).label("Project name"),
});

function ProjectEditScreen() {
  const [uploadVisible, setUploadVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleSubmit = async (project, { resetForm }) => {
    setProgress(0);
    setUploadVisible(true);
    const result = await projectsApi.addProject({ ...project }, (progress) =>
      setProgress(progress)
    );
    if (!result.ok) {
      setUploadVisible(false);
      return alert("Could not save the project");
    }

    resetForm();
  };

  return (
    <Screen style={styles.container}>
      <ScrollView>
        <UploadScreen
          onDone={() => setUploadVisible(false)}
          progress={progress}
          visible={uploadVisible}
        />
        <Form
          initialValues={{
            firstname: "",
            lastname: "",
            email: "",
            phone: "",
            name: "",
            dateEnd: "",
          }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          {/* ---- Customer Info ---- */}

          <AppText style={styles.formHeader}>Customer informations</AppText>
          <View style={styles.headerSeparator} />

          <FormField
            maxLength={255}
            width="100%"
            name="firstname"
            placeholder="Firstname"
            style={styles.input}
          />
          <FormField
            maxLength={255}
            width="100%"
            name="lastname"
            placeholder="Lastname"
            style={styles.input}
          />
          <FormField
            maxLength={255}
            keyboardType="email-address"
            name="email"
            placeholder="E-mail"
            style={styles.input}
          />
          <FormField
            maxLength={255}
            keyboardType="phone-pad"
            name="phone"
            placeholder="Phone number"
            style={styles.input}
          />
          {/* ---- Project Info ---- */}

          <AppText style={styles.formHeader}>Project informations</AppText>
          <View style={styles.headerSeparator} />

          <FormField maxLength={255} name="name" placeholder="Project name" />
          <AppFormDate name="dateEnd" placeholder="Due date" width="50%" />

          <SubmitButton title="Post" />
        </Form>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    flexDirection: "column",
  },
  formHeader: {
    fontWeight: "800",
    fontFamily: "Roboto",
    marginVertical: 15,
  },
  headerSeparator: {
    width: "100%",
    height: 1,
    backgroundColor: colors.light,
    marginBottom: 15,
  },
  input: {
    width: "100%",
    height: 15,
  },
});
export default ProjectEditScreen;
