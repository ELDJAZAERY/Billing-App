import { makeObservable, observable, computed, action } from "mobx";
import { getData, storeData } from "../data";

const discountRate = 0.03;
const taxRate = 0.06;

class ProductList {
  productList: Product[] = [];
  totlaPriceWithoutTax: number = 0;
  discount: number = 0;
  tax: number = 0;
  totalPrice: number = 0;

  constructor() {
    // mobx linking map
    makeObservable(this, {
      // observable
      productList: observable,
      totlaPriceWithoutTax: observable,
      discount: observable,
      tax: observable,
      totalPrice: observable,

      // actions
      addProduct: action,
      deleteProduct: action,
      updateBill: action,

      // computed
      count: computed,
    });

    // get stored token
    getData("productList").then((data) => {
      try {
        const list = JSON.parse(`${data}`);
        if (Array.isArray(list)) {
          this.productList = list;
          this.updateBill();
        }
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

    // update the billing amount
    this.updateBill();
  };

  deleteProduct = (product: Product) => {
    this.productList = this.productList.filter(
      (p) => p.productLabel === product.productLabel
    );

    // persisting product list
    storeData("productList", JSON.stringify(this.productList));

    // update the billing amount
    this.updateBill();
  };

  updateBill = () => {
    let totlaPriceWithoutTax = 0;

    this.productList.forEach((p) => {
      totlaPriceWithoutTax += p.price * p.quantity;
    });

    this.totlaPriceWithoutTax = Number.parseFloat(
      totlaPriceWithoutTax.toFixed(2)
    );
    this.discount = Number.parseFloat(
      (totlaPriceWithoutTax * discountRate).toFixed(2)
    );
    this.tax = Number.parseFloat((totlaPriceWithoutTax * taxRate).toFixed(2));
    this.totalPrice = Number.parseFloat(
      (totlaPriceWithoutTax + this.tax - this.discount).toFixed(2)
    );
  };

  get count() {
    return this.productList.length;
  }
}

export const ProductListStore = new ProductList();
