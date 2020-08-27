import React, { useEffect } from "react";
import { StyleSheet, View, FlatList } from "react-native";

import { ListItem, ListItemSeparator } from "../../components/lists";
import colors from "../../config/colors";
import Icon from "../../components/Icon";
import routes from "../../navigation/routes";
import Screen from "../../components/Screen";
import useAuth from "../../auth/useAuth";
import utils from "../../utils/utils";

const menuItems = [
  {
    title: "Projets",
    icon: {
      name: "format-list-bulleted",
      backgroundColor: colors.primary,
    },
    targetStack: "Projects",
    targetScreen: routes.LISTING_PROJECTS,
  },
  {
    title: "Clients",
    icon: {
      name: "account-group",
      backgroundColor: "#4b7bec",
    },
    targetScreen: routes.MY_CUSTOMERS,
  },
  {
    title: "Messages",
    icon: {
      name: "email",
      backgroundColor: colors.secondary,
    },
    targetScreen: routes.MESSAGES,
  },
  {
    title: "Tableau de bord",
    icon: {
      name: "chart-pie",
      backgroundColor: "#636e72",
    },
    targetScreen: routes.STATS,
  },
  {
    title: "Paiments récents",
    icon: {
      name: "cash-usd",
      backgroundColor: "#30336b",
    },
    targetScreen: routes.RECENT_PAYMENTS,
  },
];

function AccountScreen({ navigation }) {
  const { user, logOut } = useAuth();

  return (
    <Screen style={styles.screen}>
      <View style={styles.container}>
        <ListItem
          title={utils.getUserFullName(user)}
          subTitle={user.email}
          image={require("../../assets/hocine.jpg")}
          onPress={() => navigation.navigate(routes.USER_INFOS, user)}
        />
      </View>
      <View style={styles.container}>
        <FlatList
          data={menuItems}
          keyExtractor={(menuItem) => menuItem.title}
          ItemSeparatorComponent={ListItemSeparator}
          renderItem={({ item }) => (
            <ListItem
              title={item.title}
              IconComponent={
                <Icon
                  name={item.icon.name}
                  backgroundColor={item.icon.backgroundColor}
                />
              }
              onPress={() => handleNavigation(navigation, item)}
            />
          )}
        />
      </View>
      <ListItem
        title="Se déconnecter"
        IconComponent={<Icon name="logout" backgroundColor="#ffe66d" />}
        onPress={() => logOut()}
      />
    </Screen>
  );
}

const handleNavigation = (navigation, item) => {
  switch (item.targetScreen) {
    case routes.LISTING_PROJECTS:
      return navigation.navigate(item.targetStack, {
        screen: item.targetScreen,
      });
    default:
      return navigation.navigate(item.targetScreen);
  }
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.light,
  },
  container: {
    marginVertical: 20,
  },
});

export default AccountScreen;
