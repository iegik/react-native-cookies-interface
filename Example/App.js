import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

// Example of import
import CookiesInterface from 'react-native-cookies-interface';

const Cookies = new CookiesInterface('https://example.com/', '.example.com');
const { getCookie, clearCookies, setCookie } = Cookies;

export default class App extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>Open up App.js to start working on your app!</Text>
                <Text>Changes you make will automatically reload.</Text>
                <Text>Shake your phone to open the developer menu.</Text>
                <Button title="setCookie" onPress={() => {
                    setCookie()
                }} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
