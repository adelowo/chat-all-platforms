import React, { Component } from 'react';
import { Alert, Platform, StyleSheet, Text, View } from 'react-native';
import Login from './Login';
import axios from 'axios';
import ChatView from './ChatView';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: false,
      id: '',
    };
  }

  onLoginCallBack = username => {
    if (username.length === 0) {
      Alert.alert('Login', 'Please provide your username');
      return;
    }

    axios
      .post('http://localhost:5200/users', { username })
      .then(res => {
        this.setState({
          isAuthenticated: true,
          id: res.data.id,
        });
      })
      .catch(err => {
        Alert.alert('Login', 'Could not log you in');
      });
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        {!this.state.isAuthenticated || this.state.currentUser === null ? (
          <View
            style={{
              flex: 1,
            }}
          >
            <Login cb={this.onLoginCallBack} />
          </View>
        ) : (
          <View
            style={[
              { flex: 1, flexDirection: 'column' },
              { backgroundColor: '#ffff' },
            ]}
          >
            <ChatView userID={this.state.id} />
          </View>
        )}
      </View>
    );
  }
}
