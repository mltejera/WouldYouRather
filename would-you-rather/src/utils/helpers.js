export function formatDate(timestamp) {
  const d = new Date(timestamp)
  const time = d.toLocaleTimeString('en-US')
  return time.substr(0, 5) + time.slice(-2) + ' | ' + d.toLocaleDateString()
}

export function formatTweet(tweet, author, authedUser, parentTweet) {
  const { id, likes, replies, text, timestamp } = tweet
  const { name, avatarURL } = author

  return {
    name,
    id,
    timestamp,
    text,
    avatar: avatarURL,
    likes: likes.length,
    replies: replies.length,
    hasLiked: likes.includes(authedUser),
    parent: !parentTweet ? null : {
      author: parentTweet.author,
      id: parentTweet.id,
    }
  }
}

export function formatQuestion(question) {
  const { id, author, optionOne, optionTwo, timestamp } = question
  //const { name, avatarURL } = author


  return {
    id,
    timestamp,
    author,
    optionOneText: optionOne.text,
    optionTwoText: optionTwo.text,
    optionOneVoteCount: optionOne.votes.length,
    optionTwoVoteCount: optionTwo.votes.length
  }
}

export function isInArray(array, value) {
  for (var i = 0; i < array.length; i++) {
    if (value === array[i]) {
      return true;
    }
  }

  return false
}

export function convertToPercentageString(numerator, total) {

  var decimal = (numerator / total) * 100
  var rounded = Math.round(decimal)
  var string = rounded.toString() + "%"

  return string
}