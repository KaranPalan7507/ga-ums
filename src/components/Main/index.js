import React from 'react';
import { Switch, Route } from 'react-router-dom';
import UserListing from '../UserListing';
import UserDetail from './../../containers/UserDetail';

const Main = props => (
    <Switch>
        <Route exact path="/" component={UserListing} />
        <Route exact path="/user/:id" component={UserDetail} />

    </Switch>
)

export default Main;