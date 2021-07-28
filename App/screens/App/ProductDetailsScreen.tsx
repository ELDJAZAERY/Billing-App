import * as React from "react";
import { observer } from "mobx-react";
import { StyleSheet, Text, View } from "react-native";
import { ProductListStore } from "../../store/productListStore";

export const ProductDetailsScreen = () => {
  const productList: Product[] = ProductListStore.productList;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab Tow</Text>
      <View style={styles.separator} />
      <Text> Product Details Screen </Text>
      {productList.map((product) => {
        <Text> product : {product} </Text>;
      })}
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
});

export default observer(ProductDetailsScreen);
