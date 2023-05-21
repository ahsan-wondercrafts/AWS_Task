import React from "react";
import { NativeBaseProvider } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import MyTabs from "./src/navigation";

export default function App() {
  return (
    <NavigationContainer>
      <NativeBaseProvider>
        <MyTabs/>
      </NativeBaseProvider>
    </NavigationContainer>
  );
}