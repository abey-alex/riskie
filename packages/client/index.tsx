import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';

import GlobalStyles from 'styles/Global';

const client = new ApolloClient({
    uri: '/graphql',
    credentials: 'include',
});

const App = () => <p>Hi there</p>;

export default App;
