import { User } from "../auth/interfaces";

export type ChannelId =
  | "foryou"
  | "cooking"
  | "nature"
  | "science"
  | "travel"
  | "climate"
  | "music"
  | "people";

export interface Channel {
  id: ChannelId;
  name: string;
  followers: string;
  friendsFollowing: User[];
  overviewImgSrc: string;
  followed: boolean;
  routerLink: string;
}

export interface NewsItem {
  id: string;
  title: string;
  source: string;
  date: Date;
  channel: ChannelId;
  commenters: User[];
  overviewImgSrc: string;
  bookmarked: boolean;
  routerLink: string;
}

export interface NewsComment {
  id: string;
  user: User;
  message: string;
  likes: number;
  date: string;
  liked: boolean;
}

export interface ContentState {
  channels: {
    [id: string]: Channel;
  };
  newsItems: {
    [id: string]: NewsItem;
  };
  newsComments: {
    [id: string]: NewsComment;
  };
  displayedIds: string[];
  displayedComments: string[];
}

export interface ContentOverview {
  id: string;
  title: string;
  subtitle: string;
  users: User[];
  imgSrc: string;
  selected: boolean;
  routerLink: string;
}
