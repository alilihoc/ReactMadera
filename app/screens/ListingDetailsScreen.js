import { View, Image, StyleSheet } from "react-native";
import React, { useEffect } from "react";

import colors from "../config/colors";
import ListItem from "../components/lists/ListItem";
import Text from "../components/Text";
import utils from "../utils/utils";
import routes from "../navigation/routes";
import customersApi from "../api/customers";
import ActivityIndicator from "../components/ActivityIndicator";
import Icon from "../components/Icon";
import { useIsFocused } from "@react-navigation/native";

function ListingDetailsScreen({ route, navigation }) {
  const project = route.params;
  const getCustomerApi = useApi(customersApi.getCustomer);
  const isFocused = useIsFocused();

  useEffect(() => {
    getCustomerApi.request(project.customer.id);
  }, [isFocused]);

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
          <View style={styles.projectInformations}>
            <Text style={styles.title}>{project.name}</Text>
            <Text style={styles.date}>{utils.getCreationDate(project)}</Text>
          </View>
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
            <View style={styles.viewDetail}>
              <ListItem
                IconComponent={
                  <Icon
                    name="tooltip-edit"
                    backgroundColor={colors.secondary}
                  />
                }
                title={project.plan.name}
                subTitle={project.plan.gamme.label}
                onPress={() => navigation.navigate(routes.EDIT_PLAN, project)}
              />
            </View>
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  detailsContainer: {
    backgroundColor: colors.light,
    height: 500,
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
  title: {
    fontSize: 28,
    fontWeight: "800",
  },
  projectInformations: {
    padding: 20,
  },
  userContainer: {
    marginVertical: 10,
  },
  username: {
    fontSize: 22,
  },
  viewDetail: {
    marginTop: 20,
  },
});

export default ListingDetailsScreen;
