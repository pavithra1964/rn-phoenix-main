import React from "react";
import {
  View,
  Text,
  Image,
  Button,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from "react-native";
import Colors from "../constants/Colors";
import Card from "./UI/Card";

const SubModuleImage = (props) => {
  let TouchableCmp =
    Platform.OS === "android" ? TouchableNativeFeedback : TouchableOpacity;

  const showImage = () => {
    return (
      <TouchableCmp
        onPress={props.onSelect.bind(
          this,
          props.vesselid,
          props.modulename,
          props.submodule,
          props.subcategoryid,
          props.subcategoryname
        )}
        useForeground
      >
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{ uri: props.image }} />
        </View>
      </TouchableCmp>
    );
  };

  const displayImage = () => {
    if (props.image !== "") {
      return showImage();
    }
  };

  return <View style={styles.gridItem}>{displayImage()}</View>;
};

const styles = StyleSheet.create({
  gridItem: {
    flex: 1,
    height: "100%",
    overflow: "hidden",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  user: {
    height: 100,
    width: 70,
    margin: 1,
    overflow: "hidden",
    borderRadius: 0,
    backgroundColor: "white",
  },
  touchable: {
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  name: {
    fontFamily: "open-sans-bold",
    fontSize: 18,
    marginVertical: 4,
  },

  address: {
    fontSize: 14,
    color: "#000",
  },

  imageContainer: {
    width: "100%",
    height: "55%",
  },
});

export default SubModuleImage;
