import React from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import { fetchPosts } from './api/client'

interface Props {}

interface State {
  data: {
    title: any,
    url: any
  }
}

class App extends React.Component<Props, State> {
  constructor(props: any) {
    super(props)
    this.state = { data: {title: null, url: null} }
  }

  async componentDidMount() {
    const post = await fetchPosts('')
    this.setState({ data: post })
  }

  render() {
    const post = this.state.data
    console.log("This state data post: ", post.title)


    return (
      <div className="App">
        <header className="App-header">
          <Card bg={'light'} key={'idx'} text={'dark'} style={{ width: '50%' }}>
            <Card.Header>low-effort meme #76</Card.Header>
            <Card.Body>
              <Card.Title>{post.title}</Card.Title>
              <Card.Text><img src={post.url} width="60%" height="60%" alt="meme"/></Card.Text>
              <Card.Footer className="text-muted">
                <Button size="lg" variant="success">
                  Random
                </Button>
              </Card.Footer>
            </Card.Body>
          </Card>
          <br />
        </header>
      </div>
    )
  }
}

export default App
