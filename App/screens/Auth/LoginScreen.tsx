import React, { useState, useRef, useContext } from "react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import { FontAwesome, Feather, Ionicons } from "@expo/vector-icons";
import colors from "../../constants/Colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import { AuthContext } from "../../contexts/AuthContext";

const FormValidator = require("validate-form-in-expo-style");

const { Form, InputText } = FormValidator as any;

const LoginScreen = () => {
  // Auth context
  const auth: AuthContextType = useContext<AuthContextType>(AuthContext);

  /** Form Data state */
  const [formData, setFormData] = useState<LoginFormData>({
    email: "test@gmail.com",
    password: "test123",
  });

  // Global Form error message
  const [formErrorMessage, setFormErrorMessage] = useState<string>("");

  const FormRef = useRef();
  const EmailTextInputRef = useRef();
  const PWDTextInputRef = useRef();

  /** Handle form field update  */
  const handleChange = (key: "email" | "password", value: string) => {
    setFormData((data: LoginFormData) => ({
      /** Old data with the updated one  */
      ...data,
      [key]: value,
    }));

    // Reset Global Form Error after each field update
    if (formErrorMessage !== "") {
      setFormErrorMessage("");
      (FormRef?.current as any)?.resetValidations();
    }
  };

  /** Handle submit form  */
  const SubmitForm = () => {
    auth.login("usetToken fetched from the Auth API");
  };

  const handleSubmit = async () => {
    // if not a valid Form do not fetch the Auth server
    if (!(await (FormRef as any).current?.isFormValid())) return;

    // await fetch server and check the validite of theses credintials

    // if they are not valid
    if (
      formData.email !== "test@gmail.com" ||
      formData.password !== "test123"
    ) {
      // set errors indicators
      (EmailTextInputRef?.current as any)?.makeInvalid();
      setFormErrorMessage("Invalid email or password");

      // else if all is ok we loggedin
    } else {
      (FormRef as any).current?.submit();
    }
  };

  return (
    <ScrollView>
      <View style={[styles.container, { marginTop: 150 }]}>
        <View style={[styles.action, { alignItems: "center" }]}></View>
        <View style={styles.action}>
          <Form ref={FormRef} onSubmit={SubmitForm} instantValidate={true}>
            <InputText
              name="email"
              label="email"
              ref={EmailTextInputRef}
              validateNames={["validEmail", "required"]}
              errorMessages={[
                "Enter valid email address",
                "This field is required",
              ]}
              placeholder="set test@gmail.com to login in !!"
              type="text"
              keyboardType="email-address"
              value={formData?.email || ""}
              onChangeText={(email: any) => handleChange("email", email)}
              leftIcon={<FontAwesome name="user-o" color="#0A3055" size={20} />}
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
              name="password"
              label="Password"
              ref={PWDTextInputRef}
              secureTextEntry
              passwordHideIcon={
                <Ionicons
                  name="eye-off-outline"
                  color={colors.white}
                  size={20}
                />
              }
              passwordShowIcon={
                <Ionicons name="eye-outline" color={colors.white} size={20} />
              }
              validateNames={["required"]}
              errorMessages={["This field is required"]}
              type="text"
              value={formData?.password || ""}
              placeholder="put test123 as password"
              leftIcon={<FontAwesome name="lock" color="#0A3055" size={20} />}
              onChangeText={(password: any) =>
                handleChange("password", password || "")
              }
              labelStyle={styles.labelStyle}
              style={[styles.inputStyle]}
              containerStyle={styles.inputContainerStyle}
              floatingTopValue={hp("1%")}
              floatingFontSize={hp("0.5%")}
            />
            <Text style={styles.formErrorMessageStyle}>
              {" "}
              {formErrorMessage}{" "}
            </Text>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={handleSubmit}
              style={styles.appButtonContainer}
            >
              <Text style={styles.appButtonText}>Submit</Text>
            </TouchableOpacity>
          </Form>
        </View>
      </View>
    </ScrollView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
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
    fontSize: hp("1.8%"),
    color: colors.white,
    paddingTop: hp("0.8%"),
    opacity: 0.9,
    // top: 20
  },
  inputStyle: {
    color: colors.white,
    paddingTop: hp("1%"),
  },
  inputContainerStyle: {
    paddingBottom: hp("1%"),
    paddingTop: hp("2.5%"),
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
