import React from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Navbar from 'react-bootstrap/Navbar'
import { css } from '@emotion/core'
import RingLoader from 'react-spinners/RingLoader'
import { fetchPosts } from './api/client'
import { colourScemeMap } from './components/maps/map'

const override = css`
  display: block;
  margin: 0 auto;
  border-color: yellow !important;
  color: yellow !important;
`

interface Props {}

interface State {
  data: {
    title: any
    url: any
    subreddit: any
    thumbnail: any
  }
}

class App extends React.Component<Props, State> {
  constructor(props: any) {
    super(props)
    this.state = {
      data: { title: null, url: null, subreddit: null, thumbnail: null }
    }
  }

  async componentDidMount() {
    const post = await fetchPosts()
    this.setState({ data: post })
  }

  render() {
    const post = this.state.data
    const theme = post.subreddit
      ? colourScemeMap.get(post.subreddit)
      : colourScemeMap.get('memes')

    const spinner = (
      <div className="sweet-loading">
        <RingLoader css={override} size={150} color={'yellow'} />
      </div>
    )
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
        <Card.Body onClick={() => (window.location.pathname = '/')}>
          {!post.url.includes('.gifv') && !post.url.includes('v.redd.it') ? (
            <img src={post.url} className="responsive" alt="funny meme" />
          ) : (
            <img src={post.thumbnail} className="responsive" alt="funny meme" />
          )}
        </Card.Body>
      </div>
    )
    return (
      <div className="App">
        <header className="App-header">
          <img
            src="../images/landing-lighter.png"
            alt="header img"
            style={{ display: 'none' }}
          />
          <Card key={'idx'} text={'dark'} className="responsive">
            {post && post.url ? card(post) : spinner}
            <Card.Footer className="text-muted">
              <Button
                size="lg"
                variant="success"
                onClick={() => (window.location.pathname = '/')}
              >
                Random Meme
              </Button>
              <br />
              <small
                style={{
                  fontSize: '20px',
                  color: 'black',
                  backgroundColor: theme ? theme[0] : 'lightblue'
                }}
              >
                Can't see the meme? Here's the <a href={post.url}>OG URL</a>
              </small>
            </Card.Footer>
          </Card>
          <br />
          <br />
        </header>
        <Navbar
          style={{ backgroundColor: theme ? theme[1] : 'pink' }}
          variant="dark"
          fixed="bottom"
        >
          <Navbar.Brand>
            Created with &hearts; by:{' '}
            <a href="http://yael.co" target="_blank" rel="noopener noreferrer">
              yael.co
            </a>
          </Navbar.Brand>
          <img
            width="2%"
            alt="githubicon"
            src="https://cdn2.iconfinder.com/data/icons/font-awesome/1792/github-square-512.png"
          ></img>
          <a
            style={{ color: 'black' }}
            href="https://github.com/yaelsprikut/loweffortmemes"
            target="_blank"
            rel="noopener noreferrer"
          >
            View on GitHub
          </a>
        </Navbar>
      </div>
    )
  }
}

export default App
