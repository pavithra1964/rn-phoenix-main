import React, { useState, useCallback, useEffect, useReducer } from 'react';
import { Alert, Text, View, ActivityIndicator, StyleSheet, ScrollView, TextInput, TouchableOpacity, Picker } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import DatePicker from 'react-native-datepicker';
import { addEmployee, editEmployee } from '../../store/actions/Employee';
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButton";

const CREATE_EMPLOYEE = 'CREATE_EMPLOYEE';


const formReducer = (state, action) => {
    if (action.type === 'CREATE_EMPLOYEE') {
        const updatedInputValues = {
            ...state.inputValues,
            [action.input]: action.value
        }
        const updatedInputValidities = {
            ...state.inputValidities,
            [action.input]: action.isValid
        }
        let updatedFormIsValid = true
        for (const key in updatedInputValidities) {
            updatedFormIsValid = updatedFormIsValid && updatedInputValidities[key]
        }

        return {
            formIsValid: updatedFormIsValid,
            inputValidities: updatedInputValidities,
            inputValues: updatedInputValues
        }

    }
    return state

}

const EditEmployeeScreen = props => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState()

    const employeeId = props.route.params ? props.route.params.employeeId : null; 

    const editingemployee = useSelector(state => state.employeeList.employeeList.find(Emp => Emp.id === employeeId))
    const dispatch = useDispatch()

    const [formstate, dispatchFormState] = useReducer(formReducer,
        {
            inputValues: {
                Emp_Name: editingemployee ? editingemployee.Emp_Name : '',
                Salary: editingemployee ? editingemployee.Salary : '',
                D_o_Join: editingemployee ? editingemployee.D_o_Join : '',
                Gender: editingemployee ? editingemployee.Gender : ''
            },
            inputValidities: {
                Emp_Name: editingemployee ? true : false,
                Salary: editingemployee ? true : false,
                D_o_Join: editingemployee ? true : false,
                Gender: editingemployee ? true : false
            },
            formIsValid: editingemployee ? true : false
        }
    )





    useEffect(() => {
        if (error) {
            console.log(error);
            Alert.alert('An Error Occoured', error, [{ text: 'ok' }])
        }
    }, [error])

    const submitHandler = useCallback(async () => {
        if (!formstate.formIsValid) {
            Alert.alert('wrong input', 'update it correctly')
            return
        }
        setError(null)
        setIsLoading(true);
        
        Alert.alert('You created Successfully!!');

        try {
            if (editingemployee) {
                await dispatch(editEmployee(formstate.inputValues.Emp_Name, formstate.inputValues.Salary, formstate.inputValues.D_o_Join, formstate.inputValues.Gender))
            } else {
                await dispatch(addEmployee(formstate.inputValues.Emp_Name, formstate.inputValues.Salary, formstate.inputValues.D_o_Join, formstate.inputValues.Gender))
            }
            //await dispatch(addEmployee(formstate.inputValues.Emp_Name, formstate.inputValues.Salary, formstate.inputValues.D_o_Join, formstate.inputValues.Gender))
            props.navigation.goBack();
        } catch (err) {
            setError(err.message)
         }
        setIsLoading(false);
    }, [dispatch, formstate])

    useEffect(() => {
        props.navigation.setOptions({
            headerRight: () => {
                return (
                  <HeaderButtons HeaderButtonComponent={HeaderButton}>
                    <Item
                      title="Edit Screen"
                      iconName="save-outline"
                      onPress={submitHandler}
                    />
                  </HeaderButtons>
                );
              },
        })
    }, [submitHandler])

    const textInputHandler = (inputIdentifier, text) => {
        let isValid = false
        if (text.trim().length > 0) {
            isValid = true
        }
        dispatchFormState({
            type: CREATE_EMPLOYEE,
            value: text,
            isValid: isValid,
            input: inputIdentifier
        })
    }

    // if (isLoading) {
    //     return <View style={styles.centered}>
    //         <ActivityIndicator size='large' color='red' />
    //     </View>
    // }

    const [Gender, setSelectedValue] = useState("");
    const [D_o_Join, setDate] = useState('');
    return (
        <ScrollView>
            <View style={styles.form}>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Employee Name</Text>
                    <TextInput
                        style={styles.input}
                        value={formstate.inputValues.Emp_Name}
                        onChangeText={textInputHandler.bind(this, 'Emp_Name')} />
                </View>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Salary</Text>
                    <TextInput
                        style={styles.input}
                        value={formstate.inputValues.Salary}
                        onChangeText={textInputHandler.bind(this, 'Salary')} />
                </View>
                <View style={styles.formControl}>
                <Text style={styles.label}>Date of Join</Text>
                {/* <DatePicker
                    style={styles.datePickerStyle}
                    date={D_o_Join}
                    mode="date"
                    value={D_o_Join, formstate.inputValues.D_o_Join}
                    placeholder="select date"
                    format="DD-MM-YYYY"
                    minDate="01-01-2016"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{
                        dateIcon: {
                        //display: 'none',
                        position: 'absolute',
                        left: 0,
                        top: 4,
                        marginLeft: 0,
                        },
                        dateInput: {
                        marginLeft: 36,
                        },
                    }}
                    onDateChange={(date) => {
                        setDate(date);
                        formstate.inputValues.D_o_Join
                    }}
                    /> */}
                    <TextInput
                        style={styles.input}
                        value={formstate.inputValues.D_o_Join}
                        onChangeText={textInputHandler.bind(this, 'D_o_Join')} />
                </View>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Gender</Text>
                    <TextInput
                        style={styles.input}
                        value={formstate.inputValues.Gender}
                        onChangeText={textInputHandler.bind(this, 'Gender')} />
                    {/* <Picker
                        selectedValue={Gender, formstate.inputValues.Gender}
                        style={{ height: 50, width: 150 }}
                        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                    >
                        <Picker.Item label="Male" value="male" />
                        <Picker.Item label="Female" value="female" />
                    </Picker> */}
                </View>
            </View>
        </ScrollView>
    )
}

export const screenOptions = (navData) => {
    const routeParams = navData.route.params ? navData.route.params : {};
    return {
        headerTitle: routeParams.employeeId ? 'EditEmployee' : 'Add Screen',
    }
}

const styles = StyleSheet.create({
    form: {
        margin: 20
    },
    formControl: {
        width: '100%'
    },
    label: {
        marginVertical: 8

    },
    input: {
        paddingHorizontal: 2,
        paddingVertical: 5,
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        fontSize: 22
    },
    headerSaveButton: {
        marginRight: 10
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }

})
export default EditEmployeeScreen;