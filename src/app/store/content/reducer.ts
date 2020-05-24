import { Action } from "@ngrx/store";
import { dummyUser } from "../auth/interfaces";
import * as actions from "./actions";
import { Channel, ContentState } from "./interfaces";
import { isDefined } from "../utils";

const imagePath = "/assets/images/content/";

const dummyChannels: {
  [id: string]: Channel;
} = {
  cooking: {
    id: "cooking",
    name: "Cooking",
    followers: "6.5M",
    friendsFollowing: [dummyUser],
    overviewImgSrc: `${imagePath}cooking.png`,
    followed: true,
    routerLink: "/channels/cooking",
  },
  nature: {
    id: "nature",
    name: "Nature",
    followers: "400K",
    friendsFollowing: [dummyUser],
    overviewImgSrc: `${imagePath}nature.png`,
    followed: true,
    routerLink: "/channels/nature",
  },
  science: {
    id: "science",
    name: "Science",
    followers: "203k",
    friendsFollowing: [dummyUser],
    overviewImgSrc: `${imagePath}science.png`,
    followed: false,
    routerLink: "/channels/science",
  },
  travel: {
    id: "travel",
    name: "Travel",
    followers: "104K",
    friendsFollowing: [dummyUser],
    overviewImgSrc: `${imagePath}travel.png`,
    followed: false,
    routerLink: "/channels/travel",
  },
  climate: {
    id: "climate",
    name: "Climate",
    followers: "2M",
    friendsFollowing: [dummyUser],
    overviewImgSrc: `${imagePath}climate.png`,
    followed: false,
    routerLink: "/channels/climate",
  },
  music: {
    id: "music",
    name: "Music",
    followers: "80k",
    friendsFollowing: [dummyUser],
    overviewImgSrc: `${imagePath}music.png`,
    followed: false,
    routerLink: "/channels/music",
  },
  people: {
    id: "people",
    name: "People",
    followers: "6.5M",
    friendsFollowing: [dummyUser],
    overviewImgSrc: `${imagePath}travel.png`,
    followed: false,
    routerLink: "/channels/people",
  },
};

const initialState: ContentState = {
  channels: dummyChannels,
  newsItems: {},
  displayedIds: ["cooking", "nature", "travel", "science", "climate", "music"],
};

export function contentReducer(
  state = initialState,
  action: Action
): ContentState {
  if (action instanceof actions.ToggleChannelFollowedState) {
    const { id } = action;

    // make sure channel exists
    return isDefined(state.channels[id])
      ? {
          ...state,
          channels: {
            ...state.channels,
            [id]: {
              ...state.channels[id],
              followed: !state.channels[id].followed,
            },
          },
        }
      : state;
  }

  return state;
}
