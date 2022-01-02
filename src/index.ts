import "reflect-metadata"
import express from "express"
import { graphqlHTTP } from "express-graphql";
import {buildSchema} from "type-graphql"
import { SongResolver } from "./schema/graphql/resolvers/song";
import { ArtistResolver } from "./schema/graphql/resolvers/artist";
import { createConnection } from "typeorm";
import { Artist } from "./schema/entities/Artist";
import { Song } from "./schema/entities/Song";

const main =async () => {

    const orm = await createConnection({
        type:"postgres",
        database: "typeormtest1",
        username: "postgres",
        password: "postgres",
        logging: true,
        synchronize: true,
        entities: [Artist, Song]
    });
    console.log("Connection name:", orm.name)

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
        context:{ foo: "bar" }
    }));
    
    // Start app
        app.listen(5000., () => console.log("Server started @ localhost:5000."));

}

main().catch((err) => {
    console.error(err)
});