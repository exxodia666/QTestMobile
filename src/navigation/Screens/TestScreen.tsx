import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react'
import { TouchableOpacity, Text, Button, View, Dimensions } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker';
import Loader from '../../components/Loader';
import Question from '../../components/Question/Question';
import status from '../../enum/status';
import { useStore } from '../../hooks/useStore';
import { IQuestionTypes } from '../../models/QuestionModel/IQuestionTypes';
import ITestTypes from '../../models/TestModel/ITestTypes';
import Icon from 'react-native-vector-icons/SimpleLineIcons'

const TestScreen: React.FunctionComponent = ({ route, navigation }: any) => {
    const { id } = route.params;
    const responseStatus: status = useStore('TestListStore').private_test_list.length ? (useStore('TestListStore').private_test_list.filter( i => i.id === id)[0].status!) : (useStore('TestListStore').test_list.filter( i => i.id === id)[0].status!);
    const questions: IQuestionTypes[] = useStore('TestListStore').private_test_list.length ? (useStore('TestListStore').private_test_list.filter( i => i.id === id)[0].questions!) : (useStore('TestListStore').test_list.filter( i => i.id === id)[0].questions!);
    const test: ITestTypes = useStore('TestListStore').private_test_list.length ? (useStore('TestListStore').private_test_list.filter( i => i.id === id)[0]) : (useStore('TestListStore').test_list.filter( i => i.id === id)[0]);
    //const f = (useStore('TestListStore'));
    //const tests: TestListModel = (useStore('TestListStore'));
    const [position, setPosition] = React.useState(0);
    const selectedQuestion: IQuestionTypes = questions[position];
    type dropQuestionType = {
        label: string
        value: number, 
       // icon: Element,
    }
    const dropdownQuestions: dropQuestionType[] = questions.map((item, index) => ({
            label: `Вопрос №${index + 1}`, 
            value: index, 
            //icon: () => <Icon name="list" size={18} color="#900"/>,
    }));
    console.log(dropdownQuestions);

    useEffect(() => {
        if(id.length){
            test.fetchQuestions!(id);
        }
    }, [id]);

    const sendAnswers = (): void => {
        navigation.navigate('UserResults', {id})
    }
    const goBack = (): void => {
        if(position !== 0) {
            setPosition(prPos => prPos - 1)
        }
    }   
    const goForward = (): void => {
        if(position !== questions.length - 1) {
            setPosition(prPos => prPos + 1)
        }
    }

    if (responseStatus === status.pending) {
        return (<Loader />);
    } else if (responseStatus === status.success) {
        return (
            <View style = {{justifyContent: 'center', alignItems: 'center', backgroundColor: 'white'}}>
                <DropDownPicker
                    items={dropdownQuestions}
                    defaultValue={position}
                    containerStyle={{height: 40}}
                    selectedLabelStyle= {{color: 'black'}}
                    style={{backgroundColor: 'white', width: '100%'}}
                    activeItemStyle={{backgroundColor: '#E8F3FF', borderRadius: 3, width: '100%'}}
                    //arrowColor = {'yellow'}
                    customArrowUp = {() => <Icon name="arrow-up" size={18} color="black"/>}
                    customArrowDown = {() => <Icon name="arrow-down" size={18} color="black"/>}
                    itemStyle={{
                        width: '90%',
                        padding: 5,
                        justifyContent: 'flex-start',
                    }}
                    dropDownStyle={{backgroundColor: 'white', width: '100%'}}
                    onChangeItem={item => setPosition(item.value)}
                />
                <Question 
                        question_position = {position}
                        questions_length = {questions.length}
                        id = {selectedQuestion.id}
                        quiz_id = {selectedQuestion.quiz_id}
                        wording = {selectedQuestion.wording}
                        text = {selectedQuestion.text}
                        image = {selectedQuestion.image}
                        is_multiple_choice = {selectedQuestion.is_multiple_choice}
                        choices = {selectedQuestion.choices}
                        setFalseAllChoices = {selectedQuestion.setFalseAllChoices} 
                        goBack = {goBack}
                        goForward = {goForward}
                        setPosition = {setPosition}
                />
                <View style = {{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: Dimensions.get('screen').width, padding: 10}}>
                        <TouchableOpacity 
                                 style = {{
                                    width: 110,
                                    marginBottom: 10,
                                    paddingHorizontal: 15,
                                    paddingVertical: 4, 
                                    backgroundColor: '#4185C9', 
                                    flexDirection: 'row', 
                                    justifyContent: 'center', 
                                    alignItems: 'center'
                                }}
                            onPress={() => {
                                goBack()
                            }}>
                                <Icon  name='arrow-left' color = 'white' size = {11} />
                                <Text style = {{color: 'white', fontSize: 16, margin: 5}}>Назад</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                                 style = {{
                                    width: 130,
                                    marginBottom: 10,
                                    paddingHorizontal: 15,
                                    paddingVertical: 4, 
                                    backgroundColor: 'red', 
                                    flexDirection: 'row', 
                                    justifyContent: 'center', 
                                    alignItems: 'center'
                                }}
                            onPress={() => {
                                sendAnswers()
                            }}>
                                <Text style = {{color: 'white', fontSize: 16, margin: 5}}>Завершить</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style = {{
                                width: 110,
                                paddingVertical: 4, 
                                marginBottom: 10,
                                paddingHorizontal: 15, 
                                backgroundColor: '#4185C9', 
                                flexDirection: 'row', 
                                justifyContent: 'center', 
                                alignItems: 'center'
                            }}
                            onPress={() => {
                                goForward()
                            }}>
                                <Text style = {{color: 'white', fontSize: 16, margin: 5}}>Вперед</Text>
                        <Icon  name='arrow-right' color = 'white' size = {11} />
                    </TouchableOpacity>
                    </View>
                
            </View>)
    } else if (responseStatus === status.error) {
        return (<Text>Error</Text>);
    }
}

export default observer(TestScreen);
