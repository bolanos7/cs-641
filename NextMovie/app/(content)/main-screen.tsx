import Trending from "../../components/movies/TrendingMovies";
import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Button,
} from "react-native";
const [favorites, setFavorites] = useState([]);
import TrendingMovies from "@/components/movies/TrendingMovies";
import PopularMovies from "@/components/movies/PopularMovies";
import TopRatedMovies from "@/components/movies/TopRated";
import UpcomingMovies from "@/components/movies/UpcomingMovies";
import InTheaterMovie from "@/components/movies/InTheaterMovies";
import { SignedIn, SignedOut, useAuth, useUser } from "@clerk/clerk-expo";
import LogoutButton from "@/components/ui/Logout";
import { Link, router } from "expo-router";
import { TMDB_API_KEY } from "../../utils/apikey";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function MainScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]); // Manage search results

  const handleSearch = async () => {
    if (!searchQuery.trim()) return; // Prevent empty search
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(
          searchQuery
        )}&language=en-US&page=1`
      );
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        const movie = data.results[0]; // Grab the first search result
        router.push(`/details?id=${movie.id}`); // Navigate to details page
      } else {
        console.error("No results found for the search query.");
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  const handleGenerateRandomMovie = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_API_KEY}&language=en-US&page=1`
      );
      const data = await response.json();
      const randomMovie =
        data.results[Math.floor(Math.random() * data.results.length)];
      router.push(`/details?id=${randomMovie.id}`);
    } catch (error) {
      console.error("Error fetching random movie:", error);
    }
  };

  const handleFavorites = async () => {
    try {
      const favoritesString = await AsyncStorage.getItem("favorites");
      const storedFavorites = favoritesString
        ? JSON.parse(favoritesString)
        : [];
      router.push({
        pathname: "/favorites",
        params: { favorites: storedFavorites },
      });
    } catch (error) {
      console.error("Error loading favorites:", error);
    }
  };

  return (
    <View style={styles.container}>
      <SignedIn>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.appName}>Next Movie</Text>
          <TextInput
            style={styles.searchBar}
            placeholder="Search..."
            placeholderTextColor="#aaa"
            value={searchQuery}
            onChangeText={(text) => setSearchQuery(text)}
            onSubmitEditing={handleSearch}
          />
          <TouchableOpacity onPress={handleFavorites}>
            <Image
              source={require("../../assets/images/app-icon.png")}
              style={styles.logo}
            />
          </TouchableOpacity>
        </View>

        {/* Main Content */}
        <ScrollView>
          <TouchableOpacity>
            <Text style={styles.generator} onPress={handleGenerateRandomMovie}>
              Generate Recommendation
            </Text>
          </TouchableOpacity>
          <TrendingMovies />
          <PopularMovies />
          <TopRatedMovies />
          <UpcomingMovies />
          <InTheaterMovie />
        </ScrollView>
        <LogoutButton />
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
    backgroundColor: "white",
    padding: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
    backgroundColor: "rgba(75,122,109,100)",
  },
  appName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    flex: 1,
  },
  searchBar: {
    flex: 2,
    padding: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#fff",
    fontSize: 16,
    marginHorizontal: 8,
  },
  logo: {
    width: 50,
    height: 50,
  },
  content: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: "#555",
  },
  generator: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: "rgba(0,240,9,100)",
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
});
function setSearchResults(arg0: any) {
  throw new Error("Function not implemented.");
}
