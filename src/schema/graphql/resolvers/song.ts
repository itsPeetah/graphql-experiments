import { Arg, Ctx, Query, Resolver } from "type-graphql";
import { Song } from "../../entities/Song";
import { GQLContext } from "../context";

@Resolver()
export class SongResolver{
    @Query(() => [Song])
    songs(
        @Ctx() {data} : GQLContext
    ){
        return data.songs
    }
    
    // @Query(() => Song)
    // song(
    //     @Ctx() {data}: GQLContext,
    //     @Arg("id", )
    // ){
    //     const song = data.songs.find(thesong => thesong.id === id)
    // }
}