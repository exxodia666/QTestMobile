import { makeObservable, observable } from 'mobx';
import ChoiceModel from './ChoiceModel';
import { IChoiceTypes } from "./IChoices";

class ChoiceListModel {
    choices: IChoiceTypes[] = []
    constructor(choices: IChoiceTypes[]) {
        this.choices = choices.map((e: IChoiceTypes) => new ChoiceModel(e.id, e.question_id, e.text));
        makeObservable(this, {
            choices: observable
        })
    }
}
export default ChoiceListModel