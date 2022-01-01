import { Field, Int, ObjectType } from "type-graphql";
import { Song } from "./Song";

@ObjectType()
export class Artist {

    @Field(() => Int)
    id!: number;

    @Field(() => String)
    name!: string;

    @Field(() => [Song], {nullable: true})
    songs?: [Song];
}