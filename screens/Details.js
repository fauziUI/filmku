import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  SafeAreaView,
  Text,
  ScrollView,
  View,
  Image,
  TouchableHighlight,
} from "react-native";

import { StatusBar } from "expo-status-bar";

function DetailsScreen({ route, navigation }) {
  const api_key = "ba82b88c5b4fcea526c30b9880372170";
  const [data, setData] = useState({});

  useEffect(() => {
    // console.log(route.params.id);
    axios
      .get(`https://api.themoviedb.org/3/tv/${route.params.id}`, {
        params: { api_key },
      })
      .then((res) => {
        // console.log(res.data.seasons);
        navigation.setOptions({
          header: () => (
            <View className="relative">
              <TouchableHighlight
                className="absolute top-16 z-10"
                onPress={navigation.goBack}
              >
                <Text className="text-white font-extrabold text-6xl">←</Text>
              </TouchableHighlight>
              <Image
                className="w-full h-[200]"
                source={{
                  uri: `https://image.tmdb.org/t/p/original/${res.data.backdrop_path}`,
                }}
              />
            </View>
          ),
        });
        setData(res.data);
      })
      .catch((err) => console.log(err, "ERROR"));
  }, [api_key]);

  return (
    <SafeAreaView>
      <ScrollView>
        <StatusBar backgroundColor="transparent" />
        <Text className="font-bold text-4xl p-3">{data.name}</Text>
        <Text className="text-lg px-3">{data.overview}</Text>
        <Text className="font-bold text-3xl p-3">Season</Text>
        {data.seasons?.map((e, i) => {
          return (
            <View key={i} className="flex-row w-full items-start m-1 p-1 border-b ">
              <Image
                className="w-[100] h-[150]"
                source={{
                  uri: `https://image.tmdb.org/t/p/original${e.poster_path}`,
                }}
              />
              <View className="w-56 px-4">
                <Text className="font-bold text-2xl">{e.name}</Text>
                <Text className="text-lg font-medium mb-1">
                  {e.air_date?.substring(0, 4)} | {e.episode_count} Episode
                </Text>
                <Text className="text-lg">{e.overview}</Text>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

export default DetailsScreen;
