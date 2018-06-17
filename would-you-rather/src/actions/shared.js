import { getInitialData } from '../utils/api'
import { receiveUsers, handleUpdateUserAnswer } from '../actions/users'
import { receiveQuestions, handleAnswerQuestion } from '../actions/questions'
import { setAuthedUser } from '../actions/authedUser'

export function handleInitialData (){
    return (dispatch) => {
        return getInitialData()
            .then(({users, questions}) => {
                dispatch(receiveUsers(users))
                dispatch(receiveQuestions(questions))
                dispatch(setAuthedUser(null))
            })
    }
}

export function handleQuestionVote (info){
    return (dispatch) => {
        dispatch(handleUpdateUserAnswer(info))
        dispatch(handleAnswerQuestion(info))
    }
}