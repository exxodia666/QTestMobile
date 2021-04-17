import  AsyncStorage  from "@react-native-community/async-storage";

export const _storeData = async (model: string, value: any) => {
    try {
        await AsyncStorage.setItem(
            `@${model}`,
            JSON.stringify(value)
        );
    } catch (error) {
        // Error saving data
    }
};

export const _retrieveData = async (model: string) => {
    try {
        const value = await AsyncStorage.getItem(`@${model}`);
        if (value !== null) {
            // We have data!!

            return (JSON.parse(value));
        }
    } catch (error) {
        // Error retrieving data
    }
};