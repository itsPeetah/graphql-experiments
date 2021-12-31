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