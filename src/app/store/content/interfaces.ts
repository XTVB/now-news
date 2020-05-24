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
  // content: string[];
}

export interface ContentState {
  channels: {
    [id: string]: Channel;
  };
  newsItems: {
    [id: string]: NewsItem;
  };
  displayedIds: string[];
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
