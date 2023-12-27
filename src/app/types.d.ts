type Artist = {
  name: string;
  avatar: string;
};

type PlayList = {
  name: string;
  list: Music[];
};

type Music = {
  title: string;
  duration: number;
  genere: MusicGenere;
  thumbnail: string;
  src: MusicSource;
  artist: Artist;
  comments: MusicComment[];
};

type MusicSource = {
  "320": string;
  "192": string;
  "128": string;
};
type MusicGenere = "HipHop" | "Rap" | "Oldies" | "Blues";

type MusicComment = {
  text: string;
  like_count: number;
  user: User;
  replies: MusicComment[];
  created_at: string;
  updated_at: string;
  time: number;
};

type User = {
  name: string;
  avatar: string;
};
