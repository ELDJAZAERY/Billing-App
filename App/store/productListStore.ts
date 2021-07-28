import { makeObservable, observable, computed, action } from "mobx";
import { getData, storeData } from "../data";

class ProductList {
  productList: Product[] = [];

  constructor() {
    // mobx definition map
    makeObservable(this, {
      productList: observable,
      addProduct: action,
      deleteProduct: action,
      count: computed,
    });

    // get stored token
    getData("productList").then((data) => {
      try {
        const list = JSON.parse(`${data}`);
        if (Array.isArray(list)) this.productList = list;
      } catch {}
    });
  }

  addProduct = (newProduct: Product) => {
    // check if exist a product with same label
    const alreadyExistProduct = this.productList.find((product) => {
      // check by label
      const isSameProduct = product.productLabel === newProduct.productLabel;

      // update alreay exist product
      if (isSameProduct) {
        // update product quantity
        product.quantity += product.quantity;

        // update product price
        product.price = product.price;
      }

      return isSameProduct;
    });

    if (!alreadyExistProduct)
      // add new product
      this.productList.push(newProduct);

    // persisting product list
    storeData("productList", JSON.stringify(this.productList));
  };

  deleteProduct = (product: Product) => {
    this.productList = this.productList.filter(
      (p) => p.productLabel === product.productLabel
    );

    // persisting product list
    storeData("productList", JSON.stringify(this.productList));
  };

  get count() {
    return this.productList.length;
  }
}

export const ProductListStore = new ProductList();
