import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { useGlobalContext } from './../context/auth'

import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import HomeIcon from '@material-ui/icons/Home'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}))

const Navbar = () => {
  const classes = useStyles()
  const { user, logOut } = useGlobalContext()

  const userVfy = user ? (
    <div className={classes.root}>
      <AppBar position='static'>
        <Toolbar>
          <Typography variant='h6' className={classes.title}>
            <Button color='inherit' component={Link} to={'/'}>
              <AccountCircleIcon />

              <h4>{user.username}</h4>
            </Button>
          </Typography>
          <Button
            color='inherit'
            onClick={logOut}
            component={Link}
            to={'/login'}
          >
            <ExitToAppIcon />
          </Button>
          {/* <Button color='inherit' component={Link} to={'/register'}>
            Register
          </Button> */}
        </Toolbar>
      </AppBar>
    </div>
  ) : (
    <div className={classes.root}>
      <AppBar position='static'>
        <Toolbar>
          <Typography variant='h6' className={classes.title}>
            <Button color='inherit' component={Link} to={'/'}>
              <HomeIcon />
            </Button>
          </Typography>
          <Button color='inherit' component={Link} to={'/login'}>
            Login
          </Button>
          <Button color='inherit' component={Link} to={'/register'}>
            Register
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  )
  return userVfy
}
export default Navbar
