import axios from 'axios';
import { observable, action, makeObservable, runInAction } from 'mobx';
import TestModel from "../TestModel";
import ITestTypes from "../TestModel/ITestTypes";
import TestListType from './TestListTypes';
import ResponseType from './ResponseType'
import status from '../../enum/status';
import { url } from '../urls';

class TestListModel implements TestListType {
    test_list: ITestTypes[] = [];
    status: status = status.success;
    errors: string = '';
    private_test_list: ITestTypes[] = [];

    constructor(test_list: ITestTypes[]) {
        makeObservable(this, {
            status: observable,
            test_list: observable,
            fetchTests: action,
            clearTests: action,
            
        })
        this.test_list = test_list.map(({ id, quiz_name, questions_count, creation_date, questions }: ITestTypes) => new TestModel(id, quiz_name, creation_date, questions_count, questions))
    }
    async fetchTests(id?: string ) {
        console.log('Fetching');
        this.test_list = []
        this.status = status.pending;
        try {
            let req_url = url.test_list();
            if(id) {
                req_url = url.private_test(id)
            } 
         
            const res = await axios.get(req_url);
            let tests: ITestTypes[] = [];
            if(id) {
              
                tests = [new TestModel(res.data.quiz.id, res.data.quiz.creation_date, res.data.questions.length, res.data.quiz.quiz_name, [])];
            } else if(!id){
                tests = res.data.quizzes.map(({ id, creation_date, questions_count, quiz_name }: ResponseType) => new TestModel(id, quiz_name, creation_date, questions_count, []));
            }
            runInAction(() => {
                
                this.status = status.success
                if(id) {
                    this.private_test_list = tests;
                } else {
                    this.test_list = tests;
                }
           
            })
        } catch (error) {
            runInAction(() => {
                this.status = status.error;
                this.errors = error;
            })
        }
    }

    clearTests(){
        const test = new TestModel();
        this.test_list = [test];
        this.errors = '';
        this.status = status.idle;
    }


}
export default TestListModel;