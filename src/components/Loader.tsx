import React from 'react'
import { ActivityIndicator, View } from 'react-native'

function Loader() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: "white" }}>
            <ActivityIndicator color='red' size={30} />
        </View>
    )
}
export default Loader
