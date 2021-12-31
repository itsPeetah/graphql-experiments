import { Field, Int, ObjectType } from "type-graphql";

@ObjectType()   // Makes this a (type-)graphql datatype
export class Song {

    @Field(() => Int)    // Makes this (type-)graphql field
    id!: number;

    @Field(() => String)
    createdAt: Date = new Date();

    @Field(() => String)
    updatedAt: Date = new Date();

    @Field(() => String)
    title!: string;
  
    @Field(() => Int)
    artistId!:number
}