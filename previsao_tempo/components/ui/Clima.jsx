import { Image, Text, View } from "react-native";

export default function Clima({ weather }) {
  console.log(weather);
  return (
    <View
      style={{
        backgroundColor: "#ecfdfe",
        marginTop: 10,
        padding: 10,
        alignItems: "center",
      }}
    >
      <Text style={{ fontSize: 36, fontWeight: "bold", color: "#054548" }}>
        {weather.name}
      </Text>
      <Text style={{ fontSize: 24, fontWeight: "bold", color: "#054548" }}>
        {weather.temperature}
      </Text>
      <Text style={{ fontSize: 16, color: "#054548" }}>
        {weather.description}
      </Text>
      <Image source={{ uri: weather.icon }} width={50} height={50} />
    </View>
  );
}
