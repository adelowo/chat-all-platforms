import React, { Component } from 'react';
import { Alert, Button, TextInput, View, StyleSheet } from 'react-native';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          value={this.state.username}
          onChangeText={username =>
            this.setState({ username: username.trim() })
          }
          placeholder={'Username'}
          style={styles.input}
        />

        <Button
          title={'Login'}
          style={styles.input}
          onPress={() => {
            this.props.cb(this.state.username);
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  input: {
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
  },
});
