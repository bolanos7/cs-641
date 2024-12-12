import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Button,
  TouchableOpacity,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { TMDB_API_KEY } from "@/utils/apikey";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function MovieDetails() {
  const { id } = useLocalSearchParams(); // Get the movie ID from the URL
  const [movie, setMovie] = useState<any>(null);
  const [savedMovies, setSavedMovies] = useState<any[]>([]);

  useEffect(() => {
    if (id) {
      // Replace YOUR_API_KEY with your TMDb API key
      fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${TMDB_API_KEY}`)
        .then((response) => response.json())
        .then((data) => setMovie(data))
        .catch((error) => console.error(error));
    }
  }, [id]);

  const handleSaveMovie = async () => {
    if (movie) {
      try {
        const favorites = await AsyncStorage.getItem("favorites");
        const existingFavorites = favorites ? JSON.parse(favorites) : [];
        const updatedFavorites = [...existingFavorites, movie];
        await AsyncStorage.setItem(
          "favorites",
          JSON.stringify(updatedFavorites)
        );
      } catch (error) {
        console.error("Error saving favorite:", error);
      }
    }
  };

  if (!movie) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
        style={styles.poster}
      />
      <View style={styles.card}>
        <Text style={styles.title}>{movie.title}</Text>
        <Text style={styles.overview}>{movie.overview}</Text>
        <Text style={styles.details}>Release Date: {movie.release_date}</Text>
        <Text style={styles.details}>Rating: {movie.vote_average}</Text>
        <TouchableOpacity>
          <Text onPress={handleSaveMovie} style={styles.buttons}>
            Save to Favorites
          </Text>
        </TouchableOpacity>
        <Button title="Back" onPress={() => router.back()} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f8",
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f4f4f8",
  },
  poster: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: 300,
    resizeMode: "contain",
    borderRadius: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
  },
  overview: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 16,
    textAlign: "justify",
  },
  details: {
    fontSize: 16,
    marginBottom: 8,
  },
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    padding: 15,
    borderRadius: 10,
    marginBottom: 16,
    marginHorizontal: 20,
    alignItems: "center",
  },
  buttons: {
    fontSize: 20,
    margin: 25,
    color: "rgba(0,240,9,100)",
  },
});
