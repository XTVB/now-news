# NowNews

## Getting started

To try out the application first navigate to the root directory and call `yarn` to fetch dependencies. Application can then be run from the command line through the command `npm run start`, this will serve the website to localhost:4200

Continue with Google/Facebook will automatically log you in with a dummy user, alternatively the combination of the username `test` and password `test` will allow you to succesfully login.

Channels page shall show the 'Explore' screen populated through dummy data. You can toggle following of a channel on and off and it will maintain for as long as you don't refresh your browser.

News Article screen visible by navigating to the 'Trending' tab.

## Running unit tests

Run `ng test` to execute the unit tests via Jest

## Code structure and reusability

Where possible common functionality has been put in its own component to allow greater code reusability and understanding. Components that are nested within each other follow a similar file structure following a principle of division of concerns.

## Material Design

This project was implemented using Angular Material Designs to help speed up development. Material design allows a theme to be set up with the appropriate colours allowing for most elements to be styled correctly at base with less need of editing.

## Relative sizing

All widths heights and font-sizes are given in vw/vh in order to make the site scale to different viewports. As a future improvement a more comprehensive mobile first design utilising media queries would be implemented.

## View encapsulation

By default component styles are encapsulated so that they only affect the relevant components, however in a couple of cases to override the defaul functionality of Material Design components view encapsulation has been turned off to better fit the desired design

## Content Overview

'Explore' page channel view implemented in such a way that the same reusable components can be used to show overviews of news articles and the infrastructure to do this is already implemented. In a real app the page ID would be sent to the server which would return you the correct items in the contentState to display;

Clicking on the title directs you to the tab for that channel (which in a real app would show you a similar view populated by the relevant news articles instead). Hovering over the users shows you their username.

## Utils

Leveraging the power of typescript generics to allow type checking for ngRx and other convenience methods.

## Incomplete Tasks

Due to time constraints comments component is incomplete, basic visual structure has been implemented but no sorting or adding new comments works, and there may be some bugs.