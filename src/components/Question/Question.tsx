import { observer } from 'mobx-react-lite';
import React from 'react'
import { View, Text, StyleSheet, Button, ProgressBarAndroidBase, Dimensions } from 'react-native'
import { ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native';
import CheckBoxComponent from './CheckBoxComponent';
import ImageComponent from './Image';
import ProgressComponent from './ProgressComponent';
import TextComponent from './TextComponent';
import WordingComponent from './WordingComponent';
const Question: React.FC = ({
    id,
    quiz_id,
    wording,
    text,
    image,
    is_multiple_choice,
    choices,
    setFalseAllChoices ,
    goBack, 
    goForward,
    question_position,
    questions_length
}: any) => {

    const handleChoices = () => {
        setFalseAllChoices();
    }
    
    return (
        <View style={styles.container}>
              <ScrollView>
                <ProgressComponent 
                    
                    question_position = {question_position}
                    questions_length = {questions_length}
                />
                {!!image && Boolean(image.picture.length) && <ImageComponent image={image.picture} />}
                <View>
                <WordingComponent wording={wording} />
                {Boolean(text.length) && <TextComponent text={text} />}
                {is_multiple_choice && <Text style = {{
                        fontFamily: "RobotoMedium", 
                        color: 'green', 
                        paddingHorizontal: 10
                    }}> 
                        *Несколько ответов
                    </Text>
                }
                    {choices.map((item: any) => 
                        <CheckBoxComponent
                            key={item.id}
                            question_id={item.question_id}
                            id={item.id}
                            isSelected={item.isSelected}
                            toggleSelect={item.toggleSelect}
                            text={item.text}
                            setFalseAllChoices={handleChoices}
                        />
                    )}
                    
                </View>
                </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        fontFamily: 'RobotoMedium',
        fontSize: 20,
        padding: 9,
    },
    container: {
        //backgroundColor: 'red',
        height: Dimensions.get('window').height - 200,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start'
        //padding: 5,
        //margin: 5,
       // borderWidth: 1,
        //borderRadius: 5
    }
})
export default observer(Question);
