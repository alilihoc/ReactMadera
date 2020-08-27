import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ListingsScreen from "../screens/projects/ProjectsScreen";
import ListingDetailsScreen from "../screens/projects/ProjectDetailsScreen";
import CustomerScreen from "../screens/customer/CustomerScreen";
import CustomerProjects from "../screens/customer/CustomerProjects";
import PlanEdit from "../screens/project/PlanEdit";
import ModuleEditScreen from "../screens/project/ModuleEditScreen";
import QuotationScreen from "../screens/project/QuotationScreen";
import PaymentScreen from "../screens/project/PaymentScreen";

const Stack = createStackNavigator();

const FeedNavigator = () => (
  <Stack.Navigator mode="modal" screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Projects" component={ListingsScreen} />
    <Stack.Screen name="ProjectDetails" component={ListingDetailsScreen} />
    <Stack.Screen
      name="Customer"
      component={CustomerScreen}
      options={{ headerShown: true }}
    />
    <Stack.Screen
      name="CustomerProjects"
      component={CustomerProjects}
      options={{ headerShown: true, title: "projects client" }}
    />
    <Stack.Screen
      name="PlanEdit"
      component={PlanEdit}
      options={({ route }) => ({
        headerShown: true,
        title: "Plan",
      })}
    />
    <Stack.Screen
      name="ModuleEdit"
      component={ModuleEditScreen}
      options={() => ({
        headerShown: true,
        title: "Ajout module",
      })}
    />
    <Stack.Screen
      name="Quotation"
      component={QuotationScreen}
      options={() => ({
        headerShown: true,
        title: "Devis",
      })}
    />
    <Stack.Screen
      name="Payment"
      component={PaymentScreen}
      options={() => ({
        headerShown: true,
        title: "Paiement",
      })}
    />
  </Stack.Navigator>
);

export default FeedNavigator;
