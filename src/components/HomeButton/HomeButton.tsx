import React from 'react'
import { StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import HomeButtonTypes from './HomeButtonTypes';

const HomeButton: React.FC<HomeButtonTypes> = ({handleHome}) => {
    return (
        <TouchableOpacity 
            style={styles.container} 
            onPress={() => handleHome('QTEST')}
        >
        <Icon
            name={'home'}
            size={24}
            color={'red'}
        />
    </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    container: {
        padding: 15,
        width: '100%',
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center', 
    }
})
export default HomeButton
