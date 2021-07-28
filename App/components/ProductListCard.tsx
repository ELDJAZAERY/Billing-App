import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Card } from "react-native-elements";

export const ProductListCard = (props: ProductListCardPropsType) => {
  const { productLabel, price, quantity } = props.product;
  const navigate = props.navigate || (() => {});

  return (
    <Card>
      <Card.Title style={styles.title}>{productLabel}</Card.Title>
      <Card.Divider />
      <View style={[styles.container]}>
        <Text> Quantity : {quantity} </Text>
        <Text> Price : {price} </Text>
      </View>
      <Card.Divider />
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigate()}
        style={styles.buttonStyle}
      >
        <Text style={styles.appButtonText}> Show Details </Text>
      </TouchableOpacity>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    minWidth: "100%",
  },
  buttonStyle: {
    elevation: 8,
    color: "#009688",
    backgroundColor: "#009688",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginTop: 10,
  },
  appButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
