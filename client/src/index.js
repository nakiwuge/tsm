import 'antd/dist/antd.css';
import './Assets/Styles/main.scss';
import { ApolloClient } from 'apollo-boost';
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { ApolloProvider } from '@apollo/react-hooks';
import React from 'react';
import ReactDOM from 'react-dom'; 
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { onError } from 'apollo-link-error';

// import { resolvers, typeDefs } from './resolvers';
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      ),
    );

  if (networkError) console.log(`[Network error]: ${networkError}`);
});
const cache = new InMemoryCache();
const link = new HttpLink({
  uri: 'http://localhost:4000/graphql',
  headers: {
    authorization: localStorage.getItem('token'),
  } 

});

const client = new ApolloClient({
  cache,
  link:errorLink.concat(link)
  // resolvers,
  // typeDefs
});
  
cache.writeData({
  data: {
     
  },
});

ReactDOM.render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </BrowserRouter>, 
  document.getElementById('root')
);
