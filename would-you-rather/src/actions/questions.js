import {saveQuestionAnswer, saveQuestion} from '../utils/api'
import { hideLoading, showLoading } from 'react-redux-loading'

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ANSWER_QUESTION = 'ANSWER_QUESTION'
export const ADD_QUESTION = 'ADD_QUESTION'

export function receiveQuestions(questions) {
    return {
        type: RECEIVE_QUESTIONS,
        questions
    }
}

export function answerQuestion({authedUser, qid, answer}){
    return {
        type: ANSWER_QUESTION,
        authedUser,
        qid,
        answer
    }
}

export function addQuestion(question){
    return {
        type: ADD_QUESTION,
        question
    }
}

export function handleAddQuestion (info){
    return (dispatch, getState)  => {

    const { authedUser } = getState()
    
    return saveQuestion({
        optionOneText: info.optionOneText,
        optionTwoText: info.optionTwoText,
        authedUserId: authedUser.id
        })
        .then((question) => dispatch(addQuestion(question)))
    }
}

export function handleAnswerQuestion (info){
    return dispatch => {
        dispatch(answerQuestion(info))

    return saveQuestionAnswer(info)
        .catch((e) => {
            console.warn("Error in handleAnswerQuestion")
            dispatch(answerQuestion(info))
            alert('There was an error answering this question')
        })
    }
}