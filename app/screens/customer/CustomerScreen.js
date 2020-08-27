import React, { useEffect, useState } from "react";
import MapView from "react-native-maps";
import { StyleSheet, View, FlatList, Dimensions } from "react-native";

import { ListItem, ListItemSeparator } from "../../components/lists";
import colors from "../../config/colors";
import Icon from "../../components/Icon";
import Screen from "../../components/Screen";
import utils from "../../utils/utils";
import routes from "../../navigation/routes";
import customersApi from "../../api/customers";
import coordinatesApi from "../../api/geocoder/coordinates";
import useApi from "../../hooks/useApi";
import ActivityIndicator from "../../components/ActivityIndicator";

function CustomerScreen({ route, navigation }) {
  const id = route.params;
  const getCustomerApi = useApi(customersApi.getCustomer);

  const [region, setRegion] = useState(null);

  useEffect(() => {
    getCustomerApi.request(id).then((res) => {
      if (res.data.adress) getCoordinates(res.data.adress);
    });
  }, []);

  const getCoordinates = async (address) => {
    try {
      coordinatesApi.getCoordiatesFromAddress(address).then((data) => {
        if (data.data.results[0] !== undefined) {
          const res = data.data.results[0].geometry;
          setRegion({
            latitude: res.location.lat,
            longitude: res.location.lng,
            latitudeDelta:
              res.viewport.northeast.lat - res.viewport.southwest.lat + 0.02,
            longitudeDelta:
              res.viewport.northeast.lng - res.viewport.southwest.lng + 0.02,
          });
        }
      });
    } catch (error) {
      console.log("err " + error);
    }
  };

  const customer = getCustomerApi.data;
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
      <ActivityIndicator visible={getCustomerApi.loading} />
      <View style={{ display: getCustomerApi.loading ? "none" : "flex" }}>
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
                subTitle={item.subTitle ? item.subTitle : "Not Specified"}
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
        <ListItemSeparator />
        <View style={styles.projectsView}>
          <ListItem
            title={utils.getNbProjectsRow(customer.projects)}
            IconComponent={<Icon name="home-group" backgroundColor="#ffe66d" />}
            onPress={() =>
              navigation.navigate(routes.CUSTOMER_PROJECTS, customer)
            }
          />
        </View>
      </View>

      {region && (
        <MapView
          style={[styles.mapStyle, { opacity: getCustomerApi.loading ? 0 : 1 }]}
          initialRegion={region}
          zoomEnabled={true}
          zoomControlEnabled={true}
        >
          <MapView.Marker
            coordinate={{
              latitude: region.latitude,
              longitude: region.longitude,
            }}
            title={customer.firstname + " " + customer.lastname}
            description={customer.adress}
          />
        </MapView>
      )}
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
    marginTop: -5,
    marginBottom: 15,
  },
  mapStyle: {
    width: Dimensions.get("window").width,
    height: 250,
  },
});

export default CustomerScreen;
