import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  View,
  FlatList,
  Text,
  Image,
  StyleSheet,
  Button,
  TouchableOpacity,
} from "react-native";
import { router } from "expo-router";

export default function Favorites() {
  const [favorites, setFavorites] = useState<
    { id: number; poster_path?: string; title?: string }[]
  >([]);

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const storedFavorites = await AsyncStorage.getItem("favorites");
        const parsedFavorites = storedFavorites
          ? JSON.parse(storedFavorites)
          : [];
        console.log("Loaded favorites:", parsedFavorites);
        setFavorites(parsedFavorites);
      } catch (error) {
        console.error("Error loading favorites:", error);
      }
    };
    loadFavorites();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Favorites</Text>
      {favorites.length > 0 ? (
        <FlatList
          data={favorites}
          keyExtractor={(item, index) =>
            item?.id ? item.id.toString() : index.toString()
          }
          renderItem={({ item }) => (
            <View style={styles.item}>
              <View style={styles.item}>
                <TouchableOpacity
                  onPress={() => router.push(`/details?id=${item.id}`)}
                >
                  {item.poster_path && (
                    <Image
                      source={{
                        uri: `https://image.tmdb.org/t/p/w200${item.poster_path}`,
                      }}
                      style={styles.poster}
                    />
                  )}
                  <Text style={styles.movieTitle}>
                    {item.title || "Unknown Title"}
                  </Text>
                </TouchableOpacity>
              </View>
              <View>
                <Button
                  title="Delete"
                  onPress={() => {
                    const updatedFavorites = favorites.filter(
                      (favorite) => favorite.id !== item.id
                    );
                    setFavorites(updatedFavorites);
                    AsyncStorage.setItem(
                      "favorites",
                      JSON.stringify(updatedFavorites)
                    );
                  }}
                />
              </View>
            </View>
          )}
        />
      ) : (
        <Text style={styles.noFavorites}>No favorites yet.</Text>
      )}
      <Image
        source={require("../../assets/images/app-icon.png")}
        style={styles.logo}
      />
      <Button title="Go Back" onPress={() => router.back()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "rgba(75,122,109,100)",
  },
  logo: {
    width: 200,
    height: 200,
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -100 }, { translateY: -100 }],
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 16,
    color: "rgba(0,240,9,100)",
    fontFamily: "cursive",
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  poster: {
    width: 100,
    height: 100,
    marginRight: 40,
  },
  movieTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  noFavorites: {
    fontSize: 16,
    textAlign: "center",
    color: "#aaa",
  },
});
