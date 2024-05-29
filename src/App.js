import {Component} from 'react'

import {Route, Switch, Redirect} from 'react-router-dom'

import Login from './components/Login'

import Home from './components/Home'

import NotFound from './components/NotFound'

import ProtectedRoute from './components/ProtectedRoute'

import BookDetails from './components/BookDetails'

import Bookshelves from './components/Bookshelves'

import './App.css'

class App extends Component {
  render() {
    return (
      <Switch>
        <ProtectedRoute exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <ProtectedRoute exact path="/shelf" component={Bookshelves} />
        <ProtectedRoute exact path="/books/:id" component={BookDetails} />
        <Route exact path="/notfound" component={NotFound} />
        <Redirect to="notfound" />
      </Switch>
    )
  }
}

export default App
