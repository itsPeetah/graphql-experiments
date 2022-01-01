import { Artist } from "../entities/Artist";
import { Song } from "../entities/Song";

export interface GQLContext
{
    data: {
        artists: [Artist],
        songs: [Song]
    }
}

// export type GQLContext = 
// {
//     data: {
//         artists: [{
//             id: number,
//             title: string,
//             artistId: number
//         }],
//         songs: [{
//             id: number,
//             title: string,
//             artistId: number
//         }]
//     }
// }