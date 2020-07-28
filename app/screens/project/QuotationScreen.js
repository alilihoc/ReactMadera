import React, { useEffect } from "react";
import * as Print from "expo-print";
import { View, StyleSheet, Text, Button } from "react-native";

import quotationsApi from "../../api/quotation";
import AppButton from "../../components/Button";

function QuotationScreen({ route }) {
  const getQuotationsApi = useApi(quotationsApi.getHtmlByID);
  const plan = route.params;

  useEffect(() => {
    getQuotationsApi.request(plan.id);
  }, []);

  const createAndSavePDF = async () => {
    try {
      const promise = await Print.printAsync({
        orientation: Print.Orientation.portrait,
        html: getQuotationsApi.data.html,
      });
    } catch (error) {
      alert(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.generateButton}>
        <AppButton title="Generate" onPress={() => createAndSavePDF()} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, flexDirection: "column" },
  generateButton: {
    flex: 1,
    justifyContent: "flex-end",
    marginHorizontal: 10,
  },
});

export default QuotationScreen;
