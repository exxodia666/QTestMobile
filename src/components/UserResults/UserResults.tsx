import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { UserResultsTypes } from './UserResultsTypes';

const UserResults: React.FC<UserResultsTypes> = ({user, rating, pass_date}) => {
    return (
        <View style = {styles.container}>
            <Text style ={styles.text}>
            <Text style ={styles.text}>
               {user}
            </Text>
           
            </Text>
            <Text style ={styles.text}> 
                Рейтинг:{' '}
                <Text style ={styles.text}>
                {rating * 100}/100
                </Text>
            </Text>
            <Text style ={styles.text}>
               Дата прохождения:{' '}
               <Text style ={styles.text}>
                    {new Date(pass_date).toLocaleDateString()}
               </Text>
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        margin: 10,
        padding: 7,
        width: Dimensions.get('window').width * 0.9,
        backgroundColor: '#E9F4FF'
    },
    text: {
        color: 'black',
        padding: 3,
        fontFamily: 'RobotoMedium',
        fontSize: 18,
    }
})

export default UserResults
