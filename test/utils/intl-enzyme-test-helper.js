import React from 'react';
import { IntlProvider, intlShape, addLocaleData } from 'react-intl';
import { mount, shallow } from 'enzyme';
import pt from 'react-intl/locale-data/pt';

addLocaleData([...pt]);

// Create the IntlProvider to retrieve context for wrapping around.
const intlProvider = new IntlProvider({ locale: 'pt' }, {});
const { intl } = intlProvider.getChildContext();

/**
 * When using React-Intl `injectIntl` on components, props.intl is required.
 */
function nodeWithIntlProp(node) {
  return React.cloneElement(node, { intl });
}

export function shallowWithIntl(node, { context } = {}) {
  return shallow(
    nodeWithIntlProp(node),
    {
      context: Object.assign({}, context, { intl }),
    },
  );
}

export function mountWithIntl(node, { context, childContextTypes } = {}) {
  return mount(
    nodeWithIntlProp(node),
    {
      context: Object.assign({}, context, { intl }),
      childContextTypes: Object.assign({}, { intl: intlShape }, childContextTypes),
    },
  );
}
