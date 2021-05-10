import React from 'react'
import { useMutation } from '@apollo/client'
import DeleteIcon from '@material-ui/icons/Delete'
import Button from '@material-ui/core/Button'
import gql from 'graphql-tag'
import { FETCH_POSTS_QUERY } from '../utils/graphql'
import { Tooltip } from '@material-ui/core'

const DeleteButton = ({ delId, commentId, callback }) => {
  const mutation = commentId ? DELETE_COMMENT : DELETE_POST
  const [deletePost] = useMutation(mutation, {
    update(proxy) {
      if (!commentId) {
        const data = proxy.readQuery({
          query: FETCH_POSTS_QUERY,
        })

        proxy.writeQuery({
          query: FETCH_POSTS_QUERY,
          data: {
            ...data,
            getPosts: data.getPosts.filter((post) => post.id !== delId),
          },
        })
      }
      if (callback) {
        return callback()
      }
    },
    variables: {
      delId,
      commentId,
    },
  })

  return (
    <>
      <Tooltip title={`${commentId ? 'Delete Comments' : 'Delete Post'}`} arrow>
        <Button style={{ float: 'right' }} onClick={deletePost}>
          <DeleteIcon color='action' />
        </Button>
      </Tooltip>
    </>
  )
}
const DELETE_POST = gql`
  mutation($delId: ID!) {
    deletePost(delId: $delId)
  }
`
const DELETE_COMMENT = gql`
  mutation($delId: ID!, $commentId: ID!) {
    deleteComment(delId: $delId, commentId: $commentId) {
      id
      comments {
        username
        body
        createdAt
        id
      }
      commentCount
    }
  }
`

export default DeleteButton
