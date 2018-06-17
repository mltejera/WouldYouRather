import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { formatQuestion, formatDate } from '../utils/helpers'
import { handleAnswerQuestion } from '../actions/questions'
import { handleUpdateUserAnswer} from '../actions/users'
import { handleQuestionVote} from '../actions/shared'
import User from './User'

import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography';

var votingEnums = {optionOne:"optionOne", optionTwo:"optionTwo"}
Object.freeze(votingEnums)

class QuestionUnAnswered extends Component {

    handleVote = (option, e) => {
        e.preventDefault()
        const { dispatch, question, authedUser, author } = this.props
           
        dispatch(handleQuestionVote({
            authedUser: authedUser,
            qid: question.id,
            answer: option.toString()
        }))
        
        this.navToQuestion()
      }

      navToQuestion () {
        this.props.history.push(`/question/${this.props.question.id}`) 
      }

    render() {
        const { question, author, } = this.props
        
        return (
            <Paper className='questionCard centerBox'>
                    <Typography variant="title" className="center">Would you rather?</Typography>                        
                    
                    <Typography variant="subheading">{question.optionOne.text}</Typography>
                        <Button variant="contained" onClick={(e) => this.handleVote(votingEnums.optionOne, e)}>Vote</Button>

                    <Typography variant="subheading">{question.optionTwo.text}</Typography>
                        <Button variant="contained" onClick={(e) => this.handleVote(votingEnums.optionTwo, e)}>Vote</Button>
                    
                    <Typography variant="body2">
                     Asked By:
                    </Typography>
                    <User user={author} isClickable={false}/>
            </Paper>
        )
    }
}

QuestionUnAnswered.propTypes = {
    id: PropTypes.string.isRequired
}

function mapStateToProps({authedUser, users, questions}, { id }){
    const question = questions[id]
    const author = users[question.author]
    
    return { 
        authedUser,
        users,
        author,
        question
    }
}

export default withRouter(connect(mapStateToProps)(QuestionUnAnswered))