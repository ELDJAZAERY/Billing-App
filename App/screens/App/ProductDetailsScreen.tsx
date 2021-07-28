import React from "react";
import { observer } from "mobx-react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Card } from "react-native-elements";
import { ProductListStore } from "../../store/productListStore";

const ProductDetailsScreen = (props: any) => {
  const navigation = props?.navigation;
  const product = props?.route?.params?.product as Product;

  const { productLabel, price, quantity } = product;

  return (
    <View  style={[styles.container]}>
      <Card>
        <Card.Title style={styles.title}>{productLabel}</Card.Title>
        <Card.Divider />
        <View  style={[styles.container]}>
          <Text> Quantity : {quantity} </Text>
          <Text> Price : {price} </Text>
        </View>
        <Card.Divider />
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.buttonStyle}
          onPress={() => {
            ProductListStore.deleteProduct(product);
            navigation.goBack();
          }}
        >
          <Text style={styles.appButtonText}> Remove </Text>
        </TouchableOpacity>
      </Card>
    </View>
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
    backgroundColor: "#D63B1A",
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

export default observer(ProductDetailsScreen);
