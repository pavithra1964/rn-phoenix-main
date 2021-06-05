import React from "react";
import { useSelector } from "react-redux";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
  FlatList,
} from "react-native";
import Colors from "../constants/Colors";
import Card from "./UI/Card";
import { Ionicons } from '@expo/vector-icons';
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "./UI/HeaderButton";
import UserEmployee from "./UserEmployee";

const ListScreen = props => {

  const employeeData = useSelector(state => state.employeeList.employeeList)

  if(employeeData.length === 0 ){
      return <View style={styles.noProductsText}>
          <Text>No products found.! Do Add </Text>
      </View>
  }
  
  return <FlatList
      data={employeeData}
      keyExtractor={item => item.id}
      renderItem={itemData =>
          <UserEmployee
              onSelect={() => {props.navigation.navigate('EditEmployeeList', {employeeId: itemData.item.id }) }}
              Emp_Name={itemData.item.Emp_Name}
              Salary={itemData.item.Salary}
              D_o_Join={itemData.item.D_o_Join}
              Gender={itemData.item.Gender}
          />}
  />
}
export const screenOptions = (navData) => {
  return {
    headerTitle: "Employee List",
    headerLeft: () => {
      return (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Menu"
            iconName="md-menu"
            onPress={() => {
              navData.navigation.toggleDrawer();
            }}
          />
        </HeaderButtons>
      );
    },
    headerRight: () => {
      return (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Create"
            iconName="create-outline"
            onPress={() => {
              navData.navigation.navigate('EditEmployeeList');
            }}
          />
        </HeaderButtons>
      );
    },
  };
};
const styles = StyleSheet.create({
  headerMenuButton: {
      marginLeft: 10
  },
  headerEditButton: {
      marginRight: 10
  },
  noProductsText:{
      flex:1,
      alignItems:'center',
      justifyContent:'center'
  }
})
export default ListScreen;


// const DashboardPanelEmployee = (props) => {
//   const renderGridItem = (DummyData) => {
//     let TouchableCmp =
//       Platform.OS === "android" ? TouchableNativeFeedback : TouchableOpacity;
//     return (
//       <Card style={styles.gridItem}>
//         <TouchableCmp>
//           <View>
//             <View style={{ flexDirection: "row" }}>
//               <View style={styles.type}>
//                 <Text style={styles.name}>{DummyData.item.Emp_Name}</Text>
//               </View>
//               <View style={styles.type}>
//                 <Text style={styles.name}>{parseFloat(DummyData.item.Salary).toFixed(2)}</Text>
//               </View>
//               <View style={styles.type}>
//                 <Text style={styles.name}>{DummyData.item.D_o_Join}</Text>
//               </View>
//               <View style={styles.type}>
//                 <Text style={styles.name}>{DummyData.item.Gender}</Text>
//               </View>
//             </View>
//           </View>
//         </TouchableCmp>
//       </Card>
//     );
//   };

//   const renderGridHeader = () => {
//     return (
//       <Card style={styles.header}>
//         <View style={{ flexDirection: "row" }}>
//           <View style={styles.type}>
//             <Text style={styles.title}>Employee Name</Text>
//           </View>
//           <View style={styles.type}>
//             <Text style={styles.title}>Salary</Text>
//           </View>
//           <View style={styles.type}>
//             <Text style={styles.title}>D_o_Join</Text>
//           </View>
//           <View style={styles.type}>
//             <Text style={styles.title}>Gender</Text>
//           </View>
//         </View>
//       </Card>
//     );
//   };

//   return (
//     <View style={{ margin: 10 }}>
//       <View style={{ marginTop: 5 }}>
//         <FlatList
//           ListHeaderComponent={renderGridHeader}
//           data={DummyData}
//           renderItem={renderGridItem}
//           numColumns={1}
//         />
//       </View>
//     </View>
//   );
// };

// export const screenOptions = (navData) => {
//   const routeParams = navData.route.params ? navData.route.params : {};
//   return {
//     headerTitle: 'Employee List',
//     headerLeft: () => <TouchableOpacity style={styles.headerMenuButton} onPress={() => { navData.navigation.toggleDrawer() }}>
//         <Ionicons name='ios-menu' size={23} color='black' />
//     </TouchableOpacity>,
//     headerRight: () => <TouchableOpacity style={styles.headerEditButton} onPress={() => { navData.navigation.navigate('EditEmployee') }}>
//         <Ionicons name='md-create' size={30} color='black' />
//     </TouchableOpacity>
// }
// };

// const styles = StyleSheet.create({
//   header: {
//     margin: 5,
//     backgroundColor: "#ccc",
//   },
//   headerMenuButton: {
//     paddingLeft: 15,
//   },
//   headerEditButton: {
//     paddingRight: 15,
//   },
//   gridItem: {
//     flex: 1,
//     height: "100%",
//     justifyContent: "flex-start",
//     alignItems: "center",
//     margin: 5,
//     backgroundColor: Colors.operationColor,
//   },
//   type: {
//     fontFamily: "open-sans",
//     fontSize: 12,
//     marginVertical: 4,
//     width: "25%",
//     paddingLeft: 5
//   },
//   status: {
//     fontFamily: "open-sans",
//     fontSize: 12,
//     marginVertical: 4,
//     width: "40%",
//   },
//   touchable: {
//     overflow: "hidden",
//   },
//   image: {
//     width: "30%",
//     height: "70%",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   name: {
//     fontFamily: "open-sans",
//     fontSize: 12,
//     marginVertical: 4,
//   },
//   title: {
//     fontFamily: "open-sans-bold",
//     fontSize: 12,
//     marginVertical: 2,
//   },
//   address: {
//     fontSize: 14,
//     color: "#000",
//   },
//   imageContainer: {
//     width: "15%",
//     height: "100%",
//     justifyContent: "flex-end",
//     alignItems: "center",
//   },
// });

// export default DashboardPanelEmployee;




/*import React from 'react';
import { FlatList, View, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';

import UserProduct from '../../components/UserProduct';
import { deleteFromUserProduct } from '../../store/actions/Product'

const userProductScreen = props => {

    const userProducts = useSelector(state => state.product.userProducts)
    const dispatch = useDispatch()


    const deleteHandler = (id) => {
        Alert.alert('Are you sure?', 'Do you really want to delete this Employee?',
            [
                { text: 'NO', style: 'default' },
                {
                    text: 'YES',
                    style: 'destructive',
                    onPress: () => {
                        dispatch(deleteFromUserProduct(id))
                    }
                }
            ])
    }

    if(userProducts.length === 0 ){
        return <View style={styles.noProductsText}>
            <Text>No Employees found.! Do Add </Text>
        </View>
    }
    
    return <FlatList
        data={userProducts}
        keyExtractor={item => item.id}
        renderItem={itemData =>
            <UserProduct
                onSelect={() => { props.navigation.navigate('EditEmployee', { productId: itemData.item.id }) }}
                Emp_Name={itemData.item.Emp_Name}
                Salary={itemData.item.Salary}

            />}
    />
}
userProductScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Admin',
        headerLeft: () => <TouchableOpacity style={styles.headerMenuButton} onPress={() => { navData.navigation.toggleDrawer() }}>
            <Ionicons name='ios-menu' size={23} color='white' />
        </TouchableOpacity>,
        headerRight: () => <TouchableOpacity style={styles.headerEditButton} onPress={() => { navData.navigation.navigate('EditProduct') }}>
            <Ionicons name='md-create' size={30} color='white' />
        </TouchableOpacity>
    }
}
const styles = StyleSheet.create({
    headerMenuButton: {
        marginLeft: 10
    },
    headerEditButton: {
        marginRight: 10
    },
    noProductsText:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    }
})
export default userProductScreen;*/