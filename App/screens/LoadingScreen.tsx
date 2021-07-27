import React from "react"
import { Text } from "react-native";
import { View, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export const LoadingScreen = () => (
  <View style={styles.container}>
    <Text>Loading...</Text>
  </View>
);

export default LoadingScreen;
