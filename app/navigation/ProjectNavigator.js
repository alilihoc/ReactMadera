import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ProjectEditScreen from "../screens/project/ProjectEditScreen";

const Stack = createStackNavigator();

const ProjectNavigator = ({ route }) => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="ProjectEdit" component={ProjectEditScreen} />
  </Stack.Navigator>
);

export default ProjectNavigator;
