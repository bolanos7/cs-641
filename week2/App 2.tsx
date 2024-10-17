import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { ActivityIndicator } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Starting changes to the application!</Text>
      <StatusBar style="auto" />
      <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator />
        <ActivityIndicator size="large" />
        <ActivityIndicator size="small" color="#0000ff" />
        <ActivityIndicator size="large" color="#00ff00" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
});
