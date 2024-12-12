import { Stack } from "expo-router";

export default function ContentLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false, // Customize headers if needed
      }}
    >
      <Stack.Screen name="main-screen" />
      <Stack.Screen name="details" />
    </Stack>
  );
}
