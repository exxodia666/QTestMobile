import { IChoiceTypes } from './../ChoicesModel/IChoices';
import { action, computed, makeObservable, observable, runInAction } from "mobx";
import { IQuestionTypes } from "../QuestionModel/IQuestionTypes";
import ITestTypes from "./ITestTypes";
import QuestionModel from '../QuestionModel';
import status from "../../enum/status";
import axios from "axios";
import ChoiceModel from "../ChoicesModel/ChoiceModel";
import User from '../UserModel/UserTypes';
import { url } from '../urls';

type answer = {
    question_id: string,
    choices_id: string[]
}
type RequestType = {
    dude_id: string,
    answers: answer[]
}
type ResponseType = {
    choices: IChoiceTypes[],
    question: IQuestionTypes
}
class TestModel implements ITestTypes {
    id = '';
    quiz_name = '';
    creation_date = new Date();
    questions_count: number = 0;
    questions: IQuestionTypes[] = [];
    status = status.pending;
    rating = 0;
    user_rating = [];
    message = ''
    constructor(id: string = '',
        quiz_name: string = '',
        creation_date: Date = new Date(''),
        questions_count: number = 0,
        questions: IQuestionTypes[] = []) {
        this.id = id;
        this.questions_count = questions_count;
        this.quiz_name = quiz_name;
        this.creation_date = creation_date;
        makeObservable(this, {
            user_rating: observable,
            rating: observable,
            id: observable,
            creation_date: observable,
            questions_count: observable,
            quiz_name: observable,
            questions: observable,
            fetchQuestions: action,
            sendAnswers: action,
            computedRating: computed,
            message: observable
        })
    }

    get computedRating() {
        return this.rating * 100;
    }

    fetchQuestions = async (id: string) => {
        this.questions = []
        this.status = status.pending;
        try {
            const res = await axios.get(url.test(id));
            const questions: IQuestionTypes[] = res.data.questions.map(
                (item: ResponseType) => {
                    return new QuestionModel(item.question.id,
                        item.question.quiz_id,
                        item.question.wording,
                        item.question.text,
                        item.question.image,
                        item.question.is_multiple_choice,
                        item.choices.map(i => {
                            return new ChoiceModel(i.id, i.question_id, i.text)
                        }))
                })

            runInAction(() => {
                this.status = status.success
                this.questions = questions;
            })
        } catch (error) {
            runInAction(() => {
                this.status = status.error
                this.message = error
            })
        }
    }

    sendAnswers = async (user: User) => {
        this.status = status.pending;
        const reqObj: RequestType = {
            dude_id: user.id,
            answers: this.questions.map(item => {
                const answer: answer = {
                    question_id: item.id,
                    choices_id: item.choices.filter((i: IChoiceTypes) =>
                        i.isSelected === true
                    ).map(i => i.id)
                }
                return answer;
            })
        }
        try {
            const res = await axios.post(url.answers(this.id), reqObj);
            const UserRes = await axios.get(url.answers(this.id));
          
            runInAction(() => {
                this.status = status.success;
                this.user_rating = UserRes.data.results;
                
            })
        } catch (error) {
            runInAction(() => {
                this.status = status.error;
                this.message = error;
            })
        }
    }
}
export default TestModel;

/*
{"results": [
    {
        "dude": [Object], 
        "pass_date": "2021-01-16T18:32:02.805031+02:00", 
        "quiz": [Object], 
        "rating": 1
    }, 
    {
        "dude": [Object], 
        "pass_date": "2021-01-16T19:07:39.942250+02:00", 
        "quiz": [Object], 
        "rating": 1}, 
    {
        "dude": [Object], "pass_date": "2021-01-16T19:15:41.611293+02:00", "quiz": [Object], "rating": 1}]}*/