import React from "react";
import { StyleSheet, View, FlatList } from "react-native";

import { ListItem, ListItemSeparator } from "../../components/lists";
import colors from "../../config/colors";
import Icon from "../../components/Icon";
import Screen from "../../components/Screen";
import utils from "../../utils/utils";

function UserScreen({ route }) {
  const user = route.params;
  const menuItems = [
    {
      title: "Addresse",
      subTitle: user.adress,
      icon: {
        name: "home-account",
        backgroundColor: colors.primary,
      },
    },
    {
      title: "Télépone",
      subTitle: user.phone,
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
          title={user.firstname + " " + user.lastname}
          subTitle={user.email}
          image={require("../../assets/hocine.jpg")}
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
              subTitle={item.subTitle ? item.subTitle : "Non spécifié"}
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
          title={utils.getNbProjectsRow(user.projects)}
          IconComponent={
            <Icon name="logout" backgroundColor="#ffe66d" onPress />
          }
          chevron={false}
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

export default UserScreen;
