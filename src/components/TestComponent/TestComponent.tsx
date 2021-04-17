import React from 'react'
import { Dimensions, Text, StyleSheet, View } from 'react-native'
import { TouchableOpacity } from 'react-native'
import TestComponentTypes from './TestComponentTypes'
import Icon from 'react-native-vector-icons/SimpleLineIcons';
const TestComponent: React.FC = (props: TestComponentTypes) => {
    const { id, name, count_questions, selectTest } = props;
    return (
        <TouchableOpacity
            style={styles.container}
            onPress={() => selectTest(id, name)}
        >
            <View>
                <Text style={styles.text}><Text style = {{
                    fontWeight: 'bold',
                    color: 'black', 
                    fontFamily: 'RobotoMedium'
                    }}> 
                        {`${name}`} 
                    </Text>
                    </Text>
                
                <Text style={styles.text}>Количество вопросов:
                    <Text style = {{color: 'black',  fontWeight: 'bold', fontFamily: 'RobotoMedium'}}> 
                        {` ${count_questions}`} 
                    </Text>
                </Text>
            </View>
        </TouchableOpacity>
        

    )
}
const styles = StyleSheet.create({
    container: {
        margin: 10,
        borderColor: '#C2E1FF',
        flexDirection: 'row',
        //elevation: 6,
        backgroundColor: 'white',
        //marginVertical: 5,
        width: Dimensions.get('screen').width * 0.90,
        //flexDirection: 'row',
        borderBottomWidth: 7,
        borderWidth: 2.5,
        padding: 10,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    text: {
        fontFamily: 'RobotoMedium',
        margin: 8,
        fontSize: 18
    }
});
export default TestComponent;
