import React from "react";
import { graphql } from "gatsby";
import BrainNote from "../components/BrainNote";

export default (props) => {
  return <BrainNote note={props.data.brainNote} linkedNotes={props.data.allBrainNote.nodes}/>;
};

export const query = graphql`
  query BrainNoteBySlug($slug: String!, $references: [String]) {
    brainNote(slug: { eq: $slug }) {
      slug
      title
      inboundReferences
      childMdx {
        body
      }
    }
    allBrainNote(filter: {slug: {in: $references}}) {
      nodes {
        slug
        title
        childMdx {
          excerpt
        }
      }
    }
  }
`;
