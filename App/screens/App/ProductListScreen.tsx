import * as React from "react";
import { observer } from "mobx-react";
import { StyleSheet, Text, View } from "react-native";
import { ProductListStore } from "../../store/productListStore";

const ProductsListScreen = () => {
  const productList: Product[] = ProductListStore.productList;

  alert(JSON.stringify(ProductListStore.productList))

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab Tow</Text>
      <View style={styles.separator} />
      <Text> Products List Screen </Text>
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

export default observer(ProductsListScreen);
