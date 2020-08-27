import React, { useEffect } from "react";
import { View, StyleSheet, FlatList } from "react-native";

import recentPaymentsApi from "../../api/recentPayments";
import useApi from "../../hooks/useApi";
import { ListItemSeparator, PaymentListItem } from "../../components/lists";
import ActivityIndicator from "../../components/ActivityIndicator";
import utils from "../../utils/utils";

function RecentPaymentsScreen(props) {
  const getRecentsPaymentsApi = useApi(recentPaymentsApi.getRecentPayments);

  useEffect(() => {
    getRecentsPaymentsApi.request();
  }, []);

  return (
    <>
      <ActivityIndicator visible={getRecentsPaymentsApi.loading} />
      <View
        style={{ display: getRecentsPaymentsApi.loading ? "none" : "flex" }}
      >
        <FlatList
          data={getRecentsPaymentsApi.data}
          keyExtractor={(item) => item.id.toString()}
          ItemSeparatorComponent={ListItemSeparator}
          renderItem={({ item }) => (
            <PaymentListItem
              image={require("../../assets/user_1.jpg")}
              title={item.customer.firstname + " " + item.customer.lastname}
              subTitle={
                item.project.name +
                " - " +
                utils.getDateFormatted(item.paymentDate)
              }
              price={" €" + utils.getItemPrice(item.amount)}
            />
          )}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({});

export default RecentPaymentsScreen;
