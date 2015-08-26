import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './assets/styles/app.scss';

import React from 'react';

class App extends React.Component {
    render() {
        return (
        	<div>
                <h1>HI!</h1>
            </div>
        );
    }
}

console.log(App);
React.render(<App />, document.body);
