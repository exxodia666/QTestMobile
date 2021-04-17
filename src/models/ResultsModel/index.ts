import axios from 'axios';
import { observable, action, makeObservable, runInAction } from 'mobx';
import status from '../../enum/status';
import ResultModel from './ResultModel';
import ResultTypes from './ResultTypes';

class ResultListModel {
    results: ResultTypes[] = [];
    status: status = status.success;
    errors: null;

    constructor(result_list: ResultTypes[]) {
        makeObservable(this, {
            status: observable,
            results: observable,
            fetchResults: action
        })
        this.results = result_list.map(({ id, name, rating }: ResultTypes) => new ResultModel(id, name, rating))
    }

    async fetchResults() {
        this.results = []
        this.status = status.pending;
        try {
            // const res = await axios.get('http://134.249.181.40:7777/api/');
            // const tests: ResultTypes[] = res.data.quizzes.map(({ id, creation_date, questions_count, quiz_name }: ResponseType) => new TestModel(id, quiz_name, creation_date, questions_count, []));

            runInAction(() => {
                this.status = status.success
                // this.results = tests;
            })
        } catch (error) {
            runInAction(() => {
                this.status = status.error;
                this.errors = error;
            })
        }
    }
}
export default ResultListModel;