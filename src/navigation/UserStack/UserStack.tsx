import React, { useEffect } from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import UserScreen from '../Screens/UserScreen';
import User from '../../models/UserModel/UserTypes';
import { useStore } from '../../hooks/useStore';
import { Alert } from 'react-native';
import HeaderTittle from '../../components/HeaderTittle/HeaderTittle';
import { observer } from 'mobx-react-lite';
import Logout from '../../components/LogoutButton/Logout';
import handleLogOut from '../../utils/handleLogout';

const UserStack: React.FC = () => {
    const Stack = createStackNavigator();
    const user: User = useStore('UserStore');
    useEffect(() => {
        user.loadFromAsync!();
    }, []);
    return (
        <Stack.Navigator
            screenOptions={() => ({
                headerTitle: () => <HeaderTittle name={`${user.name}`}/>,
                headerTintColor: '#fff',
                headerStyle: {
                    backgroundColor: 'white'
                }
            })}
        >
            <Stack.Screen
                name="User"
                component={UserScreen}
                options={{
                    headerRight: () => <Logout handleLogOut = {() => handleLogOut(user)}/>
                }}
            />
        </Stack.Navigator>
    );
}

export default observer(UserStack);