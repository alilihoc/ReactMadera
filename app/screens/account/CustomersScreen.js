import React from "react";
import { StyleSheet, View, FlatList } from "react-native";

import useAuth from "../../auth/useAuth";
import utils from "../../utils/utils";
import routes from "../../navigation/routes";
import { ListItem, ListItemSeparator } from "../../components/lists";

function CustomersScreen({ navigation }) {
  const { user } = useAuth();
  const customers = getMyCustomers(user.projects);

  return (
    <View style={styles.container}>
      <FlatList
        data={customers}
        keyExtractor={(item) => item.id.toString()}
        ItemSeparatorComponent={ListItemSeparator}
        renderItem={({ item }) => (
          <ListItem
            image={require("../../assets/user_1.jpg")}
            title={utils.getUserFullName(item)}
            subTitle={item.email}
            style={styles.customerItem}
            onPress={() =>
              navigation.navigate(routes.CUSTOMER_DETAILs, item.id)
            }
          />
        )}
      />
    </View>
  );
}

const getMyCustomers = (projects) => {
  let customersIds = [];
  let customers = [];
  projects.forEach((project) => {
    const customer = project.customer;
    if (!customersIds.includes(customer.id)) {
      customers.push({
        id: customer.id,
        firstname: customer.firstname,
        lastname: customer.lastname,
        email: customer.email,
      });
      customersIds.push(customer.id);
    }
  });
  return customers;
};

const styles = StyleSheet.create({
  container: {},
});

export default CustomersScreen;
