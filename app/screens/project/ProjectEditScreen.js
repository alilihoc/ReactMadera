import React, { useState, useEffect } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import * as Yup from "yup";

import {
  Form,
  FormField,
  SubmitButton,
  FormPicker as Picker,
} from "../../components/forms";

import Screen from "../../components/Screen";
import projectsApi from "../../api/projects";
import UploadScreen from "../UploadScreen";
import AppText from "../../components/Text";
import colors from "../../config/colors";
import routes from "../../navigation/routes";
import AppFormDate from "../../components/forms/AppformDate";
import gammesApi from "../../api/gammes";
import useAuth from "../../auth/useAuth";
import FormImagePicker from "../../components/forms/FormImagePicker";

const validationSchema = Yup.object().shape({
  firstname: Yup.string().required().min(1).label("Fistname"),
  lastname: Yup.string().required().min(1).label("Lastname"),
  email: Yup.string().required().min(1).label("E-mail"),
  phone: Yup.string().label("Phone number"),
  name: Yup.string().required().min(1).label("Project name"),
  gamme: Yup.object().nullable().label("Range"),
  dateEnd: Yup.string().nullable().label("Due date"),
});

function ProjectEditScreen({ navigation }) {
  const { user } = useAuth();
  const [uploadVisible, setUploadVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const getGammesApi = useApi(gammesApi.getAlls);

  useEffect(() => {
    getGammesApi.request();
  }, []);

  const handleSubmit = async (project, { resetForm }) => {
    setProgress(0);
    setUploadVisible(true);
    const result = await projectsApi.addProject(
      { ...project, user },
      (progress) => setProgress(progress)
    );
    if (!result.ok) {
      setUploadVisible(false);
      return alert("Could not save the project");
    }
    navigation.navigate(routes.PROJECT_DETAILS, result.data);
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
            gamme: null,
            dateEnd: "",
            images: [],
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
            placeholder="Nom"
            style={styles.input}
          />
          <FormField
            maxLength={255}
            width="100%"
            name="Prénom"
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
            placeholder="Numéro de téléphone"
            style={styles.input}
          />
          {/* ---- Project Info ---- */}

          <AppText style={styles.formHeader}>Project informations</AppText>
          <View style={styles.headerSeparator} />

          <FormImagePicker name="images" />
          <FormField maxLength={255} name="name" placeholder="Project name" />
          <View style={styles.bottomFields}>
            <AppFormDate name="dateEnd" placeholder="Due date" width="80%" />
            <Picker
              items={getGammesApi.data}
              name="gamme"
              numberOfColumns={3}
              placeholder="Gamme"
              width="50%"
            />
          </View>

          <SubmitButton title="Envoyer" />
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
  bottomFields: {
    flex: 1,
    flexDirection: "row",
    maxHeight: 80,
  },
});
export default ProjectEditScreen;
