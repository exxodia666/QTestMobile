import { useFocusEffect } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { View, FlatList } from 'react-native';
import ErrorComponent from '../../components/ErrorComponent';
import Loader from '../../components/Loader';
import ResultComponent from '../../components/Result/Results';
import status from '../../enum/status';
import { useStore } from '../../hooks/useStore'
import User from '../../models/UserModel/UserTypes';

const UserScreen: React.FC = () => {
    const user: User = useStore('UserStore');
    
    useFocusEffect(React.useCallback(() => {
        if(Boolean(user.name.length)){
            user.fetchResults!();
            return () => {
                    user.clearResults!()
            }
        }},[]));

    if(user.status === status.success || status.idle) {
    return (
        <View style = {{flex: 1, alignItems: 'center', backgroundColor: 'white', padding: 10}}>
            {Boolean(user.name.length) && <>
            {Boolean(user.results?.length) &&
                <FlatList 
                    data = {user.results!}
                    keyExtractor={(item: any) => item.pass_date}
                    renderItem = {({item }: any) => {
                        return (<ResultComponent 
                                    //key={item.pass_date + item.quiz_name} 
                                    quiz_name={item.quiz_name} 
                                    rating={item.rating} 
                                    pass_date={item.pass_date} 
                        />)
                    }}
                />
            }           
           </> }
        </View >
    )} else if(user.status === status.pending) {
        return <Loader />
    }
    else if (user.status === status.error) {
        return <ErrorComponent message = {user.errors!.toString()} reload = {user.fetchResults} />
    }

}
export default observer(UserScreen);