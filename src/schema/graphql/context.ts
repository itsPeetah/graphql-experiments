interface SongData {
    id: number;
    title: string;
    artistId: number;
}

interface ArtistData{
    id: number;
    name: string;
}

export type GQLContext = 
{
    data: {
        artists: [ArtistData],
        songs: [SongData]
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