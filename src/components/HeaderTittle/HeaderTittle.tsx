import React from 'react'
import { View, Text } from 'react-native'
import HeaderTitleTypes from './HeaderTitleTypes'

const HeaderTittle: React.FC<HeaderTitleTypes> = ({ name }) => {
    return (
        <View style={{
            padding: 0,
            backgroundColor: 'white',
            flexDirection: 'row',
            alignItems: 'center'
        }}
        >
            <Text style={{
                fontFamily: 'RobotoMedium',
                color: '#FF6161',
                fontSize: 22
            }}
            >
                {Boolean(name.length) ? name[0].toUpperCase(): 'U'}
            </Text>
            <Text style={{
                fontFamily: 'RobotoMedium',
                //fontWeight: 'bold',
                color: '#414141',
                fontSize: 22
            }}
            >
                  {Boolean(name.length) ? name.slice(1).toUpperCase() : 'ser'}
            </Text>
        </View>
    )
}

export default HeaderTittle;
