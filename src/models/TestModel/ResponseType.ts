import { IQuestionTypes } from './../QuestionModel/IQuestionTypes';


type ResponseType = {
                id: string,
                quiz_id: string,
                wording: string,
                text: "",
                "image": "https://cdn.discordapp.com/attachments/709748357572198421/787722796008472576/928f2db43a9f7474.jpg",
                "is_multiple_choice": true
            },
            "choices": [
                {
                    "id": "2e866d7e-d69f-47f1-a465-2b92df316e2c",
                    "question_id": "fa872d97-f9ff-40fe-a469-d70eff9b2b7a",
                    "text": "Answers"
                },
                {
                    "id": "ed635c6f-c66e-449b-b869-4b03cbd97393",
                    "question_id": "fa872d97-f9ff-40fe-a469-d70eff9b2b7a",
                    "text": "Роздрочене очко"
                },
                {
                    "id": "d23bd7ba-7355-4180-91ea-f7a4de44ae44",
                    "question_id": "fa872d97-f9ff-40fe-a469-d70eff9b2b7a",
                    "text": "Callback"
                }
            ]
        }
    ]
}

export default ResponseType;