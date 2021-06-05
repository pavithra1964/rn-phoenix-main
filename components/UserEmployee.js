import React from 'react';
import { Text, View, StyleSheet, Button,TouchableNativeFeedback } from 'react-native';

const UserEmployee = props => {

    return (
        <TouchableNativeFeedback onPress={props.onSelect} useForeground>
        <View style={styles.product}>
            <View style={styles.container}>
                <View style={styles.textContainer} >
                    <Text style={styles.title}>{props.Emp_Name}</Text>
                    <Text style={styles.price}>{props.Salary}</Text>
                    <Text style={styles.price}>{props.D_o_Join}</Text>
                    <Text style={styles.price}>{props.Gender}</Text>
                </View>
               <View style={styles.buttonContainer}>
               <Button title='Edit' onPress={props.onSelect} color='rgb(255, 0, 102)' />
               </View>
            </View>
        </View>
        </TouchableNativeFeedback>
    )
}
const styles = StyleSheet.create({
    product: {
        elevation: 5,
        borderRadius: 10,
        backgroundColor: 'white',
        height: 150,
        margin: 5
    },
    imageContainer:{
        width: '100%',
        height: '60%',
        overflow:'hidden',
    },
    image: {
        width: '100%',
        height: '100%'
    },
    title: {
        fontSize: 18,
        marginVertical: 4,
    },
    price: {
        fontSize: 18,
        color: 'brown'
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    
    textContainer: {
        marginVertical: 5,
        width: '30%',
        padding: 10
    },
    buttonContainer: {
        marginVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '60%'
    },
})
export default UserEmployee;