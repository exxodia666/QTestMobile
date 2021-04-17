import { Alert } from "react-native";
import User from "../models/UserModel/UserTypes";
export default function handleLogOut(user: User): void {
    user.name.length ? user.logoutUser!() : Alert.alert('You are not logged');
}
    