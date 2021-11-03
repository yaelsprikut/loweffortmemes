import React from 'react'
import Card from 'react-bootstrap/Card'

interface Props {
  theme: any
  post: any
  spinner: any
}

interface State {
  data: {}
}

class SubReddit extends React.Component<Props, State> {
  render() {
    const { theme, post, spinner } = this.props
    const alternateFormatArray = [
      'gifv',
      'makeameme',
      'v.redd.it',
      'reddit',
      'streamable',
      'imgur',
      'gfycat',
      'youtu.be',
      'youtube'
    ]
    const randomPhraseArray = [
      'Pogonophobia is the fear of beards',
      'Playing dance music can help ward off mosquitoes',
      'Cherophobia is the word for the irrational fear of being happy.',
      "Marie Curie's notebooks are still radioactive.",
      'The King of Hearts is the only king in a deck of cards without a mustache',
      "A 'jiffy' is about one trillionth of a second",
      'The real name of Monopoly mascot Uncle Pennybags is Milburn Pennybags.',
      'The first email was sent by Ray Tomlinson to himself in 1971.',
      'Space travel makes mice run in loops.'
    ]
    const random = Math.floor(Math.random() * randomPhraseArray.length)

    const card = (post: any) => (
      <div>
        <Card.Header style={{ backgroundColor: theme ? theme[0] : 'pink' }}>
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
        <Card.Body onClick={() => console.log('clicked')}>
          {!new RegExp(alternateFormatArray.join('|')).test(post.url) ? (
            <img src={post.url} className="responsive" alt="funny meme" />
          ) : (
            // <iframe src={`http://${post.url.substring('https://'.length)}`} onClick={() => window.location.reload()} className="responsive" style={{"width": "500px", "height": "500px"}} />
            <p className="spicymeme">{randomPhraseArray[random]}</p>
          )}
        </Card.Body>
        {/* <b className="new-meme">{'tap for new meme'}</b> */}
      </div>
    )
    return (
      <Card
        key={'idx'}
        text={'dark'}
        className="responsive"
        onClick={() => window.location.reload()}
      >
        {post && post.url ? card(post) : spinner}
        <Card.Footer className="text-muted">
          <br />
          <p>
            <small className="bottomText">
              Can't see the meme? Here's the{' '}
              <a href={post.url} target="_blank">
                OG URL
              </a>
              <br />
              OG Reddit Post URL
            </small>
          </p>
        </Card.Footer>
      </Card>
    )
  }
}

export default SubReddit
