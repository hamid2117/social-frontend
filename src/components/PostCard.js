import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import moment from 'moment'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Badge from '@material-ui/core/Badge'
import Typography from '@material-ui/core/Typography'

import { Link } from 'react-router-dom'
import { useGlobalContext } from '../context/auth'
import LikeButton from './LikeButton'

import CommentIcon from '@material-ui/icons/Comment'

import DeleteButton from './DeleteButton'
import { Tooltip } from '@material-ui/core'
const useStyles = makeStyles({
  root: {
    minWidth: 275,
    '&:hover': {
      boxShadow:
        '0 20px 25px -5px rgba(0, 0, 0, 0.1),0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    },
  },

  title: {
    fontSize: 12,
    marginBottom: 5,
  },
})
const PostCard = ({
  username,
  id,
  likeCount,
  likes,
  createdAt,
  comments,
  body,
  commentCount,
}) => {
  const classes = useStyles()
  const { user } = useGlobalContext()

  return (
    <>
      <Card raised={true} variant='outlined' className={classes.root}>
        <CardContent>
          <Typography
            className={classes.title}
            color='textSecondary'
            gutterBottom
          >
            {moment(createdAt).fromNow(true)}
          </Typography>
          <Typography variant='h5' component='h2' style={{ marginBottom: 4 }}>
            {username}
          </Typography>

          <Typography variant='body2' component='p'>
            {body}
          </Typography>
        </CardContent>
        <CardActions>
          <LikeButton post={{ username, id, likeCount, likes }} />

          <Tooltip title='comments' arrow>
            <Button component={Link} to={`/posts/${id}`}>
              <Badge badgeContent={commentCount} color='primary'>
                <CommentIcon />
              </Badge>
            </Button>
          </Tooltip>
          {user && user.username === username && <DeleteButton delId={id} />}
        </CardActions>
      </Card>
    </>
  )
}

export default PostCard
