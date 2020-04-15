import React from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import { css } from '@emotion/core'
import ClipLoader from 'react-spinners/ClipLoader'
import { fetchPosts } from './api/client'

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`

interface Props {}

interface State {
  data: {
    title: any
    url: any
  }
}

class App extends React.Component<Props, State> {
  constructor(props: any) {
    super(props)
    this.state = { data: { title: null, url: null } }
  }

  async componentDidMount() {
    const post = await fetchPosts()
    this.setState({ data: post })
  }

  render() {
    const post = this.state.data
    const spinner = (
      <div className="sweet-loading">
        <ClipLoader css={override} size={150} color={'#123abc'} />
      </div>
    )
    const card = (post: any) => (
      <Card bg={'light'} key={'idx'} text={'dark'} className="responsive">
        <Card.Header>
          from{' '}
          <a
            href={`https://reddit.com/${post.subreddit_name_prefixed}`}
            target="_blank"
          >
            {post.subreddit_name_prefixed}
          </a>{' '}
        </Card.Header>
        <Card.Body>
          <Card.Title>{post.title}</Card.Title>
          <Card.Text>
            {!post.url.includes('.gifv') ? (
              <img src={post.url} className="responsive" alt="meme" />
            ) : (
              'Meme Unavailable'
            )}
          </Card.Text>
          <Card.Footer className="text-muted">
            <Button
              size="lg"
              variant="success"
              onClick={() => window.location.reload()}
            >
              Random Meme
            </Button>
          </Card.Footer>
        </Card.Body>
      </Card>
    )

    return (
      <div className="App">
        <header className="App-header">
          {post && post.url ? card(post) : spinner}
          <br />
        </header>
      </div>
    )
  }
}

export default App
