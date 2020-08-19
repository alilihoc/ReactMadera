import React from "react";
import { StyleSheet, Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";

function AppLineChart({ data, color = "#e0515d" }) {
  return (
    <>
      <LineChart
        data={data}
        width={Dimensions.get("window").width - 20}
        height={220}
        chartConfig={{
          backgroundColor: color,
          backgroundGradientFrom: color,
          backgroundGradientTo: color,
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
            paddingLeft: 20,
            marginLeft: 10,
          },
        }}
        bezier
        style={{
          marginVertical: 8,
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
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default AppLineChart;
