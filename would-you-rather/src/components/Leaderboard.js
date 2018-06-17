import React, { Component } from 'react'
import { connect } from 'react-redux'

import Leader from './Leader'

import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'

class Leaderboard extends Component {
    render() {
        const userIds = this.props.userIds
        return (

            <Grid container spacing={16}>
                <Grid item xs={12}>
                    <Grid container justify="center" spacing={16}>
                            {userIds.map((id) => (
                                <Grid item key={id}>
                                    <Leader id={id} />
                                </Grid>
                            ))}
                    </Grid>
                </Grid>
            </Grid>
        )
    }
}

function mapStateToProps({ users }) {
    return {
        userIds: Object.keys(users)
            .sort((a, b) => calcScore(users[b]) - calcScore(users[a]))
    }
}

function calcScore(user) {
    return user.questions.length + Object.keys(user.answers).length
}

export default connect(mapStateToProps)(Leaderboard)