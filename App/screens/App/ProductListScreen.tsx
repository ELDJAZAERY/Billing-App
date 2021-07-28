import * as React from "react";
import { ProductListCard } from "../../components/ProductListCard";
import { observer } from "mobx-react";
import { SectionList, StyleSheet, View } from "react-native";
import { ProductListStore } from "../../store/productListStore";
import { FlatList } from "react-native-gesture-handler";

const navigateToProductdetils = (navigation: any, product: Product) => {
  navigation.push("Product Details", {
    product,
  });
};

const ProductsListScreen = (props: any) => {
  // alert(JSON.stringify(ProductListStore.productList))

  const navigation = props?.navigation;

  const productList = ProductListStore.productList;

  const section = productList.map((product, index) => ({
    id: index,
    data: [product],
  }));

  return (
    <View style={styles.container}>
      <SectionList
        sections={section}
        keyExtractor={(product: Product) => product.productLabel}
        ItemSeparatorComponent={() => <View style={[styles.separator]} />}
        renderItem={({ item }) => (
          <ProductListCard
            product={item as Product}
            navigate={() =>
              navigateToProductdetils(navigation, item as Product)
            }
          />
        )}
      />
    </View>
  );
};

export default observer(ProductsListScreen);

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
