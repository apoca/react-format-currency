import raf from './utils/tmpPolyfills';
import React from 'react';
import expect from 'expect';
import {mountWithIntl, shallowWithIntl} from './utils/intl-enzyme-test-helper';
import renderer from 'react-test-renderer';
import FormatCurrency from '../src/index';
import {configure, shallow, mount} from 'enzyme';
import sinon from 'sinon';
import Adapter from 'enzyme-adapter-react-16';

configure({adapter: new Adapter()});

describe('<FormatCurrency />', function () {
  test('component renders correctly', () => {
    const wrapper = shallowWithIntl(<FormatCurrency currency="EUR" value={1000}/>);
    const rendered = renderer.create(wrapper);

    expect(rendered.toJSON()).toMatchSnapshot();
  });

  test('component exists', () => {
    const wrapper = shallowWithIntl(<FormatCurrency currency="EUR" value={1000}/>);
    const child = wrapper.find('FormatCurrency');

    expect(child.length).toEqual(1);
  });

  test('should handle the blur event and return formatted value', () => {
    const onBlur = sinon.spy();
    const wrapper = mountWithIntl(<FormatCurrency currency="EUR" value={1000} onBlur={onBlur} />);
    const child = shallowWithIntl(wrapper.get(0));
    const input = wrapper.find('input').simulate('blur');
    const value = child.dive().state().formattedValue.trim().replace(/\s/g,'');

    expect(value.trim()).toBe('€1,000.00');
  });
});
