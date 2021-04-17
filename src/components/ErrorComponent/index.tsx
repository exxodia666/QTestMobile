import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import  ErrorType from './ErrorTypes'
import Icon from 'react-native-vector-icons/SimpleLineIcons'
import { TouchableOpacity } from 'react-native'

const ErrorComponent: React.FC<ErrorType> = ({message, reload}) => {
    return (
        <View style = {styles.container}>
            <Text style = {styles.text}>{message}</Text>
            {Boolean(reload) &&
            <TouchableOpacity onPress = {reload} >
                <Icon size = {24} color = 'red' name = 'reload' />
            </TouchableOpacity>}
        </View>
    )
}

const styles = StyleSheet.create({
    container:{ 
        flex: 1, 
        backgroundColor: 'white', 
        justifyContent: "center", 
        alignItems: 'center'
    }, 
    text:{
        color: 'red', 
        fontFamily: 'RobotoMedium', 
        margin: 20
    }
})
export default ErrorComponent
