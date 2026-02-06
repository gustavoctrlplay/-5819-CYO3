import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import Clima from "../../components/ui/Clima";
export default function HomeScreen() {
  const [cityName, setCityName] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function searchWeather() {
    if (!cityName.trim()) {
      setError("Informe uma cidade válida!");
      setWeather(null);
      return;
    }

    setLoading(true);
    setError(null);
    setWeather(null);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=6fa075125c2a4a329ff707c1f429ddf0&units=metric&lang=pt`,
      );

      if (!response.ok) {
        if (response.status === 404) {
          setError("404 - NOT FOUND");
        } else {
          setError("Aconteceu um erro. Tente novamente mais tarde.");
        }
      }
      const data = await response.json();
      setWeather({
        name: data.name,
        temperature: data.main.temp,
        description: data.weather[0].description,
        icon: `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`,
      });
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
      console.log(weather);
    }
  }

  return (
    <View
      style={{
        backgroundColor: "#66eff5",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <FontAwesome5 name="cloud-sun-rain" size={60} color="#054548" />
      <Text style={{ color: "#054548", fontSize: 24, fontWeight: "bold" }}>
        PREVISÃO DO TEMPO!!!!
      </Text>
      <View
        style={{
          width: "90%",
          backgroundColor: "#ecfdfe",
          padding: 10,
          borderRadius: 5,
          marginTop: 10,
        }}
      >
        <TextInput
          style={{
            backgroundColor: "#ecfdfe",
            borderRadius: 5,
            borderColor: "#054548",
            borderWidth: 2,
          }}
          onChangeText={(text) => setCityName(text)}
          placeholder="Informe uma cidade.."
        />
        <TouchableOpacity
          style={{
            backgroundColor: "#054548",
            padding: 15,
            width: "50%",
            alignItems: "center",
            marginTop: 15,
          }}
          onPress={searchWeather}
        >
          <Text style={{ color: "#ecfdfe" }}>Pesquisar clima</Text>
        </TouchableOpacity>
      </View>
      {weather && <Clima weather={weather} />}
      {error && <Text style={{ color: "red" }}>{error}</Text>}
      {loading && <Text style={{ color: "blue" }}>Carregando...</Text>}
    </View>
  );
}
