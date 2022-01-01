import { Arg, /*Ctx,*/ FieldResolver, Int, Mutation, Query, Resolver, Root } from "type-graphql";
import { Artist } from "../../entities/Artist";
import { Song } from "../../entities/Song";
// import { GQLContext } from "../context";

@Resolver(_=>Artist)
export class ArtistResolver{
    @Query(() => [Artist],{description: "List all the artists."})
    async artists() : Promise<Artist[]>
    {
        return Artist.find()
    }
    
    @Query(() => Artist, {nullable: true, description: "Fetch a single artist."})
    async artist( @Arg("id", () => Int) id : number) : Promise<Artist | undefined>
    {
        return Artist.findOne(id);
    }

    @FieldResolver(() => [Song], {description: "List all the songs for the given artist."})
    async songs( @Root() artist: Artist) : Promise<Song[]>
    {
        return Song.find({where: {artistId : artist.id}});
    }

    @Mutation(() => Artist, {description: "Create a new artist."})
    async addArtist( @Arg("name", () => String) name: string) : Promise<Artist>
    {
        return Artist.create({name}).save()
    }

    @Mutation(() => Boolean,{description: "Change an artist's name."})
    async changeArtistName(
        @Arg("id", () => Int) id: number,
        @Arg("newName", () => String) newName: string
    ) : Promise<Boolean>
    {
        const result = await Artist.update(id, {name:newName});
        return (result.affected && result.affected > 0) ? true : false;
    }

    @Mutation(() => Boolean, {description: "Remove an artist (and their songs) from the database."})
    async deleteArtist(
        @Arg("id", () => Int) id: number,
        @Arg("deleteSongs", () => Boolean, {defaultValue: false}) deleteSongs:Boolean = false
    ) : Promise<Boolean>
    {
        await Artist.delete(id);
        if(deleteSongs)
            await Song.delete({artistId: id});
        return true;
    }
}