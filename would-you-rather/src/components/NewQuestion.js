import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAddQuestion } from '../actions/questions'
import { Redirect } from 'react-router-dom'

import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper'


class NewQuestion extends Component {
  state = {
    optionOneText: '',
    optionTwoText: '',
    toHome: false,
  }


  handleOptionOneChange = (e) => {
    const optionOneText = e.target.value

    this.setState(() => ({
      optionOneText
    }))
  }

  handleOptionTwoChange = (e) => {
    const optionTwoText = e.target.value

    this.setState(() => ({
      optionTwoText
    }))
  }

  handleSubmit = (e) => {
    e.preventDefault()

    const { optionOneText, optionTwoText } = this.state
    const { dispatch } = this.props

    dispatch(handleAddQuestion({ optionOneText, optionTwoText }))

    this.setState(() => ({
      optionOneText: '',
      optionTwoText: '',
      toHome: true,
    }))
  }
  render() {
    const { optionOneText, optionTwoText, toHome } = this.state

    if (toHome === true) {
      return <Redirect to='/' />
    }

    const optionOneLeft = 120 - optionOneText.length
    const optionTwoLeft = 120 - optionTwoText.length

    const inputProps = { maxLength: 120 }

    return (
      <div className="centerBox">
        <Paper className='questionCard centerBox'>
          <Typography variant="title" className='center'>Compose new question</Typography>

          <TextField
            placeholder="What's your first option?"
            onChange={this.handleOptionOneChange}
            className='bottomMargin'
            value={optionOneText}
            required={true}
            multiline
            margin="normal"
            inputProps={inputProps} />

          {optionOneLeft <= 100 && (
            <Typography color="error"
              variant="body1"
              gutter="true">
              {optionOneLeft}
            </Typography>
          )}

          <TextField
            placeholder="And your second?"
            onChange={this.handleOptionTwoChange}
            value={optionTwoText}
            margin="normal"
            required
            multiline
            inputProps={inputProps} />

          {optionTwoLeft <= 100 && (
            <Typography color="error"
              variant="body1"
              gutter="true">
              {optionTwoLeft}
            </Typography>
          )}

          <Button
            variant="contained"
            color="primary"
            margin="normal"
            onClick={this.handleSubmit}
            disabled={optionOneText === '' || optionTwoText === ''}>
            Submit
          </Button>
        </Paper>
      </div>
    )
  }
}

export default connect()(NewQuestion)