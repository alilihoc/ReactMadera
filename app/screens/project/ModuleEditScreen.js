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
import UploadScreen from "../UploadScreen";
import AppText from "../../components/Text";
import colors from "../../config/colors";
import routes from "../../navigation/routes";
import modulesApi from "../../api/modules";
import utils from "../../utils/utils";

const validationSchema = Yup.object().shape({
  name: Yup.string().required().min(1).label("Name"),
  length: Yup.number().required().label("Length"),
  width: Yup.number().required().label("Width"),
  type: Yup.object().required().label("Type"),
});

function ModuleEditScreen({ route, navigation }) {
  const getModulesApi = useApi(modulesApi.getAll);
  const [uploadVisible, setUploadVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const project = route.params.project;
  const module = route.params.module == undefined ? null : route.params.module;

  const handleSubmit = async (data, { resetForm }) => {
    setProgress(0);
    setUploadVisible(true);
    const result = await modulesApi.AddOrEditdModule({ ...data }, (progress) =>
      setProgress(progress)
    );
    if (!result.ok) {
      setUploadVisible(false);
      console.log(result.data);
      return alert("Could not save the module");
    }
    navigation.navigate(routes.EDIT_PLAN, project);
    resetForm();
  };

  useEffect(() => {
    getModulesApi.request();
  }, []);

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
            moduleId: module ? module.id : null,
            planId: project.plan.id,
            name: module ? module.name : "test",
            width: module ? module.width.toString() : "5",
            length: module ? module.length.toString() : "5",
            type: module ? module.type : null,
            floor: module ? module.floor : null,
            structure: module ? module.structure : null,
            isolation: module ? module.isolation : null,
            finition: module ? module.finition : null,
            coverage: module ? module.coverage : null,
          }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          {/* ---- Module Infos ---- */}

          <AppText style={styles.formHeader}>Module Information</AppText>
          <View style={styles.headerSeparator} />

          <FormField
            maxLength={255}
            width="100%"
            name="name"
            placeholder="name"
            style={styles.input}
          />

          <View style={styles.groupFields}>
            <FormField
              maxLength={255}
              width="55%"
              name="width"
              keyboardType="phone-pad"
              placeholder="Width"
              style={styles.input}
            />
            <FormField
              maxLength={255}
              width="35%"
              name="length"
              keyboardType="phone-pad"
              placeholder="Length"
              style={styles.input}
            />
          </View>

          {/* ---- Module Infos ---- */}

          <AppText style={styles.formHeader}>Module composition</AppText>
          <View style={styles.headerSeparator} />

          <View style={styles.groupFields}>
            <Picker
              items={utils.parseData(getModulesApi.data.type)}
              name="type"
              placeholder="Type"
              width="45%"
            />
            <Picker
              items={utils.parseData(getModulesApi.data.floor)}
              name="floor"
              placeholder="Floor"
              width="45%"
            />
          </View>

          <View style={styles.groupFields}>
            <Picker
              items={utils.parseData(getModulesApi.data.coverage)}
              name="coverage"
              placeholder="Coverage"
              width="45%"
            />
            <Picker
              items={utils.parseData(getModulesApi.data.finition)}
              name="finition"
              placeholder="Finition"
              width="45%"
            />
          </View>

          <View style={styles.groupFields}>
            <Picker
              items={utils.parseData(getModulesApi.data.structure)}
              name="structure"
              placeholder="Structure"
              width="45%"
            />
            <Picker
              items={utils.parseData(getModulesApi.data.isolation)}
              name="isolation"
              placeholder="Isolation"
              width="45%"
            />
          </View>

          <View style={styles.buttonAdd}>
            <SubmitButton title="Post" />
          </View>
        </Form>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: { padding: 5, marginTop: -10 },
  groupFields: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    maxHeight: 75,
  },
  buttonAdd: {
    flex: 1,
    justifyContent: "flex-end",
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
});

export default ModuleEditScreen;
