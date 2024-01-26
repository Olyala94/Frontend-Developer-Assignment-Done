import React from 'react';
import './App.css';

import { ApolloProvider } from '@apollo/client';
import client from './apollo/client';
import GraphQLComponent from './components/GraphQLComponent';

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <GraphQLComponent />
      </div>
    </ApolloProvider>
  );
};

export default App;