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
import Colors from "./../constants/Colors";
import Card from "./UI/Card";

const VesselModuleItem = (props) => {
  let TouchableCmp =
    Platform.OS === "android" ? TouchableNativeFeedback : TouchableOpacity;

  console.log(props.name);
  let st = styles.item;
  if (props.name === "US Calling") {
    st = styles.itemOngoing;
  }
  return (
    <Card style={st}>
      <TouchableCmp onPress={props.onSelect} useForeground>
        <View>
          <View style={{ flexDirection: "row" }}>
            <View style={styles.type}>
              <Text style={styles.name}>{props.type}</Text>
            </View>
            <View style={styles.status}>
              <Text style={styles.name}>{props.status}</Text>
            </View>
            <View style={styles.imageContainer}>
              <Image style={styles.image} source={{ uri: props.image }} />
            </View>
          </View>
          <View style={styles.actions}>{props.children}</View>
        </View>
      </TouchableCmp>
    </Card>
  );
};

const styles = StyleSheet.create({
  item: {
    height: 35,
    margin: 5,
    overflow: "hidden",
    backgroundColor: Colors.operationColor,
  },
  itemOngoing: {
    height: 35,
    margin: 5,
    overflow: "hidden",
    backgroundColor: Colors.hseqaColor,
  },
  touchable: {
    borderRadius: 10,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  name: {
    fontFamily: "open-sans",
    fontSize: 18,
    marginVertical: 4,
  },
  type: {
    fontFamily: "open-sans",
    fontSize: 18,
    marginVertical: 4,
    width: "50%",
  },
  status: {
    fontFamily: "open-sans",
    fontSize: 18,
    marginVertical: 4,
    width: "40%",
  },
  detail: {
    alignItems: "flex-start",
    height: "15%",
    padding: 5,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: "20%",
    paddingHorizontal: 10,
  },
  imageContainer: {
    width: "6%",
    height: "24%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: "hidden",
  },
});

export default VesselModuleItem;
