import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Dimensions,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";

const PatientDetails = () => {
  const params = useLocalSearchParams();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "medicines", title: "Medicines" },
    { key: "games", title: "Games" },
    { key: "activity", title: "Activity" },
  ]);

  // Medicines Tab Content
  const MedicinesTab = () => (
    <View style={styles.tabContainer}>
      <FlatList
        data={[]}
        contentContainerStyle={styles.flatListContainer}
        renderItem={({ item }) => <View></View>}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No medicines added.</Text>
        }
      />
      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>+ Add Medicine</Text>
      </TouchableOpacity>
    </View>
  );

  // Games Tab Content
  const GamesTab = () => (
    <View style={styles.tabContainer}>
      <FlatList
        data={[]}
        contentContainerStyle={styles.flatListContainer}
        renderItem={({ item }) => <View></View>}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No games added.</Text>
        }
      />
      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>+ Add Game</Text>
      </TouchableOpacity>
    </View>
  );

  // Activity Tab Content
  const ActivityTab = () => (
    <View style={styles.tabContainer}>
      <Text style={styles.emptyText}>
        Activity report will be displayed here.
      </Text>
    </View>
  );

  const renderScene = SceneMap({
    medicines: MedicinesTab,
    games: GamesTab,
    activity: ActivityTab,
  });

  // Custom Tab Bar
  const renderTabBar = (props) => (
    <TabBar
      {...props}
      style={styles.tabBar}
      renderLabel={({ route, focused }) => (
        <View
          style={[
            styles.tabLabelContainer,
            { backgroundColor: focused ? "#6a1b9a" : "#C485F7" },
          ]}
        >
          <Text style={styles.tabLabel}>{route.title}</Text>
        </View>
      )}
      indicatorStyle={styles.indicator}
    />
  );

  return (
    <LinearGradient
      colors={["#C485F7", "#9459C6", "#662F97"]}
      style={styles.gradientBackground}
    >
      <View style={styles.userInfo}>
        <Text style={styles.headerText}>Patient Details</Text>
        <View style={styles.userInfoItem}>
          <Text style={styles.infoKey}>Name:</Text>
          <Text style={styles.infoValue}>{params.name}</Text>
        </View>
        <View style={styles.userInfoItem}>
          <Text style={styles.infoKey}>DOB:</Text>
          <Text style={styles.infoValue}>{params.dob}</Text>
        </View>
        <View style={styles.userInfoItem}>
          <Text style={styles.infoKey}>Gender:</Text>
          <Text style={styles.infoValue}>{params.gender}</Text>
        </View>
      </View>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: Dimensions.get("window").width }}
        renderTabBar={renderTabBar} // Custom Tab Bar
        style={styles.tabView}
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradientBackground: {
    flex: 1,
  },
  userInfo: {
    margin: 16,
    padding: 16,
    borderRadius: 10,
    backgroundColor: "rgba(255, 255, 255, 0.9)", // Semi-transparent white background
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#38006b",
    marginBottom: 10,
    textAlign: "center",
  },
  userInfoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 8,
  },
  infoKey: {
    fontSize: 16,
    color: "#38006b",
    fontWeight: "bold",
  },
  infoValue: {
    fontSize: 16,
    color: "#000",
  },
  tabView: {
    flex: 1,
    marginTop: 10,
  },
  tabContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  flatListContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
  emptyText: {
    fontSize: 18,
    color: "#fff",
    textAlign: "center",
  },
  addButton: {
    marginBottom: 8,
    marginHorizontal: 8,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: "#6a1b9a", // Purple background color for the button
    elevation: 2,
    alignSelf: "stretch",
  },
  addButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  tabBar: {
    backgroundColor: "transparent", // Transparent background to blend with gradient
    elevation: 0, // Remove shadow
  },
  tabLabelContainer: {
    borderRadius: 16,
    paddingVertical: 6,
    paddingHorizontal: 20,
  },
  tabLabel: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff", // White text color for contrast
  },
  indicator: {
    height: 1,
  },
});

export default PatientDetails;
