import React from 'react';
import { Global, css, SerializedStyles } from '@emotion/core';

const globalStyles: SerializedStyles = css`
    html * {
        box-sizing: border-box;
    }
`;

const GlobalStyles = () => <Global styles={globalStyles} />;
export default GlobalStyles;
