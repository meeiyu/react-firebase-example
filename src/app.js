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
            testData: [],
            uid:''
        };
        this._bind(
            '_handleSubmit',
            '_clearAndFocusInput'
        );
    }
    componentDidMount() {
        firebaseRef.authWithPassword({
            email    : 'meeiyu@hotmail.com',
            password : '12345'
        }, function(error, authData) {
            if (error) {
                console.log('Login Failed!', error);
            } else {
                console.log('Authenticated successfully with payload:', authData);
                uid = authData.uid;
                var ref = firebaseRef.child('users/' + uid);
                console.log('uid', uid);
                //ref.push({ 'user_id': 'fred', 'text': 'Yabba Dabba Doo!!!!!!!!' });
                ref.on('value', function(dataSnapshot) {
                    //can use (child_added).
                    let items = [];
                    dataSnapshot.forEach(function(childSnapshot) {
                        let item = childSnapshot.val();
                        item['.key'] = childSnapshot.key();
                        items.push(item);
                        //console.log(item);
                    });
                    this._setData(items);
            }.bind(this));
          }
        }.bind(this));
    }
    _setData(allData) {
        this.setState({
            testData: allData
        });
    }
    _handleSubmit(e) {
        e.preventDefault();
        firebaseRef.push({
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
