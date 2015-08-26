import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './assets/styles/app.scss';

import React from 'react';
import BaseComponent from './base-component';
import Firebase from 'firebase';
import List from './components/List/list.js';

class App extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            testData: []
        };
        this._bind(
            '_handleSubmit',
            '_clearAndFocusInput'
        );
    }
    componentDidMount() {
        let firebaseRef = new Firebase('https://mandy-demo.firebaseio.com/');
        firebaseRef.on('value', function(dataSnapshot) {
            //can use (child_added).
            let items = [];
            dataSnapshot.forEach(function(childSnapshot) {
                let item = childSnapshot.val();
                item['.key'] = childSnapshot.key();
                items.push(item);
            });
            this._setData(items);
        }.bind(this));
    }
    _setData(allData) {
        this.setState({
            testData: allData
        });
    }
    _handleSubmit(e) {
        e.preventDefault();
        let firebaseRef = new Firebase('https://mandy-demo.firebaseio.com/');
        firebaseRef.push({
            text: $(React.findDOMNode(this.refs.theInput)).val()
        });
        this._clearAndFocusInput();
    }
    _clearAndFocusInput() {
        this.refs.theInput.getDOMNode().focus();
        this.refs.theInput.getDOMNode().value = '';
    }
    render() {
        return (
          <div>
            <h3>Todo List</h3>
                <form onSubmit={this._handleSubmit}>
                    <input
                        ref="theInput"
                        placeholder={'請輸入文字'} />
                    <button>Add</button>
                </form>
            <List data={this.state.testData} />
          </div>
        );
    }
}

React.render(<App />, document.body);
