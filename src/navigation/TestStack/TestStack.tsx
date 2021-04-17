import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TestListScreen from '../Screens/TestListScreen';
import TestScreen from '../Screens/TestScreen';
import HeaderTittle from '../../components/HeaderTittle/HeaderTittle';
import { useStore } from '../../hooks/useStore';
import User from '../../models/UserModel/UserTypes';
import RegisterLoginScreen from '../Screens/RegisterLoginScreen';
import status from '../../enum/status';
import Loader from '../../components/Loader';
import { observer } from 'mobx-react-lite';
import UserResultsScreen from '../Screens/UserResultsScreen';
import { useEffect } from 'react'
import handleLogOut from '../../utils/handleLogout';
import HomeButton from '../../components/HomeButton/HomeButton';
import Logout from '../../components/LogoutButton/Logout';

const TestStack: React.FC = () => {
    const Stack = createStackNavigator();
    const user: User = useStore('UserStore');    
    
    useEffect(() => {
        user.loadFromAsync!();
    }, []);

    if(user.status === status.pending) {
        return <Loader />
    }
    return (<Stack.Navigator
        screenOptions={() => ({
            headerTitle: (props: any) => <HeaderTittle name={props.children} />,
            headerTintColor: '#fff',
            headerStyle: {
                backgroundColor: 'white'
            }
        })}
    >{Boolean(!user.name.length) ? 
                (<Stack.Screen
                    name="Log in"
                    component={RegisterLoginScreen}
                />) : 
      Boolean(user.name.length) ? 
                (<>
                    <Stack.Screen
                        options={{
                            headerRight: () => <Logout handleLogOut = { () =>handleLogOut(user)} />
                        }}
                        name="QTEST"
                        component={TestListScreen}
                    
                    />
                    <Stack.Screen
                        name="Test"
                        component={TestScreen}
                    />
                    <Stack.Screen
                        name="UserResults"
                        component={UserResultsScreen}
                        options={({navigation}) => ({
                            headerTitle: '',
                            headerLeft: () => <HomeButton handleHome = {navigation.navigate} />,
                          })}
                    />
                 </>) : 
      <></>}
    </Stack.Navigator>)
}
export default observer(TestStack);


//
/*
<Stack.Navigator
screenOptions={() => ({
    headerTitle: (props: any) => <HeaderTittle name={props.children} />,
    headerTintColor: '#fff',
    headerStyle: {
        backgroundColor: 'white'
    }
})}
>
    <Stack.Screen
        name="Log in"
        component={RegisterLoginScreen}
    />
</Stack.Navigator>

<Stack.Navigator
screenOptions={() => ({
    headerTitle: (props: any) => <HeaderTittle name={props.children} />,
    headerTintColor: 'black',
    headerStyle: {
        backgroundColor: 'white'
    }
})}
>
<Stack.Screen
    options={{
        headerRight: () => <View style={{
            flexDirection:  'row',
            padding: 15,
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        }}>
        <TouchableOpacity onPress = {() => {
                handleLogOut()
        }}>
            <Icon
                name={'logout'}
                size={24}
                color={'red'}
            />
        </TouchableOpacity>
        </View>
    }}
    name="QTEST"
    component={TestListScreen}

/>
<Stack.Screen
    name="Test"
    component={TestScreen}
/>
<Stack.Screen
    name="UserResults"
    component={UserResultsScreen}
    options={({navigation}) => ({
        headerTitle: '',
        headerLeft: () => {
        return(
            <TouchableOpacity 
                style={{
                    padding: 15,
                    width: '100%',
                    flex: 1, 
                    justifyContent: 'center', 
                    alignItems: 'center', 
                    }} 
                onPress={() => navigation.navigate('QTEST')}
            >
                <Icon
                    name={'home'}
                    size={24}
                    color={'red'}
                />
            </TouchableOpacity>
        )},
      })}
/>
</Stack.Navigator>
);*/