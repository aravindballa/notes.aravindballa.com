---
title: How I built this
---

All this started for me when [[Max Stoiber]] started sharing his thoughts in his notes website on Twitter. I found it cool and wanted one for myself too. Back then, I was getting back to [[writing]] regularly.

It wasn't a lot of time until [Anegus](https://twitter.com/aengusmcmillin) built `gatsby-theme-brain` (I also found this from Max's tweet). Lot of things were possible with this. I was excited and started to put together stuff. I [tweeted](https://twitter.com/aravindballa/status/1252187172817362945?s=20) what I could build and it caught a few eyes. And then I turned into its own theme - [gatsby-theme-andy](https://github.com/aravindballa/gatsby-theme-andy)

We were still figuring out how to stack up the pages side by side with Gatsby as it statically builds all the pages. We would need some kind of a fetch where we get the content of the new page and show it on side. Max was working on achieving that using `iframe`. This could be a solution but it feels hacky.

And then [Mathieu](https://twitter.com/MathieuDutour) came into the scene and [figured out](https://twitter.com/MathieuDutour/status/1263031176958222336) that Gatsby had an API which would do the trick. He quickly made a [demo](https://mathieudutour.github.io/gatsby-n-roamresearch) and he abstracted a lot of key functionality into a React Hook - [react-stacked-pages-hook](https://github.com/mathieudutour/gatsby-n-roamresearch/tree/master/packages/react-stacked-pages-hook).

This was great. I could use the hook and add the stacking up the pages side by side functionality to `gatsby-theme-andy`. This theme now stands on the shoulders of amazing work by Aengus and Mathieu.

I'm happy that a lot of people like this and use it build their website/gardens with this. It feels good to see [[sites that are inspired]] by this.
