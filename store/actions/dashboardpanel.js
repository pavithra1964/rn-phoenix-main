import * as Constants from "../../helpers/Url";
import { DashboardMeasureIncident, DashboardMeasurePurchase, DashboardMeasureRiskMoc } from "../../models/DashboardMeasure";
import { DashboardMeasureVesselPerformance } from "../../models/DashboardMeasure";
import { DashboardMeasureCertificates } from "../../models/DashboardMeasure";
import { DashboardMeasurePMS } from "../../models/DashboardMeasure";

export const SET_SUB_CATEGORIES = "SET_SUB_CATEGORIES";

const getWebApi = (subcategoryid) => {
  console.log("API FOR", subcategoryid);
  switch (subcategoryid) {
    case "1":
      return "/GetSubCategoryElementsVesselPerformance";
    case "2":
      return "/GetSubCategoryElementsCertificateSurvey";
    case "3":
      return "/GetSubCategoryElementsPMS";
    case "4":
      return "/GetSubCategoryElementsPurchase";
    case "9":
      return "/GetSubCategoryElementsIncident";
    case "10":
      return "/GetSubCategoryElementsRiskMoc";
    default:
  }
};

const getSubCategoryElements = (subcategoryid, resData) => {
  switch (subcategoryid) {
    case "1":
      return getVesselPerformanceSubCategoryElements(subcategoryid, resData);
    case "2":
      return getCertificateSurveySubCategoryElements(subcategoryid, resData);
    case "3":
      return getPMSSubCategoryElements(subcategoryid, resData);
    case "4":
      return getPurchaseSubCategoryElements(subcategoryid, resData);
    case "9":
      return getIncidentSubCategoryElements(subcategoryid, resData);
    case "10":
      return getRiskMocSubCategoryElements(subcategoryid, resData);
    default:
  }
  if (subcategoryid === 4) {
  }
};

const getCertificateSurveySubCategoryElements = (subcategoryid, resData) => {
  const subcategoryelements = [];

  for (const key in resData) {
    subcategoryelements.push(
      new DashboardMeasureCertificates(
        key,
        resData[key].id,
        resData[key].measurename,
        subcategoryid,
        resData[key].measurecode,
        resData[key].overdue,
        resData[key].days30,
        resData[key].days60
      )
    );
  }
  return subcategoryelements;
};

const getRiskMocSubCategoryElements = (subcategoryid, resData) => {
  const subcategoryelements = [];

  for (const key in resData) {
    subcategoryelements.push(
      new DashboardMeasureRiskMoc(
        key,
        resData[key].id,
        resData[key].measurename,
        subcategoryid,
        resData[key].measurecode,
        resData[key].ship,
        resData[key].office
      )
    );
  }
  return subcategoryelements;
};

const getVesselPerformanceSubCategoryElements = (subcategoryid, resData) => {
  const subcategoryelements = [];

  for (const key in resData) {
    subcategoryelements.push(
      new DashboardMeasureVesselPerformance(
        key,
        resData[key].id,
        resData[key].measurename,
        subcategoryid,
        resData[key].measurecode,
        resData[key].overdue,
        resData[key].pendingreview
      )
    );
  }
  return subcategoryelements;
};

const getPurchaseSubCategoryElements = (subcategoryid, resData) => {
  const subcategoryelements = [];

  for (const key in resData) {
    subcategoryelements.push(
      new DashboardMeasurePurchase(
        key,
        resData[key].id,
        resData[key].measurename,
        subcategoryid,
        resData[key].measurecode,
        resData[key].measurecount
      )
    );
  }
  return subcategoryelements;
};

const getPMSSubCategoryElements = (subcategoryid, resData) => {
  const subcategoryelements = [];

  for (const key in resData) {
    subcategoryelements.push(
      new DashboardMeasurePMS(
        key,
        resData[key].id,
        resData[key].measurename,
        subcategoryid,
        resData[key].measurecode,
        resData[key].measurecount
      )
    );
  }
  return subcategoryelements;
};

const getIncidentSubCategoryElements = (subcategoryid, resData) => {
  const subcategoryelements = [];

  for (const key in resData) {
    subcategoryelements.push(
      new DashboardMeasureIncident(
        key,
        resData[key].id,
        resData[key].measurename,
        subcategoryid,
        resData[key].measurecode,
        resData[key].measurecount
      )
    );
  }
  return subcategoryelements;
};

export const fetchSubcategoryElements = (subcategoryid, selectedVesselId) => {
  return async (dispatch, getState) => {
    try {
      const response = await fetch(
        Constants.URL_API + getWebApi(subcategoryid),
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            rowusercode: 5,
            subcategoryid: subcategoryid,
            selectedVesselId: selectedVesselId,
            companyID: 7
          }),
        }
      );

      if (!response.ok) {
        const errorResData = await response.json();
        console.log(errorResData);
        const errorId = errorResData.error.message;
        let message = "Something went wrong!";

        throw new Error(message);
      }

      const resData = await response.json();

      let subcategoryelements = [];

      subcategoryelements = getSubCategoryElements(subcategoryid, resData);
      dispatch({
        type: SET_SUB_CATEGORIES,
        subcategoryelements: subcategoryelements,
      });
    } catch (err) {
      throw err;
    }
  };
};
