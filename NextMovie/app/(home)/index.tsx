import React from "react";
import { View, Text, Button, StyleSheet, Image } from "react-native";
import { Link, router } from "expo-router";
import { useUser, useAuth, SignedOut, SignedIn } from "@clerk/clerk-expo";

export default function HomeScreen() {
  const { user } = useUser();
  const { signOut } = useAuth();

  const handleLogout = async () => {
    try {
      // Sign out from Clerk
      await signOut();
      router.replace("/");
      //redirect to sign-in here

      // Router will automatically redirect to sign-in due to auth layout
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <View style={styles.container}>
      <SignedIn>
        <Image
          style={styles.logo}
          source={require("../../assets/images/app-icon.png")}
        />
        <Text>Welcome Back {user?.emailAddresses[0].emailAddress} !</Text>

        <View style={styles.buttons}>
          <Link href="/(content)/main-screen">
            <Button title="Go to Main Screen" />
          </Link>
        </View>

        <Button onPress={handleLogout} title="Sign Out" />
      </SignedIn>
      <SignedOut>
        <Image
          style={styles.logo}
          source={require("../../assets/images/app-icon.png")}
        />
        <Text style={styles.title}>Welcome to Next Movie</Text>
        <Link href="/(auth)/sign-in">
          <Text style={styles.buttons}>Sign In</Text>
        </Link>
        <Link href="/(auth)/sign-up">
          <Text style={styles.buttons}>Sign up</Text>
        </Link>
      </SignedOut>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "rgba(75,122,109,100)",
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: "00F009",
  },

  buttons: {
    fontSize: 20,
    margin: 25,
    color: "rgba(0,240,9,100)",
  },
  logo: {
    width: 250,
    height: 200,
    marginBottom: 16,
  },
});
