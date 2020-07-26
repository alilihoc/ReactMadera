import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, View, TextInput } from "react-native";

import useApi from "../../hooks/useApi";
import AppButton from "../../components/Button";
import routes from "../../navigation/routes";
import AppText from "../../components/Text";
import plansApi from "../../api/plans";
import modulessApi from "../../api/modules";
import ActivityIndicator from "../../components/ActivityIndicator";
import colors from "../../config/colors";
import {
  ListItem,
  ListItemDeleteAction,
  ListItemSeparator,
} from "../../components/lists";
import Icon from "../../components/Icon";
import { useIsFocused } from "@react-navigation/native";

function PlanEdit({ route, navigation }) {
  const [bLoaddind, setBLoading] = useState(false);
  const project = route.params;
  const getPlansApi = useApi(plansApi.getPlanById);
  const isFocused = useIsFocused();

  useEffect(() => {
    getPlansApi.request(project.plan.id);
  }, [isFocused]);

  const handleDelete = async (item) => {
    setBLoading(true);
    const result = await modulessApi.deleteModule(item.id);

    if (!result.ok) {
      setUploadVisible(false);
      return alert("Could not delete the module");
    }

    setBLoading(false);
    getPlansApi.request(project.plan.id);
  };

  return (
    <>
      {getPlansApi.error && (
        <>
          <AppText>Couldn't retrieve the plan.</AppText>
          <Button title="Retry" onPress={getPlansApi.request} />
        </>
      )}

      <ActivityIndicator visible={getPlansApi.loading || bLoaddind} />

      <View
        style={[
          styles.container,
          { display: getPlansApi.loading || bLoaddind ? "none" : "flex" },
        ]}
      >
        <ListItem
          title={"Range"}
          subTitle={getGammeLabel(getPlansApi.data)}
          chevron={false}
          IconComponent={
            <Icon name="chart-pie" backgroundColor={colors.secondary} />
          }
        />

        <FlatList
          data={getPlansApi.data.modules}
          keyExtractor={(module) => module.id.toString()}
          renderItem={({ item }) => (
            <ListItem
              title={item.name}
              subTitle={getModuleSubtitle(item)}
              onPress={() =>
                navigation.navigate(routes.EDIT_MODULE, {
                  project: project,
                  module: item,
                })
              }
              IconComponent={
                <Icon name="animation-outline" backgroundColor="#4b7bec"></Icon>
              }
              renderRightActions={() => (
                <ListItemDeleteAction onPress={() => handleDelete(item)} />
              )}
            />
          )}
          ItemSeparatorComponent={ListItemSeparator}
          style={styles.flatList}
        />

        <View style={styles.buttonAdd}>
          <AppButton
            title={"Add module"}
            onPress={() =>
              navigation.navigate(routes.EDIT_MODULE, { project: project })
            }
          />
        </View>
      </View>
    </>
  );
}

const getGammeLabel = (plan) => {
  return plan.gamme == undefined ? null : plan.gamme.label;
};

const getModuleSubtitle = (module) => {
  const type = module.type.label;
  let price = getItemPrice(module.price);

  return `Type: ${type}\nPrice: ${price} $`;
};

const getItemPrice = (price) => {
  var parts = price.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  return parts.join(".");
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.light },
  buttonAdd: {
    flex: 1,
    justifyContent: "flex-end",
    marginHorizontal: 10,
  },
  formHeader: {
    fontWeight: "800",
    fontFamily: "Roboto",
    marginVertical: 15,
    marginLeft: 15,
  },
  headerSeparator: {
    width: "100%",
    height: 1,
    backgroundColor: colors.light,
    marginBottom: 15,
  },
  flatList: {
    marginTop: 4,
    height: 420,
  },
});

export default PlanEdit;
