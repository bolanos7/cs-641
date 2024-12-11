import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { Link } from "expo-router";

export default function WelcomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Next Movie</Text>
      <Text style={styles.subtitle}>Please sign in or sign up to continue</Text>
      <Link href="/sign-in" asChild>
        <Button title="Sign In" />
      </Link>
      <Link href="/sign-up" asChild>
        <Button title="Sign Up" />
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },

  title: { fontSize: 24, fontWeight: "bold", marginBottom: 16, color: "red" },

  subtitle: { fontSize: 16, marginBottom: 32, color: "red" },
});
