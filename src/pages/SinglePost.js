import React, { useState } from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/client'
import { makeStyles } from '@material-ui/core/styles'
import moment from 'moment'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Badge from '@material-ui/core/Badge'
import Typography from '@material-ui/core/Typography'
import PostAddIcon from '@material-ui/icons/PostAdd'
import { Link } from 'react-router-dom'
import LikeButton from './../components/LikeButton'
import CommentIcon from '@material-ui/icons/Comment'
import { useMutation } from '@apollo/react-hooks'

import DeleteIcon from '@material-ui/icons/Delete'
import { useGlobalContext } from '../context/auth'
import DeleteButton from '../components/DeleteButton'
import { Divider, Grid, TextField, Tooltip } from '@material-ui/core'
import { AccountCircle } from '@material-ui/icons'
const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },

  title: {
    fontSize: 12,
    marginBottom: 5,
  },
})

const SinglePost = (props) => {
  const postId = props.match.params.id
  const classes = useStyles()
  const { user } = useGlobalContext()

  const { data } = useQuery(FETCHPOST, {
    variables: {
      postId,
    },
  })
  const deletePost = () => {
    props.history.push('/')
  }

  const [commentt, setCommentt] = useState('')
  const [createPost] = useMutation(ADD_COMMENT, {
    update() {
      setCommentt('')
    },
    variables: {
      postId,
      body: commentt,
    },
  })
  const Submitting = (e) => {
    e.preventDefault()
    createPost()
  }
  if (!data) {
    return <h2>Loading ...</h2>
  } else {
    const {
      id,
      body,
      createdAt,
      username,
      comments,
      likes,
      likeCount,
      commentCount,
    } = data.getPost

    return (
      <>
        <Card
          raised={true}
          variant='outlined'
          className={classes.root}
          style={{ marginTop: '1rem' }}
        >
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
            <Tooltip title='Comments' arrow>
              <Button component={Link} to={`/posts/${id}`}>
                <Badge badgeContent={commentCount} color='primary'>
                  <CommentIcon />
                </Badge>
              </Button>
            </Tooltip>

            {user && user.username === username && (
              <DeleteButton delId={id} callback={deletePost} />
            )}
          </CardActions>
        </Card>
        <Divider />

        {user && (
          <Card style={{ padding: '1rem' }}>
            <form action='submit' onSubmit={Submitting}>
              <div className={classes.margin}>
                <Grid container spacing={1} alignItems='flex-end'>
                  <Grid item>
                    <AccountCircle />
                  </Grid>
                  <Grid item>
                    <TextField
                      style={{
                        width: '24rem',
                      }}
                      name='commentt'
                      value={commentt}
                      onChange={(e) => setCommentt(e.target.value)}
                      id='input-with-icon-grid'
                      label=' Create Comment'
                    />
                  </Grid>
                  {/* PostAddIcon */}
                  <Button
                    variant='outlined'
                    color='primary'
                    className={classes.button}
                    endIcon={<PostAddIcon />}
                    disabled={commentt.trim() === ''}
                    type='submit'
                  >
                    Post
                  </Button>
                </Grid>
              </div>
            </form>
          </Card>
        )}
        {comments.map((comment) => {
          const { username, createdAt, body } = comment
          return (
            <Card
              key={comment.id}
              style={{
                width: '60%',
                margin: '1rem auto',
                padding: '1rem',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography
                  variant='h5'
                  component='h2'
                  style={{ marginBottom: 4 }}
                >
                  {username}
                </Typography>
                {user && user.username === username && (
                  <DeleteButton delId={id} commentId={comment.id} />
                )}
              </div>

              <Typography
                className={classes.title}
                color='textSecondary'
                gutterBottom
              >
                {moment(createdAt).fromNow(true)}
              </Typography>

              <Typography
                variant='body2'
                component='p'
                style={{ width: '70%' }}
              >
                {body}
              </Typography>
            </Card>
          )
        })}
      </>
    )
  }
}
const ADD_COMMENT = gql`
  mutation($postId: ID!, $body: String!) {
    createComment(postId: $postId, body: $body) {
      id
      commentCount
      comments {
        id
        body
        username
        createdAt
      }
    }
  }
`
const FETCHPOST = gql`
  query($postId: ID!) {
    getPost(idpost: $postId) {
      id
      body
      username
      createdAt
      comments {
        id
        username
        body
        createdAt
      }
      likes {
        id
        username
        createdAt
      }
      likeCount
      commentCount
    }
  }
`
export default SinglePost
