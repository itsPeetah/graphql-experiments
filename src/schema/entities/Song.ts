import { Field, Int, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Artist } from "./Artist";

@ObjectType({description: "A single song."})   // Makes this a (type-)graphql datatype
@Entity()   // Make this a typeorm table
export class Song extends BaseEntity{

    @Field(() => Int)    // Makes this (type-)graphql field
    @PrimaryGeneratedColumn()
    id!: number;

    @Field(() => String)
    @Column()
    title!: string;
  
    @Field(() => Int)
    @Column()
    artistId!: number;

    @Field(() => Artist, {nullable: true})
    artist?: Artist;
}