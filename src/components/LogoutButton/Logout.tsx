import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native'
import LogoutTypes from './LogoutTypes'
import Icon from 'react-native-vector-icons/SimpleLineIcons';

const Logout: React.FC<LogoutTypes> = ({handleLogOut}) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity 
                onPress = {() => {
                    handleLogOut()
                }}>
            <Icon
                name={'logout'}
                size={24}
                color={'red'}
            />
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
container: {
    flexDirection:  'row',
    padding: 15,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
    }
})

export default Logout
