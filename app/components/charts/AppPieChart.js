import React from "react";
import { StyleSheet, Dimensions } from "react-native";
import { PieChart } from "react-native-chart-kit";

import colors from "../../config/colors";

function AppPieChart({ data, color = "primary" }) {
  return (
    <>
      <PieChart
        data={data}
        width={Dimensions.get("window").width - 20}
        height={220}
        chartConfig={{
          backgroundColor: colors[color],
          backgroundGradientFrom: colors[color],
          backgroundGradientTo: colors[color],
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
            paddingLeft: 20,
            marginLeft: 10,
          },
        }}
        accessor="accessor"
        backgroundColor="transparent"
        paddingLeft="15"
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default AppPieChart;
