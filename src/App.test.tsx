import React from 'react'
import ReactDOM from 'react-dom'
import { render } from '@testing-library/react'
import App from './App'
// import { mount } from 'enzyme'

test('renders cant see the meme question', () => {
  const { getByText } = render(<App />)
  const linkElement = getByText(/Can't see the meme/i)
  expect(linkElement).toBeInTheDocument()
})

test('renders about site link', () => {
  const { getByText } = render(<App />)
  const linkElement = getByText(/Effort Memes/i)
  expect(linkElement).toBeInTheDocument()
})

test('renders cant see the meme question', () => {
  // const div = document.createElement('div');
  // ReactDOM.render(<App />, div);
  // console.log("div html: ", div.innerHTML)
  // const linkElement = getByText(/Can't see the meme/i)
  // expect(linkElement).toBeInTheDocument()
})
