import React, { useContext } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AuthContext } from "../../contexts/AuthContext";

const SettingsScreen = () => {
  // Auth context
  const auth: AuthContextType = useContext<AuthContextType>(AuthContext);

  const onLogoutFnction = () => {
    auth.logout();
  };

  return (
    <View style={styles.container}>
      <View style={styles.separator} />
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onLogoutFnction}
        style={styles.appButtonContainer}
      >
        <Text style={styles.appButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  appButtonContainer: {
    elevation: 8,
    backgroundColor: "#009688",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  appButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
  },
});

export default SettingsScreen;
