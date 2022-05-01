import React from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Navbar from 'react-bootstrap/Navbar'
import { css } from '@emotion/core'
import RingLoader from 'react-spinners/RingLoader'
import { fetchPosts } from './api/client'
import { colourScemeMap } from './components/maps/map'
import SubReddit from './SubReddit'
import TopComment from './TopComment'

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
  about: string
}

class App extends React.Component<Props, State> {
  constructor(props: any) {
    super(props)
    this.state = {
      data: { title: null, url: null, subreddit: null, thumbnail: null },
      about: ''
    }
  }

  async componentDidMount() {
    const post = await fetchPosts()

    this.setState({
      data: post[0],
      about: post[1]
    })
  }

  render() {
    const post = this.state.data
    const about = this.state.about
    const theme = post.subreddit
      ? colourScemeMap.get(post.subreddit)
      : colourScemeMap.get('memes')

    const spinner = (
      <div className="sweet-loading">
        <RingLoader css={override} size={150} color={'yellow'} />
      </div>
    )

    return (
      <div className="App">
        {/* <div id="about-sub"><h2>About this SUb</h2>{about}</div> */}
        <header className="App-header">
          <img
            src="../images/landing-lighter.png"
            alt="header img"
            style={{ display: 'none' }}
          />
          <SubReddit theme={theme} post={post} spinner={spinner} />
        </header>
        <Navbar
          className="desktopNavbar"
          style={{ backgroundColor: theme ? theme[1] : 'pink' }}
          variant="dark"
          fixed="bottom"
        >
          <Navbar.Brand>
            Created with &hearts; by:{' '}
            <a href="http://yael.co" target="_blank">
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
