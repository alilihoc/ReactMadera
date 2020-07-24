import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, View, TextInput } from "react-native";
import * as Yup from "yup";

import {
  Form,
  FormField,
  FormPicker as Picker,
  SubmitButton,
} from "../../components/forms";
import CategoryPickerItem from "../../components/CategoryPickerItem";
import gammesApi from "../../api/gammes";
import useApi from "../../hooks/useApi";

const validationSchema = Yup.object().shape({
  gamme: Yup.object().required().label("Range"),
});

function PlanEdit({ route, navigation }) {
  const [uploadVisible, setUploadVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  // const project = route.params;
  const getGammesApi = useApi(gammesApi.getAlls);

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
    data = result.data;
    navigation.navigate(routes.EDIT_PLAN, { id: data.id, name: data.name });
    resetForm();
  };

  useEffect(() => {
    getGammesApi.request();
  }, []);

  return (
    <View style={styles.container}>
      <Form
        initialValues={{
          gamme: null,
        }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <Picker
          items={getGammesApi.data}
          name="gamme"
          numberOfColumns={3}
          placeholder="Select a range"
          width="50%"
        />
      </Form>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default PlanEdit;
