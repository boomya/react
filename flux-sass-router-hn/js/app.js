var React = require('react')
var Router = require('react-router');
var {DefaultRoute, Link, NotFoundRoute, Route, RouteHandler} = Router;
//import {Router, Route, RouteHandler, Link, History} from 'react-router';

let {routes} = require('./components/HNApp');

Router.run(routes, (Root) => {
    React.render(<Root />, document.getElementById('app'))
});

//React.render(<HNApp />, document.getElementById('app'));