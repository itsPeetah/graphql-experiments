import { Arg, Ctx, FieldResolver, Int, Query, Resolver, Root } from "type-graphql";
import { Artist } from "../../entities/Artist";
import { Song } from "../../entities/Song";
import { GQLContext } from "../context";

@Resolver(_=>Artist)
export class ArtistResolver{
    @Query(() => [Artist])
    artists( @Ctx() {data} : GQLContext){
        return data.artists
    }
    
    @Query(() => Artist, {nullable: true})
    artist(@Arg("id", () => Int) id : number, @Ctx() {data}: GQLContext){
        const artist = data.artists.find(theartist => theartist.id === id)
        return artist;
    }

    @FieldResolver(() => [Song])
    songs( @Root() artist: Artist,@Ctx() {data} : GQLContext){
        const songs = data.songs.filter(thesong => thesong.artistId === artist.id)
        return songs
    }
}