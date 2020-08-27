import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, View, TextInput } from "react-native";

import Card from "../../components/Card";
import routes from "../../navigation/routes";
import utils from "../../utils/utils";
import colors from "../../config/colors";
import Screen from "../../components/Screen";

function CustomerProjects({ route, navigation }) {
  const customer = route.params;

  return (
    <Screen style={styles.container}>
      <View>
        <FlatList
          data={customer.projects}
          keyExtractor={(listing) => listing.id.toString()}
          renderItem={({ item }) => (
            <Card
              title={item.name}
              subTitle={utils.getCreationDate(item)}
              imageUri={item.uri}
              defaultImageSource={require("../../assets/houses/casa_index.jpg")}
              onPress={() => navigation.navigate(routes.PROJECT_DETAILS, item)}
            />
          )}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: colors.light,
  },
});

export default CustomerProjects;
