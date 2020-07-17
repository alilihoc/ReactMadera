import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AccountScreen from "../screens/account/AccountScreen";
import ListingsScreen from "../screens/ListingsScreen";
import MessagesScreen from "../screens/account/MessagesScreen";
import UserScreen from "../screens/account/UserScreen";
import CustomersScreen from "../screens/account/CustomersScreen";
import CustomerScreen from "../screens/customer/CustomerScreen";
import CustomerProjects from "../screens/customer/CustomerProjects";

const Stack = createStackNavigator();

const AccountNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="Account" component={AccountScreen} />
    <Stack.Screen name="Messages" component={MessagesScreen} />
    <Stack.Screen name="Projects" component={ListingsScreen} />
    <Stack.Screen
      name="MyCustomers"
      component={CustomersScreen}
      options={{ title: "Customers" }}
    />
    <Stack.Screen
      name="UserInfos"
      component={UserScreen}
      options={{ title: "My Informations" }}
    />
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
  </Stack.Navigator>
);

export default AccountNavigator;
