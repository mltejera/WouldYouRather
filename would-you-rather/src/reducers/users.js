import { RECEIVE_USERS, UPDATE_USER_ANSWER } from '../actions/users'
import { isInArray } from '../utils/helpers'

export default function users (state = {}, action){
    switch(action.type){
        case RECEIVE_USERS :
            return {
                ...state, 
                ...action.users
            }
        case UPDATE_USER_ANSWER : {
            let newState = {...state};

            newState[action.authedUser.id].answers[action.qid] = action.answer        

            return newState
        }
        default :
            return state
    }
}