import { Field, Int, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import { Song } from "./Song";

@ObjectType({description: "A single artist."})
@Entity()
export class Artist extends BaseEntity{

    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id!: number;

    @Field(() => String)
    @Column()
    name!: string;

    @Field(() => [Song], {nullable: true})
    songs?: [Song];
}