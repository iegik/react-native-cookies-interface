[![npm version](https://badge.fury.io/js/react-native-cookies-interface.svg)](https://badge.fury.io/js/react-native-cookies-interface)

# react-native-cookies-interface
React Native Cookies interface for both platforms iOS and Android


## Installation

    npm install react-native-cookies-interface --save

or

    yarn add react-native-cookies-interface


## Usage

```
import CookiesInterface from 'react-native-cookies-interface';

const Cookies = new CookiesInterface('https://example.com/', '.example.com');
const { getCookie, clearCookies, setCookie } = Cookies;

```

## API

| Method        | Params            | Description  |
| ------------- | ----------------- | ------------ |
| clearCookies  | callback          | Clears all cookies |
| getCookie     | callback          | Get {cookie} and passes to Callback |
| setCookie     | options, callback | Set {cookie} |

### Cookie object

```
{
    domain: '.example.com',
    path: '/',
    name: 'some-cookie',
    value: 'true',
    origin: 'same origin'
    version: 1
    expiration: 'YYYY-MM-DD'
}
```

#### Dependencies
- [lodash](https://github.com/lodash/lodash)
- [cookie](https://github.com/jshttp/cookie)
- [react-native](https://github.com/facebook/react-native)
