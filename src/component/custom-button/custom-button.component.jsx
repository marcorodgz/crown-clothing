import React from 'react';

import './custom-button.styles.scss';

const CustomButton = ({
  children,
  isGoogleSignIn,
  isFacebookSignIn,
  ...otherProps
}) => (
  <button
    className={`${
      isGoogleSignIn
        ? 'google-sign-in'
        : '' || isFacebookSignIn
        ? 'facebook-sign-in'
        : ''
    } custom-button`}
    {...otherProps}
  >
    {children}
  </button>
);

export default CustomButton;