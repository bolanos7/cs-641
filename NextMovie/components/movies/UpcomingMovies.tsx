import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { fetchUpcomingMovies } from "../../utils/moviesapi";
import { useRouter } from "expo-router";

export default function UpcomingMovies() {
  const [movies, setMovies] = useState<{ id: number; poster_path: string }[]>(
    []
  );
  const router = useRouter();

  useEffect(() => {
    const getMovies = async () => {
      try {
        const data = await fetchUpcomingMovies();
        setMovies(data.results);
      } catch (error) {
        console.error("Error fetching upcoming movies:", error);
      }
    };

    getMovies();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upcoming Movies</Text>
      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => router.push(`/details?id=${item.id}`)}
            style={styles.card}
          >
            <Image
              source={{
                uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
              }}
              style={styles.poster}
            />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
  },
  card: {
    marginRight: 8,
  },
  poster: {
    width: 120,
    height: 180,
    borderRadius: 8,
  },
});
