import gql from 'graphql-tag'
export const FETCH_POSTS_QUERY = gql`
  {
    getPosts {
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
