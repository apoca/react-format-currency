React Intl
==========
[React](http://facebook.github.io/react/) component to format currency in an input. With a little initialization, you get instantly internationalized values in your application.

[![npm version](http://img.shields.io/npm/v/react-format-currency.svg)](https://npmjs.org/package/react-format-currency)
[![Build Status](https://travis-ci.org/apoca/react-format-currency.svg?branch=master)](https://travis-ci.org/apoca/react-format-currency)
[![npm](https://img.shields.io/npm/dm/react-format-currency.svg)](https://www.npmjs.com/package/react-format-currency)

## React versions

| react-format-currency | react |
| --- | --- |
| 0.0.x | ^15.0.0-rc || ^15.0.0 || ^16.0.0-rc || ^16.2.0 |

### Features

- Display numbers (on Input) with separators.
- Pluralize labels in strings.
- Support for 150+ languages.
- Runs in the browser and Node.js.
- Built on standards.

## About component

This component has as main function, show the value of the currency already formatted within the input, thus making the understanding easier for the user. he component then uses the values of those props to properly format the passed values. Below is a listing of each component, its props and a usage example. This component uses as base another component [React-intl] (https://github.com/yahoo/react-intl) that provides React components and an API to format dates, numbers, and strings, including pluralization and handling translations.

## Usage / Instalation


1. `npm install react-format-currency --save`
2. In your application add support to react-intl:
```js 
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { IntlProvider, addLocaleData } from 'react-intl';
import pt from 'react-intl/locale-data/pt';
import en from 'react-intl/locale-data/en';

addLocaleData([...pt, ...en]);

ReactDOM.render(
  <IntlProvider locale="pt">
    <App />
  </IntlProvider>,
  document.getElementById("root")
);
```
3. To use the component:
 ```js
import React, { Component } from 'react';
import FormatCurrency from 'react-format-currency';

class App extends Component {
  
  render() {
    return (
      <div className="App">
      <FormatCurrency currency="EUR" placeholder="0.00" value={1000} onChange={(values) => console.log('values: ', values)} />
      </div>
    );
  }
}

export default App;

```
### Props
| Props        | Options           | Default  | Description |
| ------------- |-------------| -----| -------- |
| currency | Ex: USD, EUR, GBP, BRL etc... | required | International Organization for Standardization publishes a list of standard currency codes referred	to as the ISO 4217 code list |
| placeholder | Ex: 0.00, €150.00, US$150,00 etc ...| optional | The placeholder attribute specifies a short hint that describes the expected value of an input field (e.g. a sample value or a short description of the expected format). |
| value | Ex. 1000 | optional | Value to the number format. It can be a float number, or formatted string. |
| onChange | Ex: (values) => {} | none | onChange handler to get values object for usage in your component |

#### values object
values object is on following format
```js
{
  floatValue: 1000 // floating point representation. 
  formattedValue: '€1.000,00', //value after applying formatting.
  value: '1000.00', //non formatted value as numeric string 1000.00.
}
```

Contribute
---------

Let's make React Format Currency better! If you're interested in helping, all contributions are welcome and appreciated.
