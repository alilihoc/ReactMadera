import { View, Image, StyleSheet, FlatList } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import React, { useEffect } from "react";

import colors from "../../config/colors";
import ListItem from "../../components/lists/ListItem";
import Text from "../../components/Text";
import utils from "../../utils/utils";
import routes from "../../navigation/routes";
import customersApi from "../../api/customers";
import projectsApi from "../../api/projects";
import ActivityIndicator from "../../components/ActivityIndicator";
import Icon from "../../components/Icon";
import { ListItemSeparator } from "../../components/lists";

function ListingDetailsScreen({ route, navigation }) {
  const project = route.params;
  const getCustomerApi = useApi(customersApi.getCustomer);
  const getProjectApi = useApi(projectsApi.getProject);
  const isFocused = useIsFocused();

  useEffect(() => {
    getCustomerApi.request(project.customer.id);
    getProjectApi.request(project.id);
  }, [isFocused]);

  const customerDetails = getCustomerApi.data;
  const projectDetails = getProjectApi.data;

  return (
    <>
      {getCustomerApi.error && (
        <>
          <AppText>Couldn't retrieve the project.</AppText>
          <Button title="Retry" onPress={getProjectApi.request} />
        </>
      )}
      <ActivityIndicator visible={getProjectApi.loading} />

      <View style={{ display: getProjectApi.loading ? "none" : "flex" }}>
        <Image
          style={styles.image}
          source={require("../../assets/houses/casa_index.jpg")}
        />
        <View style={styles.detailsContainer}>
          <View style={styles.projectInformations}>
            <Text style={styles.title}>
              {utils.ctoUpperCase(projectDetails.name)}
            </Text>
            <Text style={styles.date}>
              {utils.getCreationDate(projectDetails)}
            </Text>
          </View>
          <View style={styles.userContainer}>
            <ListItem
              image={require("../../assets/user_1.jpg")}
              title={utils.getUserFullName(projectDetails.customer)}
              subTitle={utils.getNbProjectsRow(customerDetails.projects)}
              style={styles.ListItem}
              onPress={() =>
                navigation.navigate(routes.CUSTOMER_DETAILs, customerDetails.id)
              }
            />
            <View style={styles.viewDetail}>
              <FlatList
                data={getFlatListItems(projectDetails)}
                keyExtractor={(menuItem) => menuItem.title}
                ItemSeparatorComponent={ListItemSeparator}
                renderItem={({ item }) =>
                  item.display && (
                    <ListItem
                      title={item.title}
                      subTitle={item.subtitle}
                      IconComponent={
                        <Icon
                          name={item.icon.name}
                          backgroundColor={item.icon.backgroundColor}
                          iconSize={item.icon.iconSize ? item.icon.iconSize : 1}
                        />
                      }
                      onPress={() =>
                        navigation.navigate(
                          item.targetScreen,
                          item.targetScreenParams
                        )
                      }
                    />
                  )
                }
              />
            </View>
          </View>
        </View>
      </View>
    </>
  );
}

const getFlatListItems = (project) => {
  if (project.plan == undefined) return null;
  return [
    {
      title: project.plan.name.capitalize(),
      subtitle: project.plan.gamme.label.capitalize(),
      icon: {
        name: "alpha-p",
        backgroundColor: colors.secondary,
      },
      targetScreen: routes.EDIT_PLAN,
      targetScreenParams: project,
      display: true,
    },
    {
      title: project.plan.quotation.label.capitalize(),
      subtitle:
        "Status: " + utils.getQuotationState(project.plan.quotation.state),
      icon: {
        name: "alpha-q",
        backgroundColor: "#4b7bec",
      },
      targetScreen: routes.QUOTATION,
      targetScreenParams: project.plan,
      display: true,
    },
    {
      title:
        project.payment == undefined ? null : project.payment.name.capitalize(),
      subtitle:
        project.payment == undefined
          ? null
          : "Progess: " + project.payment.percent + "%",
      icon: {
        name: "credit-card-outline",
        backgroundColor: colors.primary,
        iconSize: 0.6,
      },
      targetScreen: routes.PAYMENT,
      targetScreenParams: {
        projectID: project.id,
        customerEmail: project.customer.email,
        quotationID: project.plan.quotation.id,
      },
      display: project.plan.quotation.state >= 3,
    },
  ];
};

String.prototype.capitalize = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

const styles = StyleSheet.create({
  detailsContainer: {
    backgroundColor: colors.light,
    height: 500,
  },
  image: {
    width: "100%",
    height: 280,
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
    marginVertical: -10,
  },
  username: {
    fontSize: 22,
  },
  viewDetail: {
    marginTop: 5,
  },
});

export default ListingDetailsScreen;
