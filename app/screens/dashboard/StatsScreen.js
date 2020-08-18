import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";

import colors from "../../config/colors";
import AppLineChart from "../../components/charts/AppLineChart";
import AppText from "../../components/Text";
import chartsData from "./chartsData";
import AppPieChart from "../../components/charts/AppPieChart";
import AppBarChart from "../../components/charts/AppBarChart";

function StatsScreen(props) {
  return (
    <ScrollView>
      <View style={styles.container}>
        {/* Header */}
        <AppText style={styles.headerText}>Overview</AppText>
        <View style={styles.headerSeparator} />

        {/* Last 6 month */}
        <AppText style={styles.sectionHeader}>Last 6 months</AppText>
        <AppLineChart data={chartsData.lastMonthsLineChartData} />
        <AppPieChart data={chartsData.lastMonthsPieChartData} />
        <View style={styles.headerSeparator} />

        {/* Last 6 years */}
        <AppText style={styles.sectionHeader}>Last 6 Years</AppText>
        {/* <AppBarChart data={chartsData.lastYearsBarChartData} /> */}
        <AppPieChart
          data={chartsData.lastMonthsPieChartData}
          accessor="revenue"
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 10 },
  headerText: {
    fontWeight: "bold",
    fontSize: 20,
    fontFamily: "Roboto",
    marginVertical: 10,
  },
  headerSeparator: {
    width: "100%",
    height: 2,
    backgroundColor: colors.light,
    marginBottom: 15,
  },
  sectionHeader: {
    fontSize: 16,
    fontFamily: "Roboto",
    marginVertical: 5,
    textAlign: "right",
  },
});

export default StatsScreen;
