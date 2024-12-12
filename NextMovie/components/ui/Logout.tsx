import { useAuth } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { Button } from "react-native";

export default function LogoutButton() {
  const { signOut } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut();
      router.replace("/(auth)/sign-in"); // Redirect to the login screen
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return <Button title="Log Out" onPress={handleLogout} />;
}
