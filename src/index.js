import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import { removeAllButLast } from './utils';

class FormatCurrency extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value,
      currency: this.props.currency,
      formattedValue: this.props.intl.formatNumber(this.props.value, {
        style: 'currency',
        currency: this.props.currency,
      }),
    };

    this.onChange = this.onChange.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  onChange(e) {
    e.persist();
    const el = e.target;
    const inputValue = el.value;

    this.setState({
      value: (inputValue) ? removeAllButLast(inputValue.replace(/[^\d,.]/g, '').replace(',', '.'), '.') : '',
      formattedValue: el.value,
    });
  }

  onFocus(e) {
    e.persist();
    const el = e.target;
    const { value } = this.state;

    el.value = value;
  }

  onKeyDown(e) {
    e.persist();
    const el = e.target;
    const inputValue = el.value;
    const regex = /^[0-9]+(\.,){1}[0-9]+$/;

    if (!regex.test(inputValue)) {
      el.value = removeAllButLast(inputValue.replace(/[^\d,.]/g, '').replace(',', '.'), '.');
      return false;
    }
    el.value = removeAllButLast(inputValue.replace(/[^\d,.]/g, '').replace(',', '.'), '.');
    return true;
  }

  onBlur(e) {
    const el = e.target;
    const { value, currency } = this.state;

    el.value = this.props.intl.formatNumber(value, {
      style: 'currency',
      currency,
    });

    this.setState({
      value: Number(value).toFixed(2),
      formattedValue: el.value,
    }, () => {
      const valueObj = {
        formattedValue: this.state.formattedValue,
        value: this.state.value,
        floatValue: parseFloat(this.state.value),
      };

      this.props.onChange(valueObj);
    });
  }

  render() {
    const { value, formattedValue } = this.state;
    const { placeholder, className, disabled } = this.props;

    const inputProps = Object.assign(
      {},
      {
        value: formattedValue,
        onChange: this.onChange,
        onFocus: this.onFocus,
        onBlur: this.onBlur,
        onKeyDown: this.onKeyDown,
        disabled,
        className,
      },
    );

    if (value) {
      return (
        <div>
          <input {...inputProps} />
        </div>
      );
    }
    return (
      <div>
        <input value="" placeholder={placeholder} className={className} disabled={disabled} onChange={this.onChange} />
      </div>
    );
  }
}

FormatCurrency.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  currency: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  onChange: PropTypes.func,
  intl: intlShape,
};

export default injectIntl(FormatCurrency);
