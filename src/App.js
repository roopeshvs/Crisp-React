import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { UrlInfo } from './User';
import { CreateUrl } from './User';

const client = new ApolloClient({
  uri: 'http://127.0.0.1:8000/graphql/', // your GraphQL Server 
});
const App = () => (
  <ApolloProvider client={client}>
    <div style={{
      backgroundColor: '#00000000',
      display: 'flex',
      justifyContent:'center',
      alignItems:'center',
      height: '100vh',
      flexDirection: 'column',
    }}>
      <h2>Crisp <span role="img" aria-label='rocket'>🚀</span></h2>
      <CreateUrl></CreateUrl>
      <UrlInfo></UrlInfo>
    </div>
  </ApolloProvider>
);
export default App;
