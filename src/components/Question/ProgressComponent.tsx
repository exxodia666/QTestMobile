import React from 'react'
import { View, Text, Dimensions } from 'react-native'
import * as Progress from 'react-native-progress';

const ProgressComponent = ({question_position, questions_length}: {question_position: number, questions_length: number}) => {
    return (
        <View style = {{
                flex: 1, 
                width: Dimensions.get('screen').width, 
                justifyContent: 'center', 
                alignItems: 'center', 
                flexDirection: 'row'
                }}
        >
                <Progress.Bar 
                    color = '#4185C9'
                    progress={(question_position + 1) / questions_length } 
                    animated 
                    width={Dimensions.get('screen').width * 0.8} 
                />
                <Text style = {{
                    padding: 5, 
                    fontFamily: 'RobotoMedium'
                    }}> 
                    {question_position + 1} / {questions_length}
                </Text>
        </View>
    )
}

export default ProgressComponent
