import React, { useState } from 'react'
import gql from 'graphql-tag'
import { useMutation, useQuery } from '@apollo/react-hooks'
import {
  Button,
  GridList,
  GridListTile,
  TextField,
  Typography,
  makeStyles,
} from '@material-ui/core'
import { FETCH_POSTS_QUERY } from './../utils/graphql'
import PostCard from './../components/PostCard'
import CardContent from '@material-ui/core/CardContent'
import { useGlobalContext } from './../context/auth'
import useMediaQuery from '@material-ui/core/useMediaQuery'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  list: {
    width: 33,
    height: 200,
  },
  gridParent: {
    width: 'auto',
    height: 'auto',

    margin: -6,
    marginTop: 40,
  },
  heading: {
    textAlign: 'center',
    marginTop: 12,
    marginBottom: 12,
  },
  TextField: {
    width: 350,
  },
}))

function Home() {
  const classes = useStyles()
  const { user } = useGlobalContext()
  const [formValue, setFormValue] = useState({ cBody: '' })
  const [createPost, { error: err }] = useMutation(POST_MUTATION, {
    variables: formValue,
    update(proxy, result) {
      const data = proxy.readQuery({
        query: FETCH_POSTS_QUERY,
      })

      data.getPosts = [result.data.createPost, ...data.getPosts]

      proxy.writeQuery({ query: FETCH_POSTS_QUERY, data })
      formValue.cBody = ''
    },
    onError(errors) {},
  })
  const handleChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value })
  }
  const handleSubmite = (e) => {
    e.preventDefault()
    createPost()
  }
  const { loading, data } = useQuery(FETCH_POSTS_QUERY)
  let columns = useMediaQuery('(max-width:1000px)') ? 1 : 3
  return (
    <>
      {loading ? (
        <h1>Loading .....</h1>
      ) : (
        data && (
          <>
            <Typography variant='h4' className={classes.heading}>
              Recently Posts
            </Typography>
            <GridList
              cellHeight={240}
              cols={columns}
              className={classes.gridParent}
              spacing={50}
            >
              {user && (
                <GridListTile>
                  <form onSubmit={handleSubmite}>
                    <CardContent>
                      <Typography
                        variant='h5'
                        component='h2'
                        style={{ marginBottom: 4 }}
                      >
                        Create a Post :
                      </Typography>
                      <TextField
                        label='Hi World!'
                        type='text'
                        error={!!err}
                        helperText={err ? err.graphQLErrors[0].message : ''}
                        id='cBody'
                        name='cBody'
                        onChange={handleChange}
                        value={formValue.cBody}
                        className={classes.TextField}
                        // disabled={error}
                      />
                    </CardContent>
                    <Button
                      variant='outlined'
                      type='submit'
                      style={{ marginTop: 16, marginLeft: 12 }}
                    >
                      Submit
                    </Button>
                  </form>
                </GridListTile>
              )}
              {data.getPosts.map((post) => {
                return (
                  <GridListTile key={post.id} className={classes.list}>
                    <PostCard {...post} />
                  </GridListTile>
                )
              })}
            </GridList>
          </>
        )
      )}
    </>
  )
}

const POST_MUTATION = gql`
  mutation createPost($cBody: String!) {
    createPost(cBody: $cBody) {
      id
      username
      createdAt
      body
      likeCount
      likes {
        username
      }
      commentCount
      comments {
        username
        createdAt
        body
      }
    }
  }
`

export default Home
