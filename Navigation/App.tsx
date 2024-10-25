import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>This is the home screen!</Text>
      <Button
        title="Go to Setting"
        onPress={() => navigation.navigate("Setting")}
      />
    </View>
  );
}

function Setting({ navigation }) {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Setting" component={Setting} />
      <Stack.Screen name="MyDrawer" component={MyDrawer} />
    </Stack.Navigator>
  );
}

function feed({ navigation }) {
  return (
    <View style={styles.container}>
      <Button title="Feed" onPress={() => navigation.navigate("Home")} />
    </View>
  );
}

function article({ navigation }) {
  return (
    <View style={styles.container}>
      <Button title="Article" onPress={() => navigation.navigate("Home")} />
    </View>
  );
}

function MyDrawer() {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Setting" component={Setting} />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Setting" component={Setting} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
