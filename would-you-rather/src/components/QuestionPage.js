import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Question from './Question'

class QuestionPage extends Component {
    render() {

        const {questions} = this.props

        var questionIds = Object.keys(questions)
        var questionId = this.props.questionId.id

        if(questionIds.includes(questionId)){
            return (
            <div className='centerBox'>
                <Question id={questionId} />
            </div>
            )
        } else {
            return <div>404, question not found</div>
        }


    }
}

function mapStateToProps({questions}, props){

    const questionId = props.match.params
    return {
        questionId,
        questions

    }
}

export default connect(mapStateToProps)(QuestionPage)