import { Field, Int, ObjectType } from "type-graphql";
import { Artist } from "./Artist";

@ObjectType()   // Makes this a (type-)graphql datatype
export class Song {

    @Field(() => Int)    // Makes this (type-)graphql field
    id!: number;

    @Field(() => String)
    title!: string;
  
    @Field(() => Int)
    artistId!: number;

    @Field(() => Artist, {nullable: true})
    artist?: Artist;
}