import raf from './utils/tmpPolyfills';
import React from 'react';
import expect from 'expect';
import {mountWithIntl, shallowWithIntl} from './utils/intl-enzyme-test-helper';
import FormatCurrency from '../src/index';
import {configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({adapter: new Adapter()});

describe('<FormatCurrency />', function () {
  it('component renders', () => {
    let wrapper = shallowWithIntl(<FormatCurrency currency="EUR" value={1000}/>);
    let child = wrapper.find('FormatCurrency');

    expect(child.length).toEqual(1);
  });
});
