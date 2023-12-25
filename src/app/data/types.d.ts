interface Artist {
  name: string;
  avatar: string;
}

interface PlayList {
  name: string;
  list: Music[];
}

interface Music {
  title: string;
  genere: MusicGenere;
  thumbnail: string;
  src: MusicSource;
  artist: Artist;
  comments: Comment[];
}

type MusicSource = {
  "320": string;
  "192": string;
  "128": string;
};
type MusicGenere = "HipHop" | "Rap" | "Oldies" | "Blues";

interface Comment {
  like_count: number;
  user: User;
  replies: Comment[];
  created_at: string;
  updated_at: string;
}

interface User {
  name: string;
  avatar: string;
}
