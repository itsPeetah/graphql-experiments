import { Arg, Ctx, FieldResolver, Int, Query, Resolver, Root } from "type-graphql";
import { Artist } from "../../entities/Artist";
import { Song } from "../../entities/Song";
import { GQLContext } from "../context";

@Resolver(_=>Song)
export class SongResolver{
    @Query(() => [Song])
    songs( @Ctx() {data} : GQLContext ){
        return data.songs
    }
    
    @Query(() => Song, {nullable: true})
    song( @Arg("id", () => Int) id : number, @Ctx() {data}: GQLContext ){
        const song = data.songs.find(thesong => thesong.id === id)
        return song;
    }
    
    @FieldResolver(() => Artist, {nullable: true})
    async artist( @Root() song: Song, @Ctx() {data}: GQLContext ){
        const artist = data.artists.find(theartist => theartist.id === song.artistId);
        return artist
    }
}