import { observer } from 'mobx-react-lite';
import React from 'react'
import { Text, View, FlatList, StyleSheet} from 'react-native';
import ErrorComponent from '../../components/ErrorComponent';
import Loader from '../../components/Loader';
import UserResults from '../../components/UserResults/UserResults';
import status from '../../enum/status';
import { useStore } from '../../hooks/useStore';
import ITestTypes from '../../models/TestModel/ITestTypes';
import User from '../../models/UserModel/UserTypes';

const UserResultsScreen = ({route}: any) => {
    const { id }: ITestTypes = route.params;
    const sendAnswers: any = useStore('TestListStore').private_test_list.length ? (useStore('TestListStore').private_test_list.filter( i => i.id === id)[0]).sendAnswers : (useStore('TestListStore').test_list.filter( i => i.id === id)[0]).sendAnswers;
    const user: User = useStore('UserStore');
    const reqStatus: status = useStore('TestListStore').private_test_list.length ? (useStore('TestListStore').private_test_list.filter( i => i.id === id)[0].status!) : (useStore('TestListStore').test_list.filter( i => i.id === id)[0].status!);
    const test: ITestTypes = useStore('TestListStore').private_test_list.length ? (useStore('TestListStore').private_test_list.filter( i => i.id === id)[0]) : (useStore('TestListStore').test_list.filter( i => i.id === id)[0]);
    
    React.useEffect(() => {
        sendAnswers(user);
    }, []);

    if(reqStatus === status.success) {
        return <View style = {styles.container}>
                    <View style = {styles.headContainer}>
                    <Text style = {styles.text}
                        >Рейтинг пользователей для этого теста
                    </Text>
            
                </View>
           <FlatList 
                data = {test.user_rating!}
                keyExtractor={(item: any) => item.pass_date}
                renderItem = {({item }: any) => {
                    return(<UserResults
                                user= {item.dude.name}
                                rating = {item.rating}
                                pass_date = {item.pass_date}
                           />)
                }}
            />
        </View>
    } else if (reqStatus === status.error && test.message?.length) {
        return <ErrorComponent 
                    message = {test.message!} 
                    reload = {() => sendAnswers(user)
                }/>
    } else {
        return (
        <Loader />
        )
    }
}

const styles = StyleSheet.create({
    headContainer:{
        width: '100%',
        padding: 15,
        borderColor: 'grey', 
        borderBottomWidth: 0.5
    },
    container: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center', 
        backgroundColor: 'white'
    },
    text:{
        fontFamily: "RobotoMedium", 
        fontSize: 20,
    }
})

export default observer(UserResultsScreen);
