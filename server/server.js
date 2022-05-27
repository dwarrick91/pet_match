const express = require('express')
const { ApolloServer } = require('apollo-server-express')
const db = require('./config/connection')
const path = require('path')
const routes = require('./routes')
const { authMiddleware } = require('./utils/auth')
const { typeDefs, resolvers } = require('./schemas');

const PORT = process.env.PORT || 3001
const ADDRESS = process.env.ADDRESS || 'localhost'

const app = express()
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "https://polar-castle-85308.herokuapp.com/"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(routes)

// Serves up static assets 
// TODO: REMOVE? THIS MAY NOT BE NECESSARY
app.use('/images', express.static(path.join(__dirname, '../client/images')));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();
  server.applyMiddleware({ app });
  
  db.once('open', () => {
    app.listen(PORT, ADDRESS, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    })
  })
  };

  startApolloServer(typeDefs, resolvers);