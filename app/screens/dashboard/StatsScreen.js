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
        <View style={[styles.headerSeparator, { width: "25%" }]} />
        <View style={styles.headerView}>
          <View style={styles.headerCard}>
            <AppText style={styles.textCardHeader}>Total</AppText>
            <AppText style={styles.textCardHeader}>Revenue</AppText>
            <AppText style={styles.textCardPrice}>$11,325,160</AppText>
          </View>

          <View style={styles.headerCard}>
            <AppText style={styles.textCardHeader}>Total</AppText>
            <AppText style={styles.textCardHeader}>Profit</AppText>
            <AppText style={styles.textCardPrice}>$11,325,160 $</AppText>
          </View>
        </View>

        {/* Last 6 month Revenues*/}
        <AppText style={styles.sectionHeader}>Last 6 months Revenues</AppText>
        <View style={[styles.headerSeparator, { width: "48%" }]} />
        <AppLineChart data={chartsData.lastMonthsLineChartData} />
        <AppPieChart data={chartsData.lastMonthsPieChartData} />

        {/* Last 6 years Revenues*/}
        <AppText style={styles.sectionHeader}>Last 6 Years Revenues</AppText>
        <View style={[styles.headerSeparator, { width: "44%" }]} />
        <AppBarChart data={chartsData.lastYearsBarChartData} />
        <AppPieChart data={chartsData.lastYearsPieChartData} />

        {/* Last 6 month Projects*/}
        <AppText style={styles.sectionHeader}>Last 6 months Projects</AppText>
        <View style={[styles.headerSeparator, { width: "45%" }]} />
        <AppLineChart data={chartsData.lastMonthsProjectsLineChartData} />
        <AppPieChart data={chartsData.lastMonthsProjectsPieChartData} />

        {/* Last 6 years Revenues*/}
        <AppText style={styles.sectionHeader}>Last 6 Years Projects</AppText>
        <View style={[styles.headerSeparator, { width: "41%" }]} />
        <AppBarChart
          data={chartsData.lastYearsProjectsBarChartData}
          yAxisLabel=""
        />
        <AppPieChart data={chartsData.lastYearsProjectsPieChartData} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 10 },
  headerText: {
    fontWeight: "bold",
    fontFamily: "Roboto",
    fontSize: 20,
    marginTop: 15,
    color: "#6c6c6c",
  },
  headerSeparator: {
    width: "50%",
    height: 2,
    backgroundColor: colors.light,
    marginTop: 10,
    marginBottom: 25,
  },
  sectionHeader: {
    fontSize: 16,
    fontFamily: "Roboto",
    color: "#6c6c6c",
    marginTop: 40,
  },
  headerView: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerCard: {
    borderWidth: 0.5,
    padding: 10,
    borderRadius: 5,
    width: "45%",
    borderColor: "#d6d8db",
    height: 108,
  },
  textCardHeader: {
    color: "#d6d8db",
    fontFamily: "Roboto",
    alignSelf: "center",
  },
  textCardPrice: {
    color: colors.secondary,
    marginTop: 10,
    alignSelf: "center",
  },
});

export default StatsScreen;
