import { Arg, /*Ctx,*/ FieldResolver, Int, Mutation, Query, Resolver, Root } from "type-graphql";
import { Artist } from "../../entities/Artist";
import { Song } from "../../entities/Song";
// import { GQLContext } from "../context";

@Resolver(_=>Song)
export class SongResolver{
    @Query(() => [Song], {description: "List all the songs."})
    async songs() : Promise<Song[]>
    {
        return Song.find();
    }
    
    @Query(() => Song, {nullable: true, description: "Fetch a single song."})
    async song( @Arg("id", () => Int) id : number) : Promise<Song|undefined>
    {
        return Song.findOne(id);
    }
    
    @FieldResolver(() => Artist, {nullable: true, description:"Fetch the song's artist."})
    async artist(@Root() song: Song) : Promise<Artist | undefined>
    {
        return Artist.findOne(song.artistId);
    }

    @Mutation(() => Song, {description: "Create a new song."})
    async addSong(
        @Arg("title", () => String) title: string,
        @Arg("artistId", () => Int) artistId: number,
    ) : Promise<Song>
    {
        return Song.create({title, artistId}).save()
    }

    @Mutation(() => Boolean, {description: "Change a song's title."})
    async changeSongTitle(
        @Arg("id", () => Int) id: number,
        @Arg("newTitle", () => String) newTitle: string,
    ) : Promise<Boolean> {
        const result = await Song.update(id, {title:newTitle});
        return (result.affected && result.affected > 0) ? true : false;
    }

    @Mutation(()=>Boolean, {description: "Remove a song from the database."})
    async deleteSong( @Arg("id", () => Int) id : number) : Promise<Boolean>
    {
        await Song.delete(id);
        return true;
    }
}