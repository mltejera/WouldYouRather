import React, { Component } from 'react'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'

import { isInArray } from '../utils/helpers'
import QuestionAnswered from './QuestionAnswered'
import QuestionUnAnswered from './QuestionUnAnswered'

class Question extends Component {
    render() {
        const { question, hasAnswered } = this.props
     
        if(hasAnswered){
            return <QuestionAnswered id={question.id}/>
        } else {
            return <QuestionUnAnswered id={question.id}/>
        }
    }
}


Question.propTypes = {
    id: PropTypes.string.isRequired
}

function mapStateToProps({authedUser, users, questions}, { id }){

    const question = questions[id]
    const questionsAnsweredByAuthedUser = Object.keys(users[authedUser.id].answers)
    
    const hasAnswered = isInArray(questionsAnsweredByAuthedUser, id)
    
    return { 
        hasAnswered,
        question
    }
}

export default connect(mapStateToProps)(Question)