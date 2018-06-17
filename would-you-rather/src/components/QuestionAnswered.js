import React, { Component } from 'react'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'

import { isInArray, formatDate, convertToPercentageString } from '../utils/helpers'
import { handleAnswerQuestion } from '../actions/questions'
import { handleUpdateUserAnswer } from '../actions/users'
import { handleQuestionVote } from '../actions/shared'

import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import DoneIcon from '@material-ui/icons/Done';

class QuestionAnswered extends Component {

    render() {
        const { question, author, userAnswer } = this.props

        const totalVotes = question.optionOne.votes.length + question.optionTwo.votes.length

        var optionOnePercent = convertToPercentageString(question.optionOne.votes.length, totalVotes)
        var optionTwoPercent = convertToPercentageString(question.optionTwo.votes.length, totalVotes)

        return (
            <Paper className='answeredQuestionPaper centerBox'>
                    <Typography variant="title" className='center'>Asked at: {formatDate(question.timestamp)}</Typography>
                        
                    <Table >
                        <TableHead>
                            <TableRow>
                                <TableCell className="gridRowText">Answer Description</TableCell>
                                <TableCell numeric>Votes</TableCell>
                                <TableCell numeric>Percent</TableCell>
                                <TableCell numeric>Your vote</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell component="th" scope="row" variant="body">{question.optionOne.text}</TableCell>
                                <TableCell numeric>{question.optionOne.votes.length}</TableCell>
                                <TableCell numeric>{optionOnePercent}</TableCell>
                                <TableCell numeric> {userAnswer === "optionOne" ? <DoneIcon /> : null}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">{question.optionTwo.text}</TableCell>
                                <TableCell numeric>{question.optionTwo.votes.length}</TableCell>
                                <TableCell numeric>{optionTwoPercent}</TableCell>
                                <TableCell numeric> {userAnswer === "optionTwo" ? <DoneIcon /> : null}</TableCell>
                            </TableRow>
                    </TableBody>
                    </Table>
            </Paper>
        )
    }
}


QuestionAnswered.propTypes = {
    id: PropTypes.string.isRequired
}

function mapStateToProps({ authedUser, users, questions }, { id }) {
    const question = questions[id]
    var userAnswer = '';

    if (isInArray(question.optionOne.votes, authedUser.id)) {
        userAnswer = "optionOne"
    } else if (isInArray(question.optionTwo.votes, authedUser.id)) {
        userAnswer = "optionTwo"
    }

    return {
        question,
        userAnswer
    }
}

export default connect(mapStateToProps)(QuestionAnswered)

