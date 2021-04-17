import axios from "axios";
import { stat } from "fs";
import { action, makeObservable, observable, runInAction } from "mobx";
import status from "../../enum/status";
import { _retrieveData, _storeData } from "../AsyncStorage";
import { url } from "../urls";
import User, { result } from "./UserTypes";

// const data = {
//     dude: {
//         editing_key: "pbkdf2_sha256$216000$0OktNVkh2K3r$NtybgVd9X9KNok6th4k4YrnZoF+PBdffIyooietvcXs=",
//         id: "81ffbfde-f8d6-4a45-8711-fc2ffec26d50",
//         name: "KEkwas"
//     },
//     message: "Hi KEkwas"
// }

// type dudeType = {
//     editing_key: string,
//     id: string,
//     name: string
// }

// type ResType = {
//     dude: dudeType
//     message: string
// }

class UserModel implements User {
    name: string = '';
    id: string = '';
    status: status = status.idle;
    errors?: any = '';
    key: string = '';
    results: result[] = [];
    constructor(id: string, name: string) {
        makeObservable(this, {
            name: observable,
            results: observable,
            id: observable,
            key: observable,
            status: observable,
            errors: observable,
            authUser: action,
            logoutUser: action,
            loadFromAsync: action,
            fetchResults: action,
            clearResults: action,
            resetStatus: action
        })
        this.id = id;
        this.name = name;
    }

    async authUser(name: string) {
        this.name = ''
        this.status = status.pending;
        try {
            const res = await axios.post(url.login(), {
                dude: {
                    name
                }
            });
            runInAction(() => {
                this.status = status.success
                this.name = res.data.dude.name;
                this.id = res.data.dude.id;
                this.key = res.data.dude.editing_key;
                const user: User = {
                    name: this.name,
                    id: this.id,
                    key: this.key,
                }
                _storeData('UserModel', { ...user, errors: '', status: ''});
            })
        } catch (error) {
            runInAction(() => {
                this.status = status.error;
                this.errors = error;
            })
        }
    }
    
    resetStatus() {
        this.status = status.idle
    }

    async logoutUser() {
        this.status = status.pending;
        const req = {
            editing_key: this.key
        }
        try {
            const res = await axios.delete(url.logout(this.id), { data: req });
            runInAction(() => {
                this.status = status.success
                this.results = [];
                const user: User = {
                    id: '',
                    name: '',
                    key: ''
                }
                this.name = '';
                this.id = '';
                this.key = '';
                _storeData('UserModel', user);
            })
        } catch (error) {
            runInAction(() => {
                this.status = status.error;
                this.errors = error;
            })
        }
    }

    async loadFromAsync() {
        const data = await _retrieveData('UserModel');
     
        runInAction(() => {
            this.name = data.name;
            this.id = data.id;
            this.key = data.key;
        })
    }

    async fetchResults() {
        try {
            this.status = status.pending;
            const res = await axios.get(url.results(this.id));
            runInAction(() => {
                this.status = status.success;
                this.results = res.data.dude.results.map((e: any) => {
                    const obj: result = {
                        quiz_name: e.quiz.quiz_name,
                        rating: e.rating,
                        pass_date: e.pass_date
                    }
                    return obj;
                });
            })
        } catch (e) {
            runInAction(() => {
                this.status = status.error;
                this.errors = e;
            })
        }
    }

    clearResults() {
        this.results = [];
        this.status = status.idle;
    }
}

export default UserModel;