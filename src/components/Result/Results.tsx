import React from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { result } from '../../models/UserModel/UserTypes';

const ResultComponent: React.FC<result> = ({ quiz_name, rating, pass_date }) => {
    return (
        <View style={styles.container}>
            <Text style={{...styles.text}}>
            <Text style = {{...styles.text, color: 'black'}}>
            {quiz_name}
                </Text> 
                
            </Text>
            <Text style={{...styles.text, fontSize: 15}}>Рейтинг:{' '}
               <Text style = {{...styles.text, color: 'black'}}>
               {(rating * 100).toFixed(0)}/100
                </Text> 
            </Text>
            <Text style={{...styles.text, fontSize: 15}}>Дата прохождения:{' '}
            <Text style = {{...styles.text, color: 'black'}}>
            {new Date(pass_date).toLocaleDateString()}
                </Text>  
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    text:{
        fontFamily: 'RobotoMedium',
        fontSize: 17,
        padding: 2
    },
    container: {
        margin: 10,
        backgroundColor: '#E9F4FF',
        width: Dimensions.get('screen').width*0.9,
        padding: 6,
        borderColor: 'grey',
        borderBottomWidth: 0.5
    }
})


export default ResultComponent;