import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import { handleInitialData } from '../actions/shared'
import QuestionList from './QuestionList'
import Nav from './Nav'
import NewQuestion from './NewQuestion'
import QuestionPage from './QuestionPage'
import Leaderboard from './Leaderboard'
import UserSelectorList from './UserSelectorList'
import User from './User'

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }

  render() {
    return (
      <Router>
        <Fragment>
           <div className='container'>
            {this.props.isAuthed
              ?
              <div>
                <Nav user={this.props.authedUser} />
                
                <div className="topMargin"> 
                  <Route path='/' exact component={QuestionList} />
                  <Route path='/answered' render={(props) => <QuestionList {...props} showAnswered={true} />} />
                  <Route path='/question/:id' component={QuestionPage} />
                  <Route path='/add' component={NewQuestion} />
                  <Route path='/leaderboard' component={Leaderboard} />
                  <Route path='/changeUser' component={UserSelectorList} />
                </div>
                <div>
                </div>
              </div>
              : <UserSelectorList />
            }
          </div>
        </Fragment>
      </Router>
    );
  }
}

function mapStateToProps(state) {

  if(state.authedUser !== null && state.authedUser.id !== null){

    console.log(state.users[state.authedUser.id])
    return {
      isAuthed: true,
      authedUser: state.users[state.authedUser.id]
    } 
  }

  return {
    isAuthed: false,
    authedUser: null
  }
}

export default connect(mapStateToProps)(App);
