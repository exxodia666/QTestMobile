import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

type TextComponentTypes = {
    text: string,
}

const TextComponent: React.FC = ({ text }: TextComponentTypes) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                {text}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        margin: 5,
        padding: 5,
        //borderWidth: 0.5
    },
    text: {
        fontFamily: 'RobotoMedium',
        fontSize: 15,
    }
})

export default TextComponent
