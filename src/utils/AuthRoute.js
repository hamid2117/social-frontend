import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useGlobalContext } from './../context/auth'
const AuthRoute = ({ component: Component, ...rest }) => {
  const { user } = useGlobalContext()

  return (
    <Route
      {...rest}
      render={(prop) => {
        return user ? <Redirect to='/' /> : <Component {...prop} />
      }} //render means jonsa component ma ha us ka sara prop ka callback
    />
  )
}

export default AuthRoute
