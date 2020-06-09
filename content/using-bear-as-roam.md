---
title: 'Using Bear as Roam'
---

TL;DR

```bash
python3 bear_export_sync.py --out ~/Bear/notes --backup ~/Bear/backup

note-link-janitor ~/Bear/notes

python3 bear_export_sync.py --out ~/Bear/notes --backup ~/Bear/backup
```

> A huge thanks to Andy. This is only possible because of his Open-source work on Github.

[[Roam]] has its pros and cons. So does [[Bear App]]. I want the offline-ness of Bear with the backlinking of Roam.

Lucky enough, I found `note-link-janitor` and `Bear-Markdown-Export` scripts from Andy, which help Bear sync its notes and add backlinks to it.

## Clone the repo

We first need to clone the repo.

```
git clone git@github.com:andymatuschak/Bear-Markdown-Export.git
```

And then install note-link-janitor globally.

```
yarn global add @andymatuschak/note-link-janitor
```

## Starting the process

Bear markdown export needs a directory where all the notes get exported to, as markdown files.

```bash
python3 bear_export_sync.py --out ~/Bear/notes --backup ~/Bear/backup
```

To these markdown files, note-link-janitor can add backlinks.

```
note-link-janitor ~/Bear/notes
```

And then, when you run the first script _again_, these changes are synced back to Bear.

As the intermediate level is markdown files, which end up being the source if truth, this can be saved on the cloud using Dropbox or GDrive. And you can edit them outside the Apple ecosystem. For me it is iA writer on [[Android]].

An easy way to run this regularly is to create a bash script with those 3 lines, so we can execute all of them in one go.

### Resources

[GitHub - andymatuschak/Bear-Markdown-Export: Markdown export from Bear sqlite database](https://github.com/andymatuschak/Bear-Markdown-Export)

[GitHub - andymatuschak/note-link-janitor: Maintains backlink structure among interlinked Markdown notes](https://github.com/andymatuschak/note-link-janitor)
