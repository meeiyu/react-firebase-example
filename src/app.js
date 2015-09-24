import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './assets/styles/app.scss';

import React from 'react';
import BaseComponent from './base-component';
import Firebase from 'firebase';
import List from './components/List/list.js';

let firebaseRef = new Firebase('https://mandy-demo.firebaseio.com/'),
    uid;

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
        this._authenticateUsers();
    }
    _authenticateUsers() {
        firebaseRef.authWithPassword({
            email   : 'meeiyu@hotmail.com',
            password: '12345'
        }, function(error, authData) {
            if (error) {
                console.log('Login Failed!', error);
            } else {
                console.log('Authenticated successfully with payload:', authData);
                uid = authData.uid;
                this._readAllData();
            }
        }.bind(this));
    }
    _readAllData() {
        let ref = firebaseRef.child('list/' + uid);
            ref.on('value', function(dataSnapshot) {
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
        let ref = firebaseRef.child('list/' + uid);
        e.preventDefault();
        ref.push({
            text: this.refs.theInput.getDOMNode().value
        });
        this._clearAndFocusInput();
    }
    _clearAndFocusInput() {
        this.refs.theInput.getDOMNode().focus();
        this.refs.theInput.getDOMNode().value = '';
    }
    render() {
        return (
            <div className="todo">
                <h3>Todo List</h3>
                    <List data={this.state.testData} />
                    <form onSubmit={this._handleSubmit}>
                        <input
                            ref="theInput"
                            placeholder={'請輸入文字'} />
                        <button>Add</button>
                    </form>
            </div>
        );
    }
}

React.render(<App />, document.body);
