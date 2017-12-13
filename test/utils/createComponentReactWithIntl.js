import React from 'react';
import renderer from 'react-test-renderer';
import { IntlProvider } from 'react-intl';

const createComponentReactWithIntl = (children, props = {
  locale: 'pt',
}) => renderer.create(<IntlProvider {...props}>{children}</IntlProvider>);

export default createComponentReactWithIntl;
