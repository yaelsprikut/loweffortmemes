import React from 'react'
import { InputGroup, DropdownButton } from 'react-bootstrap'
import Dropdown from 'react-bootstrap/Dropdown'
import './Filter.scss'
import { subreddits } from './api/client'

interface Props {
  onSelectSubreddit: any
  onSelectSource: any
}

interface State {}

class Filter extends React.Component<Props, State> {
  //   constructor(props: any) {
  //     super(props)
  //   }

  render() {
    const subredditOptions = () => {
      const optionsArr: JSX.Element[] = []
      subreddits.forEach((option: any) => {
        optionsArr.push(
          <Dropdown.Item eventKey={option}>{option}</Dropdown.Item>
        )
      })

      return optionsArr
    }

    return (
      <>
        <InputGroup className="mb-3 pb-2 pt-2 justify-content-md-center bckpanel">
          <DropdownButton
            variant="dark"
            onSelect={this.props.onSelectSubreddit}
            title="subreddit"
            id="subreddit-dropdown"
          >
            {subredditOptions()}
          </DropdownButton>
          <Dropdown onSelect={this.props.onSelectSource}>
            <Dropdown.Toggle id="dropdown-basic" variant="dark">
              select source
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item eventKey="reddit">Reddit</Dropdown.Item>
              <Dropdown.Item eventKey="4chan">4Chan</Dropdown.Item>
              <Dropdown.Item eventKey="9gag">9gag</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </InputGroup>
      </>
    )
  }
}

export default Filter
