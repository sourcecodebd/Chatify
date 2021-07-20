import React from'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Join from './components/Join/Join'
import Chat from './components/Chat/Chat'

export default function App() {
    return (
        <div>
            <Router>
                <Switch>
                    <Route exact path="/" component={Join}></Route>
                    <Route path="/Chat" component={Chat}></Route>
                </Switch>
            </Router>
        </div>
    )
}
