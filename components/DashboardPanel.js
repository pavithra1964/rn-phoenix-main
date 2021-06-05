import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import Colors from "../constants/Colors";

import DashboardPanelPurchase from "./DashboardPanelPurchase";
import DashboardPanelVesselPerformance from "./DashboardPanelVesselPerformance";
import DashboardPanelCertificateSurvey from "./DashboardPanelCertificateSurvey";
import DashboardPanelPMS from "./DashboardPanelPMS";
import DashboardPanelIncident from "./DashboardPanelIncident";
import DashboardPanelRiskMoc from "./DashboardPanelRiskMoc";

import * as dashboardPanelActions from "../store/actions/dashboardpanel";



const DashboardPanel = (props) => {
  const [subcategoryid, setSubcategoryid] = useState(
    props.route.params.subcategoryid
  );
  const [selectedVesselId,setselectedVesselId] = useState(
    props.route.params.vesselid
  );

  let TouchableCmp =
    Platform.OS === "android" ? TouchableNativeFeedback : TouchableOpacity;

  console.log(props.route.params.subcategoryid);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(dashboardPanelActions.fetchSubcategoryElements(subcategoryid));
  }, []);

  const subcategoryelements = useSelector((state) => {
    return state.dashboardPanel.subcategoryelements;
  });

  console.log("SUB CATEGORY ELEMENTS", subcategoryelements);

  if (subcategoryelements.length === 0) {
    return (
      <View>
        <Text>No Items Found</Text>
      </View>
    );
  }

  const renderPanel = () => {
    if (+subcategoryid === 10) {
      return <DashboardPanelRiskMoc itemData={subcategoryelements} />;
    }
    if (+subcategoryid === 9) {
      return <DashboardPanelIncident itemData={subcategoryelements} />;
    }
    if (+subcategoryid === 4) {
      return <DashboardPanelPurchase itemData={subcategoryelements} />;
    }
    if (+subcategoryid === 3) {
      return <DashboardPanelPMS itemData={subcategoryelements} />;
    }
    if (+subcategoryid === 2) {
      return <DashboardPanelCertificateSurvey itemData={subcategoryelements} />;
    }
    if (+subcategoryid === 1) {
      return <DashboardPanelVesselPerformance itemData={subcategoryelements} />;
    }
  };

  return <View>{renderPanel()}</View>;
};

export const screenOptions = (navData) => {
  const routeParams = navData.route.params ? navData.route.params : {};
  return {
    headerTitle: routeParams.subcategoryname,
  };
};

const styles = StyleSheet.create({
  header: {
    margin: 5,
    backgroundColor: "#ccc",
  },
  gridItem: {
    flex: 1,
    height: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
    margin: 5,
    backgroundColor: Colors.operationColor,
  },
  type: {
    fontFamily: "open-sans",
    fontSize: 12,
    marginVertical: 4,
    width: "50%",
  },
  status: {
    fontFamily: "open-sans",
    fontSize: 12,
    marginVertical: 4,
    width: "15%",
  },
  touchable: {
    overflow: "hidden",
  },
  image: {
    width: "50%",
    height: "70%",
    justifyContent: "center",
    alignItems: "center",
  },
  name: {
    fontFamily: "open-sans",
    fontSize: 12,
    marginVertical: 4,
  },
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 12,
    marginVertical: 2,
  },
  address: {
    fontSize: 14,
    color: "#000",
  },
  imageContainer: {
    width: "15%",
    height: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
  },
});

export default DashboardPanel;
