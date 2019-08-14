# TRG Character Site

The files here are for laying out the character sites for [The Reaper's Game](http://shibuyasgame.tumblr.com/).

The Test folder is the latest iteration of the layout, and will display at least one copy of the Player version and one copy of the Reaper version of the site.

Each week's folder contains the code used for that week, and will display the characters from that week properly, provided the stat sheet still exists.

## Usage
The bleeding edge build, so to speak, is always in the Test folder. However, as it is test code, there are certain aspects which make it unable to display actual character stats properly. Please refer to the changelog. If the backend hasn't changed, you can always use the most recent week's code to display instead.

### Showing Content in Tumblr
There are a few different ways you could get this in Tumblr.

You could paste all the html and inline all the CSS and JavaScript into a custom layout page, for example. But let's just look at the easy ways.

I recommend using an iframe in a custom page. Replace WEEKFOLDER and FILENAME with the appropriate things below, title it, put in your favicon link and viola.
~~~~
<!DOCTYPE html>
<head>
<title>PAGE TITLE GOES HERE</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link rel="shortcut icon" href="FAVICON LINK GOES HERE">
</head>
<body>
<iframe frameborder="0" width=100% height=100% src="https://shibuyasgame.github.io/characters/WEEKFOLDER/FILENAME.html"></iframe>
</body>
~~~~

You could actually even embed this into a regular post. Just change the 100% in `height=100%` to a pixel height, e.g. `height=1000px`.

The other way is to just set a redirect to the correct page. All the pages are hosted on this organization's Github site, and you can find them [here](https://shibuyasgame.github.io/characters).

### Setting up for a New Week
If there haven't been any code updates, you can just create a copy of the last week's folder and rename it to the proper week. Update `numEntities` with the number of players (for the player page) or reapers (for the reaper page). The `key` value should be the backend sheet's key. You can get it from the sheet's link: `https://docs.google.com/spreadsheets/d/THIS_IS_THE_KEY/edit`. Make sure the Publish to Web the entire backend sheet so the site can grab the data. After pushing to the master branch, it should show up on the site.

## Changelog
W16 - Some small but important changes to make it easier to transition to the next Week.

W15 - First usage of character sites.
