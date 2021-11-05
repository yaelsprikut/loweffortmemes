import React from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Navbar from 'react-bootstrap/Navbar'
import { css } from '@emotion/core'
import RingLoader from 'react-spinners/RingLoader'
import { fetchPosts } from './api/client'
import SubReddit from './SubReddit'
import Filter from './Filter'

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
  wallpaper: string
  theme: string
}

class App extends React.Component<Props, State> {
  constructor(props: any) {
    super(props)
    this.state = {
      data: { title: null, url: null, subreddit: null, thumbnail: null },
      about: '',
      wallpaper: 'general-wallpaper',
      theme: 'general'
    }

    this.onSelect = this.onSelect.bind(this)
    this.filterMemeSource = this.filterMemeSource.bind(this)
    this.fetchNewMeme = this.fetchNewMeme.bind(this)
  }

  filterMemeSource = (val: any) => {
    console.log('Filter memes: ', val)
    switch (val) {
      case '4chan':
        this.setState({
          wallpaper: 'fchan-wallpaper',
          theme: '4chan'
        })
        break
      case '9gag':
        this.setState({ wallpaper: 'ngag-wallpaper' })
        break
      default:
        this.setState({ wallpaper: 'general-wallpaper' })
    }
  }

  async fetchNewMeme() {
    const post = await fetchPosts()
    this.setState({
      data: post[0]
    })
  }

  onSelect = (e: any) => {
    this.filterMemeSource(e)
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
    // const about = this.state.about
    const theme = this.state.theme

    const spinner = (
      <div className="sweet-loading">
        <RingLoader css={override} size={150} color={'yellow'} />
      </div>
    )

    return (
      <div className="App">
        {/* <div id="about-sub"><h2>About this SUb</h2>{about}</div> */}
        <header className={`App-header ${this.state.wallpaper}`}>
          <img
            src="../images/landing-lighter.png"
            alt="header img"
            style={{ display: 'none' }}
          />
          <Filter
            onSelectSubreddit={() => console.log('hi')}
            onSelectSource={(e: any) => this.onSelect(e)}
          />
          <SubReddit
            theme={theme}
            post={post}
            spinner={spinner}
            onClick={() => this.fetchNewMeme()}
          />
        </header>
        <Navbar
          className="desktopNavbar"
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
