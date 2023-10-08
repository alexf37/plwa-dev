export type Location = {
  latitude: number;
  longitude: number;
};
export type Post = {
  id: string;
  author: string;
  text: string;
  image?: string;
  location: Location;
  likes: number;
  comments: number;
  timestamp: string;
  likedByUser: boolean;
};
