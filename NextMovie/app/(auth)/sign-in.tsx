import { useSignIn } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import { Text, TextInput, Button, View, StyleSheet } from "react-native";
import React from "react";

export default function Page() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");

  const onSignInPress = React.useCallback(async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      });

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/(content)/main-screen");
      } else {
        // See https://clerk.com/docs/custom-flows/error-handling
        // for more info on error handling
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
    }
  }, [isLoaded, emailAddress, password]);

  return (
    <View style={styles.container}>
      <TextInput
        autoCapitalize="none"
        value={emailAddress}
        placeholder="Email..."
        onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
        style={styles.input}
      />
      <TextInput
        value={password}
        placeholder="Password..."
        secureTextEntry={true}
        onChangeText={(password) => setPassword(password)}
        style={styles.input}
      />
      <Button
        title="Sign In"
        onPress={onSignInPress}
        color={"rgba(0,240,9,100)"}
      />

      <View style={styles.signup}>
        <Text style={styles.subtitle}>Don't have an account?</Text>
        <Link href="/sign-up">
          <Button title="Sign Up" color={"rgba(0,240,9,100)"} />
        </Link>
      </View>
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
  signup: {
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "rgba(75,122,109,100)",
  },

  input: {
    width: "90%",
    padding: 12,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#fff",
    fontSize: 16,
    color: "#333",
  },

  subtitle: { fontSize: 20, marginBottom: 20 },
  buttons: {
    fontSize: 20,
    margin: 25,
    color: "rgba(0,240,9,100)",
  },
});
