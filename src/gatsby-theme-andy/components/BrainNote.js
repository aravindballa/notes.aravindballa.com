import React from 'react';
import MDXRenderer from 'gatsby-plugin-mdx/mdx-renderer';
import { Helmet } from 'react-helmet';
import Portal from '@reach/portal';
import { MDXProvider } from '@mdx-js/react';

import '../../style.css';

import components from 'gatsby-theme-andy/src/components/MdxComponents';

const BrainNote = ({ note }) => {
  let references = [];
  let referenceBlock;
  if (note.inboundReferenceNotes != null) {
    references = note.inboundReferenceNotes.map((reference) => (
      <a
        className="no-underline hover:text-gray-700"
        href={`/${reference.slug}`}
        key={reference.slug}
      >
        <div className="py-2">
          <h5 className="">{reference.title}</h5>
          <p className="text-sm m-0">{reference.childMdx.excerpt}</p>
        </div>
      </a>
    ));

    if (references.length > 0) {
      referenceBlock = (
        <>
          <h3>Referred in</h3>
          <div className="mb-4">{references}</div>
          <hr className="mx-auto w-32" />
        </>
      );
    }
  }
  return (
    <MDXProvider components={components}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{note.title} - aravindballa's notes</title>
      </Helmet>
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
            on Twitter or an <a href="mailto:bsaaravind+notes@gmail.com">email</a> and we can talk.
          </p>
        </div>
      </div>
      {note.outboundReferenceNotes &&
        note.outboundReferenceNotes
          .filter((reference) => !!reference.childMdx.excerpt)
          .map((ln, i) => (
            <Portal key={i}>
              <div
                id={ln.slug}
                className="fixed w-64 p-4 bg-gray-100 rounded-lg shadow-lg border border-blue-200"
              >
                <h5 className="mb-2">{ln.title}</h5>
                <p className="text-sm m-0">{ln.childMdx.excerpt}</p>
              </div>
            </Portal>
          ))}
    </MDXProvider>
  );
};

export default BrainNote;
