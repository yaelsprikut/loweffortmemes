import React from 'react'
import Card from 'react-bootstrap/Card'

interface Props {
  theme: any
  post: any
  spinner: any
  onClick: any
}

interface State {
  data: {}
}

class SubReddit extends React.Component<Props, State> {
  render() {
    const { post, spinner } = this.props

    // const randomPhraseArray = [
    //   'Pogonophobia is the fear of beards',
    //   'Playing dance music can help ward off mosquitoes',
    //   'Cherophobia is the word for the irrational fear of being happy.',
    //   "Marie Curie's notebooks are still radioactive.",
    //   'The King of Hearts is the only king in a deck of cards without a mustache',
    //   "A 'jiffy' is about one trillionth of a second",
    //   'The real name of Monopoly mascot Uncle Pennybags is Milburn Pennybags.',
    //   'The first email was sent by Ray Tomlinson to himself in 1971.',
    //   'Space travel makes mice run in loops.'
    // ]
    // const random = Math.floor(Math.random() * randomPhraseArray.length)
    const fileExtensionRegex = /\.[0-9a-z]+$/i

    const card = (post: any) => (
      <div>
        <Card.Header className="card-head">
          from{' '}
          <a
            href={`https://reddit.com/${post.subreddit_name_prefixed}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {post.subreddit_name_prefixed}
          </a>{' '}
          <br />
          {post.title}
        </Card.Header>
        <Card.Body>
          {post.url.match(fileExtensionRegex) || post.url.includes('imgur') ? (
            <img src={post.url} className="responsive" alt="funny meme" />
          ) : (
            <p>
              {post.selftext}
              <br />
              <b>tap for next meme</b>
            </p>
          )}
        </Card.Body>
      </div>
    )
    return (
      <Card key={'idx'} text={'dark'} className="responsive">
        <span onClick={this.props.onClick}>
          {post && post.url ? card(post) : spinner}
        </span>
        <Card.Footer className="text-muted"></Card.Footer>
        <div>
          <br />
          <p>
            <small className="bottomText">
              Can't see the meme? Here's the{' '}
              <a href={post.url} target="_blank" rel="noopener noreferrer">
                OG URL
              </a>
            </small>
          </p>
        </div>
      </Card>
    )
  }
}

export default SubReddit
