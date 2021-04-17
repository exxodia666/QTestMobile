

import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react'
import { View, Button, Alert, Text, TextInput } from 'react-native'
import ErrorComponent from '../../components/ErrorComponent';
import { useStore } from '../../hooks/useStore'
import User from '../../models/UserModel/UserTypes';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
const RegisterLoginScreen = () => {
    const user: User = useStore('UserStore');
    const [name, setname] = useState('');
    const [focus, setFocus] = useState(false);

    useEffect(() => {
        user.loadFromAsync!();
    }, []);
    const handleLogin = () => {
        if(name.length){
            user.authUser!(name);
        } else {
            Alert.alert('Enter name!');
        } 
    }
        return (
            <View style = {{
                flex: 1,
                alignItems: 'center',
                paddingTop: 10,
            }}>
                <View style = {{
                    width: '95%', 
                    padding: 10,
                    
                }}>
                {Boolean(user.errors) && 
                    <ErrorComponent message = {user.errors!.toString()} />
                }
   
                <View style = {{
                    flexDirection: 'row',      
                    marginBottom: 8,
                    justifyContent: 'center', 
                    alignItems: 'center', 
                    borderBottomWidth: 0.7, 
                    borderColor: 'grey'
                    }}>
                <TextInput
                    onFocus = {() => {
                        setFocus(true);
                    }}
                    onBlur = {() => {
                        setFocus(false);
                    }}
                    placeholder='Введите имя'
                    style={{ 
                        fontFamily: 'RobotoMedium',
                        fontSize: 24,
                        //borderWidth: 1, 
                        width:'90%'
                    }}
                    onChangeText={(e: any) => setname(e)}
                    value={name}
                />
                       <Icon 
                            color = {(!focus) ? 'black' : 'grey'}
                            name = {'user'}
                            size = {30}
                        />
                </View>
                <Button
                    color = '#FF6161'
                    title='Войти'
                    onPress={() => {
                        handleLogin()
                    }}
                />
                </View>   
            </View >
        )
}

export default observer(RegisterLoginScreen);