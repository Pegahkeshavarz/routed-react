import React from 'react';
import { Router, Route} from 'react-router';

 import CircleHome from './components/CircleHome';
import NotFound from './components/NotFound';
import SignUp from './components/SignUp';

const Routes = (props) => (
    <Router {...props}>
        <Route path="/" component={SignUp}></Route>
        <Route path="/:groupId" component={CircleHome}></Route>

    </Router>
);

export default Routes;
