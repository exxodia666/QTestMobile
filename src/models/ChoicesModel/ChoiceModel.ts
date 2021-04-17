import { action } from 'mobx';
import { observable } from 'mobx';
import { makeObservable } from 'mobx';
import { IChoiceTypes } from './IChoices';

class ChoiceModel implements IChoiceTypes {
    id = '';
    question_id = '';
    text = ''
    isSelected = false;
    

    constructor(id: string, question_id: string, text: string) {
        makeObservable(this, {
            id: observable,
            question_id: observable,
            text: observable,
            isSelected: observable,
            toggleSelect: action
        })
        this.id = id;
        this.question_id = question_id;
        this.text = text;

    }

    toggleSelect = (e: boolean): void => {
        this.isSelected = e;
    }
}
export default ChoiceModel;