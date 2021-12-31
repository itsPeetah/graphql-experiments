import { Int, Query, Resolver } from "type-graphql";

@Resolver()
export class QuestionResolver{
    @Query(() => Int)
    question() {
        return 42;
    }
};