import { Arg, Ctx, FieldResolver, Int, Mutation, Query, Resolver, Root } from "type-graphql";
import { Artist } from "../../entities/Artist";
import { Song } from "../../entities/Song";
import { GQLContext } from "../context";

@Resolver(_=>Artist)
export class ArtistResolver{
    @Query(() => [Artist])
    artists(
        @Ctx() {data} : GQLContext
    ){
        return data.artists
    }
    
    @Query(() => Artist, {nullable: true})
    artist(
        @Arg("id", () => Int) id : number,
        @Ctx() {data}: GQLContext
    ){
        const artist = data.artists.find(theartist => theartist.id === id)
        return artist;
    }

    @FieldResolver(() => [Song])
    songs(
        @Root() artist: Artist,
        @Ctx() {data} : GQLContext
    ){
        const songs = data.songs.filter(thesong => thesong.artistId === artist.id)
        return songs
    }

    @Mutation(() => Artist)
    addArtist(
        @Arg("name", () => String) name: string,
        @Ctx() {data} : GQLContext
    ){
        const artist = {name: name, id: data.artists.length + 1};
        data.artists.push(artist);
        return artist;
    }

    @Mutation(() => Boolean)
    changeArtistName(
        @Arg("id", () => Int) id: number,
        @Arg("newName", () => String) newName: string,
        @Ctx() {data} : GQLContext
    ){
        let success = false;
        data.artists.forEach((theartist) => {
            if(theartist.id === id){
                success = true;
                theartist.name = newName;
            }
        });
        return success;
    }

    @Mutation(() => Boolean)
    deleteArtist(
        @Arg("id", () => Int) id: number,
        @Arg("deleteSongs", () => Boolean, {defaultValue: false}) deleteSongs:Boolean = false,
        @Ctx() {data} : GQLContext
    ){
        let prevLen = data.artists.length;
        data.artists = data.artists.filter(theartist => theartist.id !== id);
        if(deleteSongs) data.songs = data.songs.filter(thesong => thesong.artistId !== id);
        return prevLen != data.artists.length;
    }
}