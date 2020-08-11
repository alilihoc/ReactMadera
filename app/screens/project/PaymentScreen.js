import React, { useEffect, useState } from "react";
import { StyleSheet, FlatList, View, Modal, Button } from "react-native";
import StripeCheckout from "expo-stripe-checkout";

import paymentsApi from "../../api/payment";
import colors from "../../config/colors";
import ListItem from "../../components/lists/ListItem";
import AppText from "../../components/Text";
import utils from "../../utils/utils";
import ActivityIndicator from "../../components/ActivityIndicator";
import Icon from "../../components/Icon";
import { ListItemSeparator } from "../../components/lists";
import Screen from "../../components/Screen";

function PaymentScreen({ route, navigation }) {
  const projectId = route.params.projectID;
  const getPaymentsApi = useApi(paymentsApi.getOrCreatePayment);

  const [modalVisible, setModalVisible] = useState(false);
  const [currentStep, setCurrentStep] = useState(null);
  const [bLoading, setBLoading] = useState(false);

  useEffect(() => {
    getPaymentsApi.request(projectId);
  }, []);

  const refreshScreen = () => {
    getPaymentsApi.request(projectId);
  };

  const processPayment = (item) => {
    if (item.state == 1) return;
    setModalVisible(true);
    setCurrentStep(item);
  };

  const closeProcessPaiement = async () => {
    setBLoading(true);
    setModalVisible(false);
    const result = await paymentsApi.editPaymentState(
      payment,
      currentStep,
      route.params.quotationID
    );
    if (!result.ok) {
      return alert("Could not edit payment");
    }
    refreshScreen();
    setBLoading(false);
  };

  const payment = utils.parseData(getPaymentsApi.data);

  return (
    <>
      {getPaymentsApi.error && (
        <>
          <AppText>Couldn't retrieve the payment.</AppText>
          <Button title="Retry" onPress={getPaymentsApi.request(projectId)} />
        </>
      )}
      <ActivityIndicator visible={getPaymentsApi.loading || bLoading} />

      <View
        style={[
          styles.container,
          { display: getPaymentsApi.loading || bLoading ? "none" : "flex" },
        ]}
      >
        {/* ---- FlatList ----- */}
        <FlatList
          data={getFlatListItems(payment)}
          keyExtractor={(item) => item.title}
          ItemSeparatorComponent={ListItemSeparator}
          renderItem={({ item }) => (
            <ListItem
              title={item.title}
              subTitle={item.subtitle}
              IconComponent={
                <Icon
                  name={"credit-card-outline"}
                  backgroundColor={item.iconColor}
                  iconSize={0.6}
                />
              }
              onPress={() => processPayment(item)}
              chevron={item.state == 0 ? true : false}
            />
          )}
        />

        {/* ---- Modal ----- */}
        <Modal visible={modalVisible} animationType="slide">
          <Screen>
            <Button title="Close" onPress={() => closeProcessPaiement()} />
            <StripeCheckout
              publicKey="pk_test_51HDyYNHYGSlGuvh2vs2LhXv32cozwlNPhfzS7DbO9de8nUPV2BGOM6YM9kqxLKPmr0VYBUoOQ70tUnW4QDrHcCIn0032aPf3Kz"
              amount={currentStep !== null ? currentStep.amount : null}
              imageUrl="https://logos.flamingtext.com/City-Logos/Madera-Water-Logo.png"
              storeName={
                "Payment : Step " +
                (currentStep !== null ? currentStep.index : null)
              }
              description={
                currentStep !== null ? currentStep.title : "Paiement"
              }
              currency="USD"
              allowRememberMe={true}
              prepopulatedEmail={route.params.customerEmail}
              onClose={() => console.log("Close")}
              onPaymentSuccess={(token) => console.log(token)}
              style={styles.paymentLayout}
            />
          </Screen>
        </Modal>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {},
  paymentLayout: {
    backgroundColor: "blue",
  },
});

const getFlatListItems = (payment) => {
  if (payment == undefined) return null;

  return [
    {
      index: 1,
      state: payment.step1State,
      amount: payment.step1Amount,
      percent: payment.step1Percentage,
      title: payment.step1Name,
      subtitle:
        payment.step1Amount +
        " $" +
        (payment.step1State == 1
          ? " - Paid on " + utils.getDateFormatted(payment.step1DatePaiment)
          : " - Waiting Payment"),

      iconColor: payment.step1State == 1 ? colors.secondary : colors.primary,
    },
    {
      index: 2,
      state: payment.step2State,
      amount: payment.step2Amount,
      percent: payment.step2Percentage,
      title: payment.step2Name,
      subtitle:
        payment.step2Amount +
        " $" +
        (payment.step2State == 1
          ? " - Paid on " + utils.getDateFormatted(payment.step2DatePaiment)
          : " - Waiting Payment"),

      iconColor: payment.step2State == 1 ? colors.secondary : colors.primary,
    },
    {
      index: 3,
      state: payment.step3State,
      amount: payment.step3Amount,
      percent: payment.step3Percentage,
      title: payment.step3Name,
      subtitle:
        payment.step3Amount +
        " $" +
        (payment.step3State == 1
          ? " - Paid on " + utils.getDateFormatted(payment.step3DatePaiment)
          : " - Waiting Payment"),

      iconColor: payment.step3State == 1 ? colors.secondary : colors.primary,
    },
    {
      index: 4,
      amount: payment.step4Amount,
      state: payment.step4State,
      percent: payment.step4Percentage,
      title: payment.step4Name,
      subtitle:
        payment.step4Amount +
        " $" +
        (payment.step4State == 1
          ? " - Paid on " + utils.getDateFormatted(payment.step4DatePaiment)
          : " - Waiting Payment"),

      iconColor: payment.step4State == 1 ? colors.secondary : colors.primary,
    },
    {
      index: 5,
      amount: payment.step5Amount,
      state: payment.step5State,
      title: payment.step5Name,
      percent: payment.step5Percentage,
      subtitle:
        payment.step5Amount +
        " $" +
        (payment.step5State == 1
          ? " - Paid on " + utils.getDateFormatted(payment.step5DatePaiment)
          : " - Waiting Payment"),

      iconColor: payment.step5State == 1 ? colors.secondary : colors.primary,
    },
    {
      index: 6,
      amount: payment.step6Amount,
      state: payment.step6State,
      title: payment.step6Name,
      percent: payment.step6Percentage,
      subtitle:
        payment.step6Amount +
        " $" +
        (payment.step6State == 1
          ? " - Paid on " + utils.getDateFormatted(payment.step6DatePaiment)
          : " - Waiting Payment"),

      iconColor: payment.step6State == 1 ? colors.secondary : colors.primary,
    },
    {
      index: 7,
      amount: payment.step7Amount,
      title: payment.step7Name,
      state: payment.step7State,
      percent: payment.step7Percentage,
      subtitle:
        payment.step7Amount +
        " $" +
        (payment.step7State == 1
          ? " - Paid on " + utils.getDateFormatted(payment.step7DatePaiment)
          : " - Waiting Payment "),

      iconColor: payment.step7State == 1 ? colors.secondary : colors.primary,
    },
    {
      index: 8,
      amount: payment.step8Amount,
      title: payment.step8Name,
      state: payment.step8State,
      percent: payment.step8Percentage,
      subtitle:
        payment.step8Amount +
        " $" +
        (payment.step8State == 1
          ? " - Paid on " + utils.getDateFormatted(payment.step8DatePaiment)
          : " - Waiting Payment"),

      iconColor: payment.step8State == 1 ? colors.secondary : colors.primary,
    },
  ];
};

export default PaymentScreen;
