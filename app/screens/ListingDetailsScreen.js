import { View, Image, StyleSheet } from "react-native";
import React, { useEffect } from "react";

import colors from "../config/colors";
import ListItem from "../components/lists/ListItem";
import Text from "../components/Text";
import utils from "../utils/utils";
import routes from "../navigation/routes";
import customersApi from "../api/customers";
import ActivityIndicator from "../components/ActivityIndicator";

function ListingDetailsScreen({ route, navigation }) {
  const project = route.params;
  const getCustomerApi = useApi(customersApi.getCustomer);

  useEffect(() => {
    getCustomerApi.request(project.customer.id);
  }, []);

  const customerDetails = getCustomerApi.data;

  return (
    <>
      {getCustomerApi.error && (
        <>
          <AppText>Couldn't retrieve the project.</AppText>
          <Button title="Retry" onPress={getCustomesrApi.request} />
        </>
      )}
      <ActivityIndicator visible={getCustomerApi.loading} />

      <View style={{ display: getCustomerApi.loading ? "none" : "flex" }}>
        <Image
          style={styles.image}
          source={require("../assets/houses/casa_index.jpg")}
        />
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>{project.name}</Text>
          <Text style={styles.date}>{utils.getCreationDate(project)}</Text>
          <View style={styles.userContainer}>
            <ListItem
              image={require("../assets/user_1.jpg")}
              title={utils.getUserFullName(project.customer)}
              subTitle={utils.getNbProjectsRow(customerDetails.projects)}
              style={styles.ListItem}
              onPress={() =>
                navigation.navigate(routes.CUSTOMER_DETAILs, customerDetails.id)
              }
            />
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  detailsContainer: {
    padding: 20,
  },
  image: {
    width: "100%",
    height: 300,
  },
  date: {
    color: colors.secondary,
    fontWeight: "bold",
    fontSize: 20,
    marginVertical: 0,
  },
  ListItem: {
    backgroundColor: colors.red,
    borderBottomColor: colors.primary,
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
  },
  userContainer: {
    marginVertical: 10,
  },
  username: {
    fontSize: 22,
  },
});

export default ListingDetailsScreen;
