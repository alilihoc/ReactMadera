import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ListingsScreen from "../screens/projects/ListingsScreen";
import ListingDetailsScreen from "../screens/projects/ListingDetailsScreen";
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
      options={{ headerShown: true, title: "Customer projects" }}
    />
    <Stack.Screen
      name="PlanEdit"
      component={PlanEdit}
      options={({ route }) => ({
        headerShown: true,
        title: route.params.name + "'s plan",
      })}
    />
    <Stack.Screen
      name="ModuleEdit"
      component={ModuleEditScreen}
      options={() => ({
        headerShown: true,
        title: "Add module",
      })}
    />
    <Stack.Screen
      name="Quotation"
      component={QuotationScreen}
      options={() => ({
        headerShown: true,
        title: "Quotation",
      })}
    />
    <Stack.Screen
      name="Payment"
      component={PaymentScreen}
      options={() => ({
        headerShown: true,
        title: "Payment",
      })}
    />
  </Stack.Navigator>
);

export default FeedNavigator;
