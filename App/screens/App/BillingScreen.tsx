import React, { useState, useRef, useContext } from "react";
import { observer } from "mobx-react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import { FontAwesome, Feather } from "@expo/vector-icons";
import colors from "../../constants/Colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { ProductListStore } from "../../store/productListStore";

const FormValidator = require("validate-form-in-expo-style");

const { Form, InputText } = FormValidator as any;

// initial value for ProductForm fields
const initialformData: BillingDataForm = {
  productLabel: "",
  quantity: 0,
  price: 0,
};

const BillingScreen = () => {

  /** Form Data state */
  const [formData, setFormData] = useState<BillingDataForm>(initialformData);

  const FormRef = useRef();

  /** Handle form field update  */
  const handleChange = (
    key: "productLabel" | "quantity" | "price",
    value: string | number
  ) => {
    setFormData((data: BillingDataForm) => ({
      /** Old data with the updated one  */
      ...data,
      [key]: value,
    }));
  };

  /** Handle submit form  */
  const SubmitForm = () => {
    // add this product to the global list
    ProductListStore.addProduct(formData);

    // reset ProductForm
    setFormData(initialformData);
  };

  const handleSubmit = async () => {
    // if not a valid Form do not fetch the Billing server
    if (!(await (FormRef as any).current?.isFormValid())) return;

    // other wise we add this product
    (FormRef as any).current?.submit();
  };

  const { totlaPriceWithoutTax, tax, discount, totalPrice } = ProductListStore;

  return (
    <ScrollView>
      <View style={[styles.container, { marginTop: 100 }]}>
        <View style={styles.action}>
          <Form ref={FormRef} onSubmit={SubmitForm} instantValidate={true}>
            <InputText
              name="productLabel"
              label="productLabel"
              validateNames={["required"]}
              errorMessages={["This field is required"]}
              placeholder="set product label"
              type="text"
              value={formData?.productLabel}
              onChangeText={(productLabel: any) =>
                handleChange("productLabel", productLabel)
              }
              leftIcon={<FontAwesome name="tag" color="#0A3055" size={20} />}
              invalidIcon={
                <Feather name="alert-circle" color="red" size={20} />
              }
              validIcon={
                <Feather name="check-circle" color="green" size={20} />
              }
              labelStyle={styles.labelStyle}
              style={[styles.inputStyle]}
              containerStyle={styles.inputContainerStyle}
              floatingTopValue={hp("1%")}
              floatingFontSize={hp("0.5%")}
            />
            <InputText
              name="quantity"
              label="quantity"
              // limit price and quantity to avoid stack Ram memory
              validateNames={["required", "minNumber:1", "maxNumber:5000"]}
              errorMessages={[
                "This field is required",
                "You should take at least one item",
                "For big orders, please contact our customer service and sales on Contact@test.com",
              ]}
              placeholder="set quantity"
              type="text"
              value={`${formData?.quantity || ""}`}
              onChangeText={(quantity: string) => {
                handleChange("quantity", Number.parseInt(quantity) || "");
              }}
              leftIcon={
                <FontAwesome name="thumb-tack" color="#0A3055" size={20} />
              }
              invalidIcon={
                <Feather name="alert-circle" color="red" size={20} />
              }
              validIcon={
                <Feather name="check-circle" color="green" size={20} />
              }
              labelStyle={styles.labelStyle}
              style={[styles.inputStyle]}
              containerStyle={styles.inputContainerStyle}
              floatingTopValue={hp("1%")}
              floatingFontSize={hp("0.5%")}
            />
            <InputText
              name="price"
              label="price"
              // limit price and quantity to avoid stack Ram memory
              validateNames={["required", "isPositive", "maxNumber:5000000"]}
              errorMessages={[
                "This field is required",
                "Price should be a positive number",
                "big amount, some thing went wrong !",
              ]}
              placeholder="set product price"
              type="text"
              value={`${formData?.price || ""}`}
              onChangeText={(price: string) => {
                handleChange("price", Number.parseInt(price) || "");
              }}
              leftIcon={<FontAwesome name="usd" color="#0A3055" size={20} />}
              invalidIcon={
                <Feather name="alert-circle" color="red" size={20} />
              }
              validIcon={
                <Feather name="check-circle" color="green" size={20} />
              }
              labelStyle={styles.labelStyle}
              style={[styles.inputStyle]}
              containerStyle={styles.inputContainerStyle}
              floatingTopValue={hp("1%")}
              floatingFontSize={hp("0.5%")}
            />
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={handleSubmit}
              style={styles.appButtonContainer}
            >
              <Text style={styles.appButtonText}>Add Product</Text>
            </TouchableOpacity>

            <View style={[styles.container, { marginTop: 40 }]}>
              <View>
                <Text style={[styles.labelStyle]}>
                  Totla price without tax : {totlaPriceWithoutTax} $
                </Text>
                <Text style={[styles.labelStyle]}>Tax 6.0% : {tax} $ </Text>
                <Text style={[styles.labelStyle]}>
                  Discount 3.0% : {discount} ${" "}
                </Text>
                <Text style={[styles.labelStyle]}>
                  Totla price : {totalPrice} ${" "}
                </Text>
              </View>
            </View>
          </Form>
        </View>
      </View>
    </ScrollView>
  );
};

export default observer(BillingScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  billingText: {
    fontSize: 40,
    fontWeight: "bold",
    alignSelf: "center",
  },
  action: {
    width: Dimensions.get("window").width,
    padding: 20,
  },
  appButtonContainer: {
    elevation: 8,
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
    textTransform: "uppercase",
  },
  labelStyle: {
    fontSize: hp("2%"),
    color: colors.white,
    paddingTop: hp("0.8%"),
    opacity: 0.7,
    fontWeight: "bold",
    // top: 20
  },
  inputStyle: {
    color: colors.white,
    paddingTop: hp("1%"),
  },
  inputContainerStyle: {
    paddingBottom: hp("1%"),
    paddingTop: hp("3.5%"),
    borderWidth: 2,
    borderBottomWidth: 2,
    // borderColor: "#333333",
    // borderBottomColor: "#333333",
    borderColor: colors.primaryColor,
    borderBottomColor: colors.primaryColor,
    borderRadius: 15,
  },
  formErrorMessageStyle: {
    fontSize: 15,
    color: "#FF0000",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
    margin: 5,
  },
});
