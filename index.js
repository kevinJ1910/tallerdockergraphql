const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const path = require('path'); 

// Define el esquema de GraphQL
const typeDefs = gql`
  type Query {
    hello(message: String!): String
    helloOscar(message: String!): String
    helloJhonnier(message: String!): String
    helloJunior(message: String!): String
    helloKevin(message: String!): String
    helloCristian(message: String!): String
  }
`;

// Define los resolvers de GraphQL
const resolvers = {
  Query: {
    hello: (_, { message }) => {
        return `¡Hola, ${message}! Un saludo por parte del profe `;
      },

    helloOscar: (_, { message }) => {
        return `¡Hola, ${message}! Un saludo por parte de Oscar `;
      },
      
    helloJhonnier: (_, { message }) => {
        return `¡Hola, ${message}! Un saludo por parte de Jhonnier `;
      },

    helloJunior: (_, { message }) => {
        return `¡Hola, ${message}! Un saludo por parte de Junior `;
      },

    helloKevin: (_, { message }) => {
        return `¡Hola, ${message}! Un saludo por parte de Kevin `;
      },
    helloCristian: (_, { message }) => {
        return `¡Hola, ${message}! Un saludo por parte de Cristian `;
      },
  },
};

async function startApolloServer() {
  // Crea la instancia de Apollo Server
  const server = new ApolloServer({ typeDefs, resolvers });

  // Inicia el servidor Apollo
  await server.start();

  // Crea la aplicación Express
  const app = express();

  // Aplica el middleware de Apollo Server a la aplicación Express
  server.applyMiddleware({ app, path: '/graphql' });

  // Sirve la aplicación de React desde la carpeta "saludofront-app"
   const reactAppPath = path.join(__dirname, 'saludofront-app', 'dist');
    app.use(express.static(reactAppPath));
    app.get('*', (req, res) => {
    res.sendFile(path.join(reactAppPath, 'index.html'));
    });

  // Inicia el servidor
  const PORT = 4000;
  app.listen(PORT, () => {
    console.log(`Servidor GraphQL ejecutándose en http://localhost:${PORT}${server.graphqlPath}`);
  });
}

startApolloServer();

