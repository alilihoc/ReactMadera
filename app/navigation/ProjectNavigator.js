import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ProjectEditScreen from "../screens/project/ProjectEditScreen";
import PlanEdit from "../screens/project/PlanEdit";

const Stack = createStackNavigator();

const ProjectNavigator = ({ route }) => (
  <Stack.Navigator>
    <Stack.Screen name="ProjectEdit" component={ProjectEditScreen} />
    <Stack.Screen
      name="PlanEdit"
      component={PlanEdit}
      options={({ route }) => ({ title: route.params.name + "'s plan" })}
    />
  </Stack.Navigator>
);

export default ProjectNavigator;
