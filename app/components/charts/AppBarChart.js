import React from "react";
import { StyleSheet, Dimensions } from "react-native";
import { BarChart } from "react-native-chart-kit";

function AppBarChart({
  graphStyle,
  data,
  color = "#e0515d",
  yAxisLabel = "M ",
}) {
  return (
    <BarChart
      style={graphStyle}
      data={data}
      width={Dimensions.get("window").width - 20}
      height={230}
      yAxisLabel={yAxisLabel}
      chartConfig={{
        backgroundColor: color,
        backgroundGradientFrom: color,
        backgroundGradientTo: color,
        decimalPlaces: 0,
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        style: {
          borderRadius: 16,
        },
      }}
      style={{
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,

        elevation: 10,
      }}
      showBarTops={true}
    />
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default AppBarChart;
