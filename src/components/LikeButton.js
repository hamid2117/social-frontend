import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import Badge from '@material-ui/core/Badge'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import { useGlobalContext } from '../context/auth'
import FavoriteIcon from '@material-ui/icons/Favorite'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/client'
import { Tooltip } from '@material-ui/core'

const LikeButton = ({ post: { likeCount, likes, id } }) => {
  const { user } = useGlobalContext()
  const [liked, setLiked] = useState(false)
  const [likePost] = useMutation(LIKE_MUTATION, {
    variables: { postId: id },
  })
  useEffect(() => {
    if (user && likes.find((like) => like.username === user.username)) {
      setLiked(true)
    } else setLiked(false)
  }, [user, likes])

  const LikeButtons = user ? (
    liked ? (
      <Tooltip title='unlike' arrow>
        <Button onClick={likePost}>
          <Badge badgeContent={likeCount} color='error'>
            <FavoriteIcon color='error' />
          </Badge>
        </Button>
      </Tooltip>
    ) : (
      <Tooltip title='like' arrow>
        <Button onClick={likePost}>
          <Badge badgeContent={likeCount} color='error'>
            <FavoriteBorderIcon />
          </Badge>
        </Button>
      </Tooltip>
    )
  ) : (
    <Button component={Link} to={'/login'}>
      <Badge badgeContent={likeCount} color='error'>
        <FavoriteBorderIcon color='primary' />
      </Badge>
    </Button>
  )
  return <>{LikeButtons}</>
}
// LikePost(postId: ID!): Post!
const LIKE_MUTATION = gql`
  mutation LikePost($postId: ID!) {
    LikePost(postId: $postId) {
      id
      likeCount
      likes {
        id
        username
      }
    }
  }
`

export default LikeButton
