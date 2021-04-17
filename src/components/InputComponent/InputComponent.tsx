import React from 'react'
import { View, Text } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
const InputComponent = ({
    iconName, id, setId, inputText, style} : { inputText: string,iconName: string, id: string, setId: (e: any)=> void}) => {
    return (
        <View 
            style = {{
                margin: 7,
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
                width: '90%',
                borderColor: 'grey',
                borderBottomWidth: 0.7, 
                ...style
            }}>
            <TextInput
                placeholder={inputText}
                style={{ 
                    fontFamily: 'RobotoMedium',
                    padding: 10,
                    fontSize: 20,
                    width: '100%',
                }}
                onChangeText={(e: any) => setId(e)}
                value={id}
            />
        {/* <EvilIcon
            size = {40}
            name = {iconName}
        /> */}
    
        </View>
    )
}

export default InputComponent;
