import React from "react";
import { View, StyleSheet, Image, TouchableHighlight } from "react-native";

import Text from "../../components/Text";
import colors from "../../config/colors";

function PaymentListItem({ title, subTitle, image, price, style }) {
  return (
    <TouchableHighlight underlayColor={colors.light}>
      <View style={[styles.containerCard, style]}>
        <Image style={styles.image} source={image} />
        <View style={styles.detailsContainer}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
          <Text style={styles.subTitle} numberOfLines={2}>
            {subTitle}
          </Text>
        </View>
        <Text style={styles.price} numberOfLines={2}>
          {price}
        </Text>
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  containerCard: {
    alignItems: "center",
    flexDirection: "row",
    padding: 15,
    backgroundColor: colors.white,
  },
  detailsContainer: {
    flex: 1,
    marginLeft: 10,
    justifyContent: "center",
    width: 12,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 35,
  },
  subTitle: {
    color: colors.medium,
    fontSize: 14,
  },
  title: {
    fontWeight: "500",
    fontSize: 16,
  },
  price: {
    color: colors.secondary,
    fontSize: 15,
  },
});

export default PaymentListItem;
