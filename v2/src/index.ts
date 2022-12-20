import "reflect-metadata"
import express from "express"
import { graphqlHTTP } from "express-graphql";
import {buildSchema} from "type-graphql"
import { SongResolver } from "./schema/graphql/resolvers/song";
import { ArtistResolver } from "./schema/graphql/resolvers/artist";

// In memory storage
const data = {
    artists: [ {id: 1, name: 'Bad Religion'}, {id: 2, name: 'Rise Against'}, {id: 3, name: 'The Blind Monkeys'} ],
    songs: [
        {id: 1, title: 'Punk Rock Song', artistId: 1 }, {id: 2, title: 'Sorrow', artistId: 1}, {id: 3, title: 'Savior', artistId: 2},
        {id: 4, title: 'Paper Wings', artistId: 2}, {id: 5, title: 'Teco', artistId: 3}, {id: 6, title: 'Generator', artistId: 1},
        {id: 7, title: 'Bianca', artistId: 3}, {id: 8, title: 'Merce Marcia', artistId: 3}, {id: 9, title: 'Drones', artistId: 2},
    ]
}

const main =async () => {
    const app = express();
    
    // App routes
    app.get("/", (_, res) => {
        res.send("I'm alive!");
    });
    app.use("/graphql", graphqlHTTP({
        graphiql:true,
        schema: await buildSchema({
            resolvers: [SongResolver, ArtistResolver],
            validate:false
        }),
        context:{ data: data }
    }));
    
    // Start app
        app.listen(5000., () => console.log("Server started @ localhost:5000."));

}

main().catch((err) => {
    console.error(err)
});