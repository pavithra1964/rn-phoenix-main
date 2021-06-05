import { SET_SUB_CATEGORIES } from "../actions/dashboardpanel";

const purchaseSubcategory = {
  subcategoryelements: [],
};

export default (state = purchaseSubcategory, action) => {
  switch (action.type) {
    case SET_SUB_CATEGORIES:
      return {
        subcategoryelements: action.subcategoryelements,
      };
  }
  return state;
};
