/*import express from 'express'
import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'
import cors  from 'cors'
import http from 'http'
import multer from 'multer';
import path from 'path';
import  graphqlUploadExpress  from 'graphql-upload/graphqlUploadExpress.mjs';

//const __dirname = path.resolve();

export async function startApolloServer(typeDefs, resolvers){

    const app = express();
    const httpServer = http.createServer(app);

    const server = new ApolloServer({
        typeDefs,
        resolvers,
    })

    await server.start()
    app.use(graphqlUploadExpress());
    app.use('/gql', cors(), express.json(), expressMiddleware(server))

    app.use(function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "http://localhost:3000");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
  });

    await new Promise(resolve => httpServer.listen({
        port: 4000,
    }, resolve))
    console.log("Server on port 4000");

    /*const storage = multer.diskStorage({
        destination: (req, file, cb) => {
          cb(null, 'uploads/');
        },
        filename: (req, file, cb) => {
          cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
        }
      });
      
      const upload = multer({ storage: storage });
      
      app.post('/upload', upload.single('photo'), (req, res) => {
        res.json({ file: req.file });
      });

      app.get('/uploads/:filename', (req, res) => {
        const filename = req.params.filename;
        const filePath = path.join(__dirname, 'uploads', filename);
      
        res.sendFile(filePath);
      });*/


      import express from 'express';
      import { ApolloServer } from 'apollo-server-express';//apollo-server-express
      import { expressMiddleware } from '@apollo/server/express4';
      import cors  from 'cors';
      import bodyParser from 'body-parser';
      import mongoose from 'mongoose';
      import  graphqlUploadExpress  from 'graphql-upload/graphqlUploadExpress.mjs';
      
      export async function startApolloServer(typeDefs, resolvers){
      
          const app = express();
          app.use('/graphql', cors())
          app.use(bodyParser.json());
          app.use(bodyParser.urlencoded({ extended: true }));
      
          const port = process.env.PORT || 5000;
      
          //mongodb://root:example@mongo:27017/myapp?authSource=admin&directConnection=true
          //mongodb://127.0.0.1:27017/myapp?authSource=admin&directConnection=true
          //mongodb://localhost/user
          mongoose.connect(`mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@mongo:${process.env.MONGO_DB_PORT}/${process.env.MONGO_INITDB_DATABASE}?authSource=admin&directConnection=true`)
          .then(() => console.log('MongoDB connected App'))
          .catch(err => console.log(err));
      
          const server = new ApolloServer({  typeDefs, resolvers, });
          await server.start();
          
          
          app.use(graphqlUploadExpress());
          server.applyMiddleware({ app });
      
          
          app.listen(port, () => {
          console.log( `Graphql server on port http://localhost:5000/graphql`);
        
        });
      }
      