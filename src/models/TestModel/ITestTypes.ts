import status from "../../enum/status";
import { IQuestionTypes } from "../QuestionModel/IQuestionTypes";
import User from "../UserModel/UserTypes";


export type UserRating = {
    user_name: string
    user_rating: number
    user_pass_data: Date 
}
export default interface ITestTypes {
    id: string
    quiz_name: string
    creation_date: Date
    questions_count: number
    questions?: IQuestionTypes[] | null
    status?: status
    rating?: number
    user_rating?: UserRating[]
    fetchQuestions?: (id: string) => void
    sendAnswers?: (user: User) => void
    clearTest?: () => void
    message?: string
}