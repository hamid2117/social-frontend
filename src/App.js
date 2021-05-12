import './App.css'

import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import NavBar from './components/NavBar'
import { Container, MuiThemeProvider } from '@material-ui/core'
import { createMuiTheme } from '@material-ui/core/styles'
import { AuthProvider } from './context/auth'
import AuthRoute from './utils/AuthRoute'
import SinglePost from './pages/SinglePost'

const theme = createMuiTheme({
  palette: {
    background: {
      default: '#f3f1f8',
    },
    primary: {
      main: '#0277bd',
    },
    secondary: {
      main: '#009688',
    },
  },
})
function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <AuthProvider>
        <Router>
          <Container fixed>
            <NavBar />
            <Route exact path='/' component={Home} />

            <AuthRoute exact path='/login' component={Login} />

            <AuthRoute exact path='/register' component={Register} />
            <Route exact path='/posts/:id' component={SinglePost} />
          </Container>
        </Router>
      </AuthProvider>
    </MuiThemeProvider>
  )
}

export default App
