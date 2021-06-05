// Pushing but not updating - Let me see if it works
// After training
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import { createStore, combineReducers, applyMiddleware } from "redux";

import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";

import AppLoading from "expo-app-loading";
import * as Font from "expo-font";

import Colors from "./constants/Colors";
import AppNavigator from "./navigation/AppNavigator";
import authReducer from "./store/reducers/auth";
import vesselReducer from "./store/reducers/vessels";
import categoryReducer from "./store/reducers/categories";
import vesselModuleReducer from "./store/reducers/vesselmodule";
import dashboardPanelReducer from "./store/reducers/dashboardpanel";
import employeeReducer from "./store/reducers/Employee"

const rootReducer = combineReducers({
  vessels: vesselReducer,
  auth: authReducer,
  vesselModule: vesselModuleReducer,
  categories: categoryReducer,
  dashboardPanel: dashboardPanelReducer,
  employeeList:employeeReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });
};

// Edited Comment - Testing Git Commit

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => {
          return setFontLoaded(true);
        }}
        onError={() => {
          console.log("Error");
        }}
      />
    );
  }
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.accentColor,
    alignItems: "center",
    justifyContent: "center",
  },
});
