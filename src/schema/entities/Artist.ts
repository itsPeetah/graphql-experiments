import { Field, Int, ObjectType } from "type-graphql";
import { Song } from "./Song";

@ObjectType({description: "A single artist."})
export class Artist {

    @Field(() => Int)
    id!: number;

    @Field(() => String)
    name!: string;

    @Field(() => [Song], {nullable: true})
    songs?: [Song];
}