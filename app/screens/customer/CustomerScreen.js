import React from "react";
import { StyleSheet, View, FlatList } from "react-native";

import { ListItem, ListItemSeparator } from "../../components/lists";
import colors from "../../config/colors";
import Icon from "../../components/Icon";
import Screen from "../../components/Screen";
import utils from "../../utils/utils";
import routes from "../../navigation/routes";

function CustomerScreen({ route, navigation }) {
  const customer = route.params;
  const menuItems = [
    {
      title: "Address",
      subTitle: customer.adress,
      icon: {
        name: "home-account",
        backgroundColor: colors.primary,
      },
    },
    {
      title: "Phone",
      subTitle: customer.phone,
      icon: {
        name: "phone",
        backgroundColor: colors.secondary,
      },
    },
  ];

  return (
    <Screen style={styles.screen}>
      <View style={styles.userHeader}>
        <ListItem
          title={customer.firstname + " " + customer.lastname}
          subTitle={customer.email}
          image={require("../../assets/user_1.jpg")}
          chevron={false}
        />
      </View>
      <View style={styles.userInformation}>
        <FlatList
          data={menuItems}
          keyExtractor={(menuItem) => menuItem.title}
          ItemSeparatorComponent={ListItemSeparator}
          renderItem={({ item }) => (
            <ListItem
              title={item.title}
              subTitle={item.subTitle}
              IconComponent={
                <Icon
                  name={item.icon.name}
                  backgroundColor={item.icon.backgroundColor}
                />
              }
              chevron={false}
            />
          )}
        />
      </View>
      <View style={styles.projectsView}>
        <ListItem
          title={utils.getCustomerProjectsRow(customer)}
          IconComponent={
            <Icon name="home-group" backgroundColor="#ffe66d" onPress />
          }
          onPress={() =>
            navigation.navigate(routes.CUSTOMER_PROJECTS, customer)
          }
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.light,
    flex: 1,
    flexDirection: "column",
  },
  userHeader: {
    marginTop: 15,
    marginBottom: 40,
  },
  projectsView: {
    marginTop: 20,
  },
});

export default CustomerScreen;
