import React from 'react';
import TestUtils from 'react-dom/test-utils';
import expect from 'expect';
import FormatCurrency from '../src/index';
import {IntlProvider, addLocaleData} from 'react-intl';
import pt from 'react-intl/locale-data/pt';
import en from 'react-intl/locale-data/en';

addLocaleData([
  ...pt,
  ...en
]);


describe('FormatCurrency', function () {
  it('renders without problems', function () {
    var FormatCurrency = TestUtils.renderIntoDocument(
      <IntlProvider locale="pt"><FormatCurrency currency="EUR"/></IntlProvider>
    );
    expect(FormatCurrency).toExist();
  });
});
