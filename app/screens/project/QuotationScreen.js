import React, { useEffect, useState } from "react";
import * as Print from "expo-print";
import { View, StyleSheet, Text, Button } from "react-native";

import quotationsApi from "../../api/quotation";
import plansApi from "../../api/plans";
import AppButton from "../../components/Button";
import ListItem from "../../components/lists/ListItem";
import Icon from "../../components/Icon";
import colors from "../../config/colors";
import utils from "../../utils/utils";
import ActivityIndicator from "../../components/ActivityIndicator";

function QuotationScreen({ route }) {
  const getQuotationsApi = useApi(quotationsApi.getHtmlByID);
  const getPlansApi = useApi(plansApi.getPlanById);
  const plan = route.params;
  const planDetails = getPlansApi.data !== undefined ? getPlansApi.data : null;
  const quotation =
    getPlansApi.data.quotation !== undefined
      ? getPlansApi.data.quotation
      : null;

  useEffect(() => {
    getPlansApi.request(plan.id);
  }, []);

  const refreshScreen = () => {
    getPlansApi.request(plan.id);
  };

  const createAndSavePDF = async () => {
    try {
      const data = await getQuotationsApi.request(plan.id);
      try {
        refreshScreen();
        const promise = await Print.printAsync({
          orientation: Print.Orientation.portrait,
          html: data.data.html,
        });
      } catch (error) {
        alert(error);
      }
    } catch (error) {
      alert(error);
    }
  };

  const updateQuotationState = async (idQuotation, state) => {
    const result = await quotationsApi.EditQuotationState(idQuotation, state);
    if (!result.ok) {
      return alert("Could not edit quotation");
    }
    refreshScreen();
  };

  return (
    <>
      {getPlansApi.error && (
        <>
          <AppText>Couldn't retrieve the quotation.</AppText>
          <Button title="Retry" onPress={refreshScreen} />
        </>
      )}
      <ActivityIndicator visible={getPlansApi.loading} />

      <View
        style={[
          styles.container,
          { display: getPlansApi.loading ? "none" : "flex" },
        ]}
      >
        {/* Quotation Infos */}
        <ListItem
          title={quotation == undefined ? null : quotation.label}
          subTitle={
            utils.isQuotationGenerated(quotation)
              ? utils.getFormattedDate(quotation.dateCreation)
              : null
          }
          IconComponent={
            <Icon
              name="alpha-q"
              backgroundColor={colors.secondary}
              iconSize={1}
            />
          }
          chevron={false}
        />

        {/* Quotation State */}
        <ListItem
          title={"Etat"}
          subTitle={
            quotation == undefined
              ? null
              : utils.getQuotationState(quotation.state)
          }
          IconComponent={
            <Icon name="alpha-s" backgroundColor={"#4b7bec"} iconSize={1} />
          }
          chevron={false}
        />

        {/* Quotation Modules */}
        {utils.isQuotationGenerated(quotation) && (
          <ListItem
            title={
              planDetails.modules == undefined
                ? null
                : planDetails.modules.length + " modules"
            }
            subTitle={
              quotation == undefined
                ? null
                : utils.getItemPrice(quotation.prixTTC) + "€"
            }
            IconComponent={
              <Icon name="animation-outline" backgroundColor={colors.primary} />
            }
            chevron={false}
          />
        )}

        {/* Quotation Actions */}
        {!utils.isQuotationGenerated(quotation) && (
          <View style={styles.generateButton}>
            <AppButton title="Générer" onPress={() => createAndSavePDF()} />
          </View>
        )}

        {utils.isQuotationWaitingAnswer(quotation) && (
          <View style={styles.generateButton}>
            <View style={styles.ButtonsEditState}>
              <AppButton
                title="Refuser"
                onPress={() => updateQuotationState(quotation.id, 2)}
                width="49%"
              />
              <AppButton
                title="Accepter"
                color="secondary"
                onPress={() => updateQuotationState(quotation.id, 3)}
                width="49%"
              />
            </View>
          </View>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: colors.light,
  },
  generateButton: {
    flex: 1,
    justifyContent: "flex-end",
    marginHorizontal: 10,
  },
  ButtonsEditState: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    maxHeight: 80,
    marginHorizontal: 10,
  },
});

export default QuotationScreen;
