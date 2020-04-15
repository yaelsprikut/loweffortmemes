import React from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Card bg={'light'} key={'idx'} text={'dark'} style={{ width: '50%' }}>
          <Card.Header>low-effort meme #76</Card.Header>
          <Card.Body>
            <Card.Title>Reddit meme title</Card.Title>
            <Card.Text>MEME GOES HERE</Card.Text>
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

export default App
