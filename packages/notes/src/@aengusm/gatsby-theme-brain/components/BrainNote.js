import React from 'react';
import MDXRenderer from 'gatsby-plugin-mdx/mdx-renderer';

import '../../../style.css';

const BrainNote = ({ note }) => {
  let references = [];
  let referenceBlock;
  if (note.inboundReferences != null) {
    references = note.inboundReferences.map((ref) => (
      <li>
        <a href={ref}>{ref}</a>
      </li>
    ));

    if (references.length > 0) {
      referenceBlock = (
        <>
          <h3>Linked References</h3>
          <ul className="mb-4">{references}</ul>
        </>
      );
    }
  }
  return (
    <>
      <div
        id="brainNote"
        className="container max-w-2xl px-4 mx-auto text-gray-900 flex flex-col min-h-screen"
      >
        <div className="font-bold py-2 border-b -mx-4 px-4">@aravindballa's notes</div>
        <div className="flex-1">
          <h1 className="my-4">{note.title}</h1>
          <MDXRenderer>{note.childMdx.body}</MDXRenderer>
        </div>
        <div className="refs-box bg-indigo-100 text-gray-600 rounded-lg mb-4 p-4">
          {referenceBlock}
          <p className="text-sm m-0">
            If you think this note resonated, be it positive or negative, send me a{' '}
            <a href="https://twitter.com/messages/compose?recipient_id=532906019">direct message</a>{' '}
            on Twitter or an <a href="mailto:bsaaravind@gmail.com">email</a> and we can talk.
          </p>
        </div>
      </div>
    </>
  );
};

export default BrainNote;
