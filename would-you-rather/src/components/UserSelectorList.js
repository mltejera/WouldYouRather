import React, { Component } from 'react'
import { connect } from 'react-redux'
import UserSelector from './UserSelector'

import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography';

class UserSelectorList extends Component {
    render() {

        const { userIds } = this.props

        return (
            <div className="centerBox">
            <Paper className="questionCard centerBox">
                <Typography variant="title" className='center'>Select a user</Typography>

                <ul className='dashboard-list'>
                    {userIds.map((id) => (
                        <li key={id} >
                            <UserSelector id={id} />
                        </li>
                    ))}
                </ul>
            </Paper> 
            </div>
        )
    }
}

const mapStateToProps = ({users}) => ({
        userIds: Object.keys(users)
})


export default connect(mapStateToProps)(UserSelectorList)