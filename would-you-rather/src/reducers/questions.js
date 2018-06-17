import { RECEIVE_QUESTIONS, ANSWER_QUESTION, ADD_QUESTION } from '../actions/questions'
import { isInArray } from '../utils/helpers'
export default function questions (state = {}, action){
    switch(action.type){
        case RECEIVE_QUESTIONS :
            return {
                ...state, 
                ...action.questions
            }
        case ANSWER_QUESTION :
                let newState = {...state};

                if(!isInArray(newState[action.qid][action.answer].votes, action.authedUser.id)){
                    newState[action.qid][action.answer].votes = newState[action.qid][action.answer].votes.concat(action.authedUser.id)
                }
                 
                return newState

        case ADD_QUESTION :
                return {
                    ...state,
                    [action.question.id]: action.question
                }
        default :
            return state
    }
}
