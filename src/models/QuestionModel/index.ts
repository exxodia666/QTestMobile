import { action } from 'mobx';
import { observable } from 'mobx';
import { makeObservable } from 'mobx';
import ChoiceModel from '../ChoicesModel/ChoiceModel';
import { IChoiceTypes } from './../ChoicesModel/IChoices';
import { Image, IQuestionTypes } from './IQuestionTypes';

class QuestionModel implements IQuestionTypes {
    id = 'string';
    quiz_id = '';
    wording = '';
    text: string;
    image: Image;
    is_multiple_choice = false;
    choices: IChoiceTypes[] = [];

    constructor(id: string,
        quiz_id: string,
        wording: string,
        text: string,
        image: Image,
        is_multiple_choice: boolean,
        choices: IChoiceTypes[]) {
        this.id = id;
        this.quiz_id = quiz_id;
        this.wording = wording;
        this.text = text;
        this.image = image;
        this.is_multiple_choice = is_multiple_choice;
        this.choices = choices.map(e => new ChoiceModel(e.id, e.question_id, e.text));
        makeObservable(this, {
            quiz_id: observable,
            wording: observable,
            text: observable,
            image: observable,
            is_multiple_choice: observable,
            choices: observable,
            setFalseAllChoices: action
        })
    }
    setFalseAllChoices = () => {
        if (!this.is_multiple_choice) {
            this.choices.forEach(e => e.isSelected = false);
        }
    }
}
export default QuestionModel;