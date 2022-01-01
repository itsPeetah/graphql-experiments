import { Arg, Ctx, FieldResolver, Int, Mutation, Query, Resolver, Root } from "type-graphql";
import { Artist } from "../../entities/Artist";
import { Song } from "../../entities/Song";
import { GQLContext } from "../context";

@Resolver(_=>Song)
export class SongResolver{
    @Query(() => [Song])
    songs(
        @Ctx() {data} : GQLContext
    ){
        return data.songs;
    }
    
    @Query(() => Song, {nullable: true})
    song(
        @Arg("id", () => Int) id : number,
        @Ctx() {data}: GQLContext
    ){
        const song = data.songs.find(thesong => thesong.id === id);
        return song;
    }
    
    @FieldResolver(() => Artist, {nullable: true})
    artist(
        @Root() song: Song,
        @Ctx() {data}: GQLContext
    ){
        const artist = data.artists.find(theartist => theartist.id === song.artistId);
        return artist;
    }

    @Mutation(() => Song)
    addSong(
        @Arg("title", () => String) title: string,
        @Arg("artistId", () => Int) artistId: number,
        @Ctx() {data} : GQLContext
    ){
        const song = {title: title, artistId: artistId, id: data.songs.length + 1};
        data.songs.push(song);
        return song;
    }

    @Mutation(() => Boolean)
    changeSongTitle(
        @Arg("id", () => Int) id: number,
        @Arg("newTitle", () => String) newTitle: string,
        @Ctx() {data} : GQLContext
    ){
        let success = false;
        data.songs.forEach((thesong) => {
            if (thesong.id === id){
                success = true;
                thesong.title = newTitle;
            }
        });
        return success;
    }

    @Mutation(()=>Boolean)
    deleteSong(
        @Arg("id", () => Int) id : number,
        @Ctx() {data} : GQLContext
    ){
        let prevLen = data.songs.length;
        data.songs = data.songs.filter(thesong => thesong.id != id);
        return prevLen !== data.songs.length;
    }
}