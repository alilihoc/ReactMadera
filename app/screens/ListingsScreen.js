import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, View, TextInput } from "react-native";

import ActivityIndicator from "../components/ActivityIndicator";
import Button from "../components/Button";
import Card from "../components/Card";
import colors from "../config/colors";
import projectsApi from "../api/projects";
import routes from "../navigation/routes";
import Screen from "../components/Screen";
import AppText from "../components/Text";
import useApi from "../hooks/useApi";
import Icon from "../components/Icon";
import utils from "../utils/utils";
import useAuth from "../auth/useAuth";

function ListingsScreen({ navigation }) {
  const { user } = useAuth();
  const getProjectsApi = useApi(projectsApi.getProjects);
  const [search, setSearch] = useState("");
  const [launchSearch, setLauchSearch] = useState(false);

  useEffect(() => {
    getProjectsApi.request(user.id, search);
  }, [search, launchSearch]);

  const refreshSearch = () => {
    setLauchSearch(!launchSearch);
  };

  return (
    <Screen style={styles.screen}>
      {getProjectsApi.error && (
        <>
          <AppText>Couldn't retrieve the listings.</AppText>
          <Button title="Retry" onPress={getProjectsApi.request} />
        </>
      )}
      <View style={styles.searchContainer}>
        <TextInput
          onChangeText={(text) => setSearch(text)}
          style={styles.searchInput}
          placeholder="Project name"
          value={search}
        />
        <Icon
          name="account-search"
          size={35}
          backgroundColor={colors.primary}
          iconColor="#fff"
          onPress={() => refreshSearch()}
          style={styles.searchIcon}
        ></Icon>
      </View>
      <ActivityIndicator visible={getProjectsApi.loading} />
      <View
        style={[
          styles.viewContainer,
          { display: getProjectsApi.loading ? "none" : "flex" },
        ]}
      >
        <FlatList
          data={getProjectsApi.data}
          keyExtractor={(listing) => listing.id.toString()}
          renderItem={({ item }) => (
            <Card
              title={utils.getCardName(item)}
              subTitle={utils.getCreationDate(item)}
              image={require("../assets/houses/casa_index.jpg")}
              onPress={() => navigation.navigate(routes.PROJECT_DETAILS, item)}
            />
          )}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 15,
    backgroundColor: colors.light,
  },
  searchContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    maxHeight: 60,
    marginBottom: 20,
  },
  searchInput: {
    height: 45,
    width: "100%",
    borderColor: colors.medium,
    borderWidth: 1,
    paddingLeft: 20,
    marginRight: 20,
    borderRadius: 50,
    backgroundColor: colors.white,
  },
  searchIcon: {
    position: "absolute",
    right: 7,
  },
  IconSearchWrap: { backgroundColor: "red" },
  viewContainer: {
    flex: 1,
    flexDirection: "column",
  },
});

export default ListingsScreen;
