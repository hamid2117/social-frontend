import React, { useState } from 'react'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'
import CircularProgress from '@material-ui/core/CircularProgress'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import { useGlobalContext } from './../context/auth'

function Copyright() {
  return (
    <Typography variant='body2' color='textSecondary' align='center'>
      {'Copyright © '}
      <Link color='inherit' href='https://material-ui.com/'>
        Your Website
      </Link>
      {new Date().getFullYear()}
    </Typography>
  )
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

export default function Register(prope) {
  const classes = useStyles()

  const [values, setValues] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [err, setErr] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const { login } = useGlobalContext()
  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }
  const [addUser, { loading: Loading }] = useMutation(RegisterUser, {
    update(_, result) {
      login(result.data.register)
      prope.history.push('/')
    },
    onError(er) {
      setErr(er.graphQLErrors[0].extensions.exception.errors)
    },
    variables: values,
  })
  const Submitting = (e) => {
    e.preventDefault()
    addUser()
  }

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={Submitting} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete='fname'
                name='username'
                variant='outlined'
                required
                onChange={onChange}
                error={err.username ? true : false}
                helperText={
                  err.username
                    ? 'username must not be empty or already taken'
                    : false
                }
                value={values.username}
                fullWidth
                id='username'
                label='Username'
                autoFocus
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                error={err.email ? true : false}
                helperText={err.email ? 'Invalid Email' : false}
                fullWidth
                id='email'
                label='Email Address'
                name='email'
                value={values.email}
                onChange={onChange}
                autoComplete='email'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                error={err.password ? true : false}
                helperText={err.password ? 'Password must not be empty' : false}
                onChange={onChange}
                value={values.password}
                fullWidth
                name='password'
                label='Password'
                type='password'
                id='password'
                autoComplete='current-password'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                error={err.confirmPassword ? true : false}
                helperText={
                  err.confirmPassword ? 'Passwords must match' : false
                }
                name='confirmPassword'
                value={values.confirmPassword}
                onChange={onChange}
                label='Confirm Password'
                type='password'
                id='confirmPassword'
                autoComplete='current-password'
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value='allowExtraEmails' color='primary' />}
                label='I want to receive News about this website updates via email.'
              />
            </Grid>
          </Grid>
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
          >
            {Loading ? <CircularProgress /> : 'Sign Up'}
          </Button>
          <Grid container justify='flex-end'>
            <Grid item>
              <Link href='/login' variant='body2'>
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  )
}

const RegisterUser = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      username
      createdAt
      token
    }
  }
`
