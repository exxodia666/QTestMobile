export interface IChoiceTypes {
    id: string
    question_id: string
    text: string
    isSelected: boolean
    toggleSelect: (e: boolean) => void
    //setFalseAllChoices: () => void
}
