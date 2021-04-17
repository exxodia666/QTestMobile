import { IChoiceTypes } from './../ChoicesModel/IChoices';

export interface Image {
    id: string,
    picture: string

}

export interface IQuestionTypes {
    id: string,
    quiz_id: string
    wording: string
    text: string
    image: Image
    is_multiple_choice: boolean
    choices: IChoiceTypes[]
    setFalseAllChoices: () => void
}