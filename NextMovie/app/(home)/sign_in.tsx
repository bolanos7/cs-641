import React from "react";
import { View, StyleSheet } from "react-native";
import { SignIn } from "@clerk/clerk-expo";

export default function SignInScreen() {
  return (
    <View style={styles.container}>
      <SignIn
        signUpUrl="/sign-up"
        afterSignInUrl="/(movie)/index"
        afterSignUpUrl="/(movie)/index"
      />
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
});
