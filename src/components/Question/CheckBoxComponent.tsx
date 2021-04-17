import CheckBox from '@react-native-community/checkbox';
import { observer } from 'mobx-react-lite';
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
//import {} from 'react-native';
import { TouchableOpacity } from 'react-native';

type CheckBoxComponentTypes = {
    question_id: string
    id: string
    isSelected: boolean
    text: string
    toggleSelect: (e: boolean) => void
    setFalseAllChoices: () => void
}
const CheckBoxComponent: React.FC<CheckBoxComponentTypes> = ({ 
    id, 
    isSelected, 
    text, 
    toggleSelect, 
    setFalseAllChoices 
}) => {
    const handleCheckBox = (e: boolean): void => {
        setFalseAllChoices();
        toggleSelect(e);
    }
    
    return (
            <TouchableOpacity onPress = {()=>handleCheckBox(!isSelected)}>
            <View style = {styles.container}>
                <CheckBox
                    disabled = {false}
                    onValueChange={(e) => handleCheckBox(e)}
                    value={isSelected}
                />
                <Text 
                style = {isSelected ? {...styles.isSelected, ...styles.text }: {...styles.isNot, ...styles.text}}
                >{text}</Text>
                </View>
            </TouchableOpacity>
          
           
    )
}

export default CheckBoxComponent;

const styles = StyleSheet.create({
    isSelected: {
        color: 'grey',
    },
    isNot:{ 
        color: 'black',
    },
    text: {
        fontFamily: 'RobotoMedium'
    },
    container: {
        margin: 10,
        borderRadius: 1,
        alignItems: 'center', 
        justifyContent: 'flex-start', 
        flexDirection: 'row', 
        padding: 5,
        
    }
})
