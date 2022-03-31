// server.js
import {ApolloServer} from 'apollo-server-express';
import typeDefs from './schemas/index';
import resolvers from './resolvers/index';
import express from 'express';
import db from './db/db';

(async () => {
   try {
      const server = new ApolloServer({
         typeDefs,
         resolvers,
      });
   
       const app = express();
   
       await server.start();
       
       server.applyMiddleware({app});
   
       db.on('connected', () => {
        app.listen({port: process.env.PORT || 3000}, () =>
           console.log(
               `🚀 Server ready at http://localhost:3000${server.graphqlPath}`),
       );
      });
   } catch (e) {
      console.log('server error: ' + e.message);
   }
})();
