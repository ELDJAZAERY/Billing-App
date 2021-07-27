import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import {
  LoginScreen,
  BillingScreen,
  ProductListScreen,
  ProductDetailsScreen,
  SettingsScreen,
} from "../screens";

const AuthStack = createStackNavigator();
const AuthStackScreen = () => (
  <AuthStack.Navigator>
    <AuthStack.Screen
      name="Login"
      component={LoginScreen}
      options={{ title: "Log In" }}
    />
  </AuthStack.Navigator>
);

const Tabs = createBottomTabNavigator();
const BillingStack = createStackNavigator();
const ProductsStack = createStackNavigator();
const SettingsStack = createStackNavigator();

const BillingStackScreen = () => (
  <BillingStack.Navigator>
    <BillingStack.Screen name="Billing" component={BillingScreen} />
  </BillingStack.Navigator>
);

const ProductsStackScreen = () => (
  <ProductsStack.Navigator>
    <ProductsStack.Screen name="Products List" component={ProductListScreen} />
    <ProductsStack.Screen
      name="Product Details"
      component={ProductDetailsScreen}
      options={({ route }) => ({
        title: (route?.params as any)?.title,
      })}
    />
  </ProductsStack.Navigator>
);

const SettingsStackScreen = () => (
  <SettingsStack.Navigator>
    <SettingsStack.Screen name="Search" component={SettingsScreen} />
  </SettingsStack.Navigator>
);

const TabsScreen = () => (
  <Tabs.Navigator>
    <Tabs.Screen name="Billing" component={BillingStackScreen} />
    <Tabs.Screen name="Products" component={ProductsStackScreen} />
    <Tabs.Screen name="Settings" component={SettingsStackScreen} />
  </Tabs.Navigator>
);

const RootStack = createStackNavigator();
export const RootStackScreen = (props: any) => (
  <RootStack.Navigator headerMode="none">
    {props?.userToken ? (
      <RootStack.Screen
        name="App"
        component={TabsScreen}
        options={{
          animationEnabled: false,
        }}
      />
    ) : (
      <RootStack.Screen
        name="Auth"
        component={AuthStackScreen}
        options={{
          animationEnabled: false,
        }}
      />
    )}
  </RootStack.Navigator>
);
