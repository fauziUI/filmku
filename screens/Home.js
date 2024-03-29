import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FlatList,
  SafeAreaView,
  Text,
  TouchableHighlight,
  View,
  Image,
  TextInput,
} from "react-native";

import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";

function HomeScreen({ navigation }) {
  const router = useNavigation();
  const api_key = "ba82b88c5b4fcea526c30b9880372170";
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState("");
  const [page, setPage] = useState(1);

  let dataFilter = data;

  dataFilter = dataFilter.filter((e) => {
    return e.name.toLowerCase().includes(filter.toLowerCase());
  });

  useEffect(() => {
    navigation.setOptions({
      headerTitleAlign: "center",
      headerTitle: () => <Text className="text-3xl py-4">TV Show</Text>,
    });
    axios
      .get("https://api.themoviedb.org/3/tv/popular/", {
        params: { api_key },
      })
      .then((res) => {
        setPage(page + 1);
        setData([...data, ...res.data.results]);
      })
      .catch((err) => console.log(err, "ERROR"));
  }, [api_key]);

  const loadMore = () => {
    axios
      .get("https://api.themoviedb.org/3/tv/popular/", {
        params: { api_key, page },
      })
      .then((res) => {
        setPage(page + 1);
        setData([...data, ...res.data.results]);
        dataFilter = data;
      })
      .catch((err) => console.log(err, "ERROR"));
  };

  const renderItem = ({ item }) => {
    return (
      <TouchableHighlight
        onPress={() => {
          router.navigate("Details", {
            id: item.id,
          });
        }}
        underlayColor="white"
      >
        <View className="flex-row justify-between items-start m-1 p-1 border-b ">
          <Image
            className="w-[100] h-[100]"
            source={{
              uri: `https://image.tmdb.org/t/p/original${item.poster_path}`,
            }}
          />
          <View className="w-48">
            <Text className="font-bold text-2xl">{item.name}</Text>
            <Text className="text-lg">{item.first_air_date}</Text>
          </View>
          <Text className="text-white bg-green-700 text-center py-1 w-8">
            {item.vote_average}
          </Text>
        </View>
      </TouchableHighlight>
    );
  };

  return (
    <SafeAreaView>
      <StatusBar backgroundColor="transparent" />
      <TextInput
        className="border border-gray-500 m-2 rounded-lg text-center bg-white"
        onChangeText={(e) => setFilter(e)}
        value={filter}
        placeholder="🔍  Search TV Show"
      />
      <FlatList
        keyboardDismissMode={(item) => item}
        data={dataFilter}
        renderItem={renderItem}
        className="mb-12"
        onEndReached={loadMore}
        keyExtractor={(item, index) => String(index)}
      />
    </SafeAreaView>
  );
}

export default HomeScreen;
