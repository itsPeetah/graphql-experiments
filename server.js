const express = require('express');
const { graphqlHTTP } = require('express-graphql');

const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
    } = require('graphql')
const schema2 = {schema }= require("./src/graphql")

// In memory storage
artists = [
    {id: 1, name: 'Bad Religion'},
    {id: 2, name: 'Rise Against'},
    {id: 3, name: 'The Blind Monkeys'}
]

songs = [
    {id: 1, title: 'Punk Rock Song', artistId: 1 },
    {id: 2, title: 'Sorrow', artistId: 1},
    {id: 3, title: 'Savior', artistId: 2},
    {id: 4, title: 'Paper Wings', artistId: 2},
    {id: 5, title: 'Teco', artistId: 3},
    {id: 6, title: 'Generator', artistId: 1},
    {id: 7, title: 'Bianca', artistId: 3},
    {id: 8, title: 'Merce Marcia', artistId: 3},
    {id: 9, title: 'Drones', artistId: 2},
]

// GraphQL Data Types
const SongType = new GraphQLObjectType({
    name:"Song",
    description:"A single song",
    // Fields is a function so that I don't need to worry about types referencing other types and those types being not yet defined
    // For example ArtistType cannot be declared before SongType because it also references SongType
    fields: () => ({
        id: {type: new GraphQLNonNull(GraphQLInt)},
        title: {type: new GraphQLNonNull(GraphQLString)},
        artistId: {type: new GraphQLNonNull(GraphQLInt)},
        artist: {
            type: ArtistType,
            resolve: (parent) => artists.find(theArtist => theArtist.id === parent.artistId) // parent in resolve with one argument
        }
    })
});

const ArtistType = new GraphQLObjectType({
    name:"Artist",
    description:"A single artist",
    fields:{
        id: {type: new GraphQLNonNull(GraphQLInt)},
        name: {type: new GraphQLNonNull(GraphQLString)},
        songs: {
            type: new GraphQLList(SongType),
            resolve: (parent) => songs.filter(theSong => theSong.artistId === parent.id)
        }
    }
});

// GraphQL schema setup
const RootQueryType = new GraphQLObjectType({
    name:"Query",
    description:"Root query",
    fields: () => ({
        hello:{
            type: GraphQLString,
            resolve: () => ("Hello world!")
        },
        songs:{
            type: new GraphQLList(SongType),
            description: "List of all songs",
            resolve: () => songs    // resolve without arguments
        },
        song:{
            type: SongType,
            description: "A single song.",
            args:{ id: {type:new GraphQLNonNull(GraphQLInt)} },
            resolve: (parent, args) => songs.find(theSong => args.id === theSong.id) // args is available in resolve with two arguments
        },
        artists:{
            type: new GraphQLList(ArtistType),
            description: "List of all artists",
            resolve: () => artists
        },
        artist:{
            type: ArtistType,
            description: "A single artist.",
            args:{ id: {type:new GraphQLNonNull(GraphQLInt)} },
            resolve: (parent, args) => artists.find(theArtist => args.id === theArtist.id)
        },
    })
});

const RootMutationType = new GraphQLObjectType({
    name:'Mutation',
    description:'Root mutation',
    fields: () => ({
        addSong:{
            type: SongType,
            description: 'Add a song',
            args: {
                title : {type: new GraphQLNonNull(GraphQLString)},
                artistId: {type:new GraphQLNonNull(GraphQLInt)}
            },
            resolve: (parent, args) => {
                const theSong = { id: songs.length + 1, title: args.title, artistId: args.artistId };
                songs.push(theSong);
                return theSong;
            }
        },
        addArtist:{
            type: ArtistType,
            description: 'Add an artist',
            args:{
                name: {type: new GraphQLNonNull(GraphQLString)}
            },
            resolve: (parent, args) => {
                const theArtist = { id: artists.length + 1, name: args.name };
                artists.push(theArtist);
                return theArtist;
            }
        },
        changeSongTitle:{
            type:SongType,
            description:"Change a song's title",
            args: {
                id:{type:new GraphQLNonNull(GraphQLInt)},
                newTitle: {type:new GraphQLNonNull(GraphQLString)}
            },
            resolve: (parent, args) => {
                songs = songs.map((theSong) => {
                    if(theSong.id === args.id) theSong.title = args.newTitle;
                    return theSong;
                });
                return songs.find(theSong => theSong.id === args.id)
            }
        },
        deleteSong:{
            type: SongType,
            description: 'Delete a song',
            args: {id: {type: new GraphQLNonNull(GraphQLInt)}},
            resolve: (_, args) => {
                // Not updating the ids since it's out of scope for what I'm doing now
                const song = songs.find(theSong => theSong.id === args.id);
                songs = songs.filter(theSong => theSong.id !== args.id);
                return song;
            }
        },
        deleteArtist: {
            type: ArtistType,
            description: 'Delete an artist and all of their songs.',
            args: {id: {type: new GraphQLNonNull(GraphQLInt)}},
            resolve: (_, args) => {
                const artist = artists.find(theArtist => theArtist.id === args.id);
                artists = artists.filter(theArtist => theArtist.id !== args.id);
                songs = songs.filter(theSong => theSong.artistId !== args.id);
                // this will return the artist with no songs since they have been deleted
                // not in scope for now to return the artist with the songs
                return artist;
            }
        }
    })
});

const schema = new GraphQLSchema({
    query: RootQueryType,
    mutation: RootMutationType
});

// Express middleware setup
const app = express();
app.get('/', function (req, res){
    res.send("Hello world!");
});

app.use("/graphql", graphqlHTTP({
    graphiql: true,
    schema: schema
}));

app.listen(5000., () => console.log("App live"));

