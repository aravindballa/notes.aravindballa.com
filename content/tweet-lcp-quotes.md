---
title: Tweet LCP Quotes
---

How can people come to know about what you speak in the podcasts without listening to them?

A half baked solution I figured out is to tweet about the things we speak in the episode occasionally. So, by looking at the twitter feed, one can get a feel for what we actually talk.

I built this with the help of [[GitHub]] Actions. I have an [action](https://github.com/aravindballa/learningcurve.dev/blob/master/.github/workflows/tweet.yml) which runs on a cron schedule and runs `yarn tweet` which executes a script. `0 10,16 * * *` to be precise. That is 1530 hrs and 2130 hrs IST to be precise.

I have a [script](https://github.com/aravindballa/learningcurve.dev/blob/master/scripts/getQuote.js) which fetches a random quote from the transcripts (which are in the repo as markdown files) and then tweets it using [[Twitter]] API.
