import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import User from './User'

import { withStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Icon from '@material-ui/core/Icon';
import HomeIcon from '@material-ui/icons/Home';
import DoneIcon from '@material-ui/icons/DoneAll';
import AddNewIcon from '@material-ui/icons/NoteAdd';
import ListIcon from '@material-ui/icons/ViewList';


class Nav extends Component {
  state = {
    value: '',
  };

  handleChange = (event, value) => {
    this.setState({ value });
    this.props.history.push(`/` + value.toString())
  };

  render() {
    const { classes, user } = this.props;
    const { value } = this.state;


    return (
    <div>
      <BottomNavigation value={value} onChange={this.handleChange}>
        <BottomNavigationAction label="Unanswered" value="" icon={<HomeIcon />} />
        <BottomNavigationAction label="Answered" value="answered" icon={<DoneIcon />} />
        <BottomNavigationAction label="New question" value="add" icon={<AddNewIcon />} />
        <BottomNavigationAction label="Leaders" value="leaderboard" icon={<ListIcon/>} />
        <BottomNavigationAction value="changeUser" icon={<User user={this.props.user}  isClickable={true} />} />
      </BottomNavigation>
    </div>
    )
  }
}

export default withRouter(Nav)
