# notes.aravindballa.com

This project is still in the ideation phase.

## Changes to `gatsby-theme-brain`

- [Change how outboundReferences are](https://github.com/aengusmcmillin/gatsby-theme-brain/issues/9)

- Add all references in `createPage` API and pass it to context

  ```js
  const references = [];
  references.push(...(note.inboundReferences || []));
  references.push(...(note.outboundReferences || []));
  ```

- Alter the page query in template

  ```graphql
  query BrainNoteBySlug($slug: String!, $references: [String]) {
    brainNote(slug: { eq: $slug }) {
      slug
      title
      inboundReferences
      childMdx {
        body
      }
    }
    allBrainNote(filter: { slug: { in: $references } }) {
      nodes {
        slug
        title
        childMdx {
          excerpt
        }
      }
    }
  }
  ```

## Running the project

- `yarn`
- `yarn workspace notes start`
