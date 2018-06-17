import React, { Component } from 'react'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'

import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography';

class Leader extends Component {
    render() {

        const { user, questions } = this.props

        var askCount = 0;

        for(var index in questions){
            if(questions[index].author === user.id){
                askCount += 1
            }
        }

        const answerCount = Object.keys(user.answers).length 

        return (
            <Paper className='leader'>
                <div>
                    <img
                        src={user.avatarURL}
                        alt={`Avatar of ${user.name}`}
                        className='avatar'
                    />

                    <Typography variant="title">{user.name}</Typography>
                </div>

                    <div>
                        <Typography>
                            Questions Answered: {answerCount}
                        <br/>
                            Questions Asked: {askCount}
                        </Typography>
                    </div>
            </Paper>
        )
    }
}


Leader.propTypes = {
    id: PropTypes.string.isRequired
}

function mapStateToProps({ users, questions }, { id }) {
    const user = users[id]

    return {
        user: user,
        questions
    }
}

export default connect(mapStateToProps)(Leader)
