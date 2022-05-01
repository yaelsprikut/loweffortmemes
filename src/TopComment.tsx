import React from 'react'
import { Card } from 'react-bootstrap'
import Dropdown from 'react-bootstrap/Dropdown'
// import './TopComment.scss'
// import { subreddits } from './api/client'

interface Props {
  topComment: any
  topCommentAuth: any
}

interface State {}

class TopComment extends React.Component<Props, State> {
  render() {
    const { topComment, topCommentAuth } = this.props
    return (
      <Card>
        <Card.Header>{topCommentAuth}</Card.Header>
        <Card.Body>
          <blockquote className="blockquote mb-0">
            {topComment}
          </blockquote>
        </Card.Body>
      </Card>
    )
  }
}

export default TopComment
