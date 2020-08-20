import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AccountScreen from "../screens/account/AccountScreen";
import ListingsScreen from "../screens/projects/ListingsScreen";
import MessagesScreen from "../screens/account/MessagesScreen";
import UserScreen from "../screens/account/UserScreen";
import CustomersScreen from "../screens/account/CustomersScreen";
import CustomerScreen from "../screens/customer/CustomerScreen";
import CustomerProjects from "../screens/customer/CustomerProjects";
import StatsScreen from "../screens/dashboard/StatsScreen";
import RecentPaymentsScreen from "../screens/dashboard/RecentPaymentsScreen";

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

    <Stack.Screen
      name="Stats"
      component={StatsScreen}
      options={{ headerShown: true, title: "Statistics" }}
    />

    <Stack.Screen
      name="RecentPayments"
      component={RecentPaymentsScreen}
      options={{ headerShown: true, title: "Recent Payments" }}
    />
  </Stack.Navigator>
);

export default AccountNavigator;
