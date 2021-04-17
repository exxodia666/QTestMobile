import { useFocusEffect } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react'
import { Button,  FlatList,  TextInput, Alert ,View, Text} from 'react-native'
import ErrorComponent from '../../components/ErrorComponent';
import Loader from '../../components/Loader';
import TestComponent from '../../components/TestComponent/TestComponent';
import status from '../../enum/status';
import { useStore } from '../../hooks/useStore';
import ITestTypes from '../../models/TestModel/ITestTypes';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
//import Icon from 'react-native-vector-icons/EvilIcons';
import InputComponent from '../../components/InputComponent/InputComponent';
import { TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';


const TestListScreen: React.FunctionComponent<any> = ({ navigation }: any) => {
    const [test, setTest] = React.useState('');
    const [id, setId] = React.useState('');
    const tests: ITestTypes[] = (useStore('TestListStore').test_list.filter((item : ITestTypes )=> {
        return item.quiz_name.toLowerCase().includes(test.toLowerCase());
    }));
    const f = (useStore('TestListStore'));
    const errors: any = (useStore('TestListStore').errors!);
    const responseStatus: status = (useStore('TestListStore').status!);
    
    const handeleSelect = (id: string): void => {
        navigation.navigate('Test', { id });
    }
    
    useEffect(()=>{
        f.fetchTests();
    }, [])

    const handlePrivateTestFetch = async (id: string) => {
        const regEx = /^((\w){8})-((\w){4})-((\w){4})-((\w){4})-((\w){12})$/g;
        if(id.length) {
            if(regEx.test(id)) {
                await f.fetchTests(id);
                navigation.navigate('Test', { id });
            } else {
                Alert.alert("Invalid ID")
            }
        } else {
            Alert.alert("Enter ID")
        }
        
    }
        
    if (responseStatus === status.pending) {
        return (<Loader />);
    } else if (responseStatus === status.success) {
        return (<View style = {{
            width: '100%',
            backgroundColor: 'white',
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        }}>
           
        <View
        style = {{
            width: '100%',  
            justifyContent: 'center',
            alignItems: 'center',
            paddingBottom: 9,
        }}
        >
        
        <InputComponent 
            inputText = {'Поиск'}
            id = {test}
            setId = {setTest}
            iconName = "search"
        />
        <View style = {{
            flexDirection: 'row', 
            justifyContent: 'center', 
            alignItems: 'center'
        }}>
        <InputComponent         
            style = {{width: '83.5%'}}
            inputText = {'Ключ приватного теста'}
            id = {id}
            setId = {setId}
            iconName = "key"
        />
        <TouchableOpacity 
            onPress={() => {
                handlePrivateTestFetch(id);
            }}>
          <Icon  name='control-play' color = '#FF6161' size = {24} />
        </TouchableOpacity>
              
        </View>
        </View>
                <FlatList 
                    data = {tests}
                    keyExtractor={(item: any) => item.id}
                    renderItem = {({item }: any) => {
                        return(<TestComponent
                            key={item.id}
                            id={item.id}
                            name={item.quiz_name}
                            count_questions={item.questions_count}
                            selectTest={() => handeleSelect(item.id)}
                        />)
                    }}
                />
        </View>
        )
    } else if (responseStatus === status.error) {
        return (<ErrorComponent message = {errors.toString()} reload = {f.fetchTests}/>);
    }
}

export default observer(TestListScreen);
