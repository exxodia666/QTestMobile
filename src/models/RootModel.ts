import React from "react";
import ResultListModel from "./ResultsModel";
import ResultTypes from "./ResultsModel/ResultTypes";
import TestListModel from "./TestListModel";
import ITestTypes from "./TestModel/ITestTypes";
import UserModel from "./UserModel";
import User from "./UserModel/UserTypes";
const initialTestListStore: ITestTypes[] = [{
    id: '',
    quiz_name: '',
    creation_date: new Date(),
    questions: [
        {
            id: '',
            quiz_id: '',
            wording: '',
            text: '',
            choices: [{
                id: '',
                question_id: '',
                isSelected: false,
                text: ''
            }],
            is_multiple_choice: false,
        },
    ],
}];

const initialUserStore: User = {
    name: '',
    id: '',
    key: ''
};

const initialResultListStore: ResultTypes[] = [{
    name: '',
    id: '',
    rating: 0
}];



export const stores = Object.freeze({
    UserStore: new UserModel(initialUserStore.id, initialUserStore.name),
    TestListStore: new TestListModel(initialTestListStore),
    ResultListStore: new ResultListModel(initialResultListStore)
});
export const storesContext = React.createContext(stores);
export const StoresProvider = storesContext.Provider;