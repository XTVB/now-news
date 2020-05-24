import { createSelector } from "@ngrx/store";
import { RootState } from "app/store/interfaces";
import { isDefined } from "../utils";
import { Channel, ContentOverview, NewsItem } from "./interfaces";

const getContentState = (state: RootState) => state.contentState;

const getDisplayedIds = createSelector(
  getContentState,
  (state) => state.displayedIds
);

const getChannels = createSelector(getContentState, (state) => state.channels);

const getNewsItems = createSelector(
  getContentState,
  (state) => state.newsItems
);

export const getChannelContentOverviews = createSelector(
  getDisplayedIds,
  getChannels,
  (ids, channels) =>
    ids
      .map((id) => channels[id])
      .filter(isDefined)
      .map(mapChannelToContentOverview)
);

export const getNewsItemsContentOverviews = createSelector(
  getDisplayedIds,
  getNewsItems,
  (ids, newsItems) =>
    ids
      .map((id) => newsItems[id])
      .filter(isDefined)
      .map(mapNewsItemToContentOverview)
);

function mapChannelToContentOverview(channel: Channel): ContentOverview {
  const {
    id,
    name: title,
    followers,
    friendsFollowing: users,
    overviewImgSrc: imgSrc,
    followed: selected,
    routerLink,
  } = channel;

  return {
    id,
    title,
    subtitle: `${followers} Followers`,
    users,
    imgSrc,
    selected,
    routerLink,
  };
}

function mapNewsItemToContentOverview(newsItems: NewsItem): ContentOverview {
  const {
    id,
    title,
    channel: subtitle,
    commenters: users,
    overviewImgSrc: imgSrc,
    bookmarked: selected,
    routerLink,
  } = newsItems;

  return {
    id,
    title,
    subtitle,
    users,
    imgSrc,
    selected,
    routerLink,
  };
}
