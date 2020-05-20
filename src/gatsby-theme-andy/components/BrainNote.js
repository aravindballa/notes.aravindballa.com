import React from 'react';
import { Link } from 'gatsby';
import MDXRenderer from 'gatsby-plugin-mdx/mdx-renderer';
import { Helmet } from 'react-helmet';
import { MDXProvider } from '@mdx-js/react';
import qs from 'querystring';

import '../../style.css';

import components from 'gatsby-theme-andy/src/components/MdxComponents';

const location = typeof window !== `undefined` ? window.location : { href: '' };

const NOTE_WIDTH = 576;

const BrainNoteContainer = ({ note }) => {
  const [stackedNotes, setStackedNotes] = React.useState([]);
  const [scrollPosition, setScrollPosition] = React.useState(0);
  const notesContainerRef = React.useRef();

  const stackedNotesSlugs = React.useMemo(() => {
    if (!location.search) return [];
    const res = qs.parse(location.search.replace(/^\?/, '')).stackedNotes || [];
    if (typeof res === 'string') {
      return [res];
    }
    return res;
  }, [location.href]);

  React.useEffect(() => {
    Promise.all(
      // hook into the internals of Gatsby to dynamically fetch the notes
      stackedNotesSlugs.map((slug) => window.___loader.loadPage(slug))
    ).then((data) =>
      setStackedNotes(
        // filter out 404s
        data.filter((x) => x.json.data.brainNote)
      )
    );
  }, [stackedNotesSlugs]);

  React.useEffect(() => {
    if (notesContainerRef.current) {
      notesContainerRef.current.scrollTo({
        top: 0,
        left: NOTE_WIDTH * (stackedNotes.length + 1),
        behavior: 'smooth',
      });
    }
  }, [stackedNotes]);

  const onContainerScroll = (e) => {
    setScrollPosition(e.target.scrollLeft);
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{note.title} - aravindballa's notes</title>
      </Helmet>
      <div id="brainNote" className="text-gray-900 flex flex-col min-h-screen h-screen">
        <div className="font-bold py-2 border-b px-4">
          <Link to="/" className="no-underline text-gray-900">
            @aravindballa's notes
          </Link>
        </div>
        <div
          ref={notesContainerRef}
          className="notes-container flex flex-1 overflow-x-auto overflow-y-hidden"
          onScroll={onContainerScroll}
        >
          <BrainNote note={note} almostHidden={scrollPosition > NOTE_WIDTH - 100} />
          {stackedNotes.map((sn, i) => (
            <BrainNote
              key={i}
              index={i + 1}
              note={sn.json.data.brainNote}
              stackedNote
              almostHidden={scrollPosition > NOTE_WIDTH * (i + 2) - 100}
            />
          ))}
        </div>
      </div>
    </>
  );
};

const BrainNote = ({ note, index = 0, stackedNote, almostHidden }) => {
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

  const popups = {};
  if (note.outboundReferenceNotes) {
    note.outboundReferenceNotes
      .filter((reference) => !!reference.childMdx.excerpt)
      .forEach((ln, i) => {
        popups[ln.slug] = (
          <div
            id={ln.slug}
            className="w-64 p-4 bg-gray-100 rounded-lg shadow-lg border border-blue-200"
          >
            <h5 className="mb-2">{ln.title}</h5>
            <p className="text-sm">{ln.childMdx.excerpt}</p>
          </div>
        );
      });
  }

  const AnchorTagWithPopups = (props) => <components.a {...props} popups={popups} index={index} />;

  return (
    <MDXProvider components={{ a: AnchorTagWithPopups }}>
      <div
        className={`container max-w-xl px-4 overflow-y-auto sticky bg-white ${
          stackedNote ? `shadow-lg` : ``
        }`}
        style={{ minWidth: NOTE_WIDTH, left: 40 * index, right: -585 }}
      >
        <div
          className={`transition-opacity duration-200 ${
            almostHidden ? `opacity-100` : `opacity-0`
          }`}
        >
          <div className={`transform rotate-90 origin-left pb-4 absolute`}>
            <p className="m-0 font-bold">{note.title}</p>
          </div>
        </div>
        <div
          className={`flex flex-col min-h-full transition-opacity duration-200 ${
            almostHidden ? `opacity-0` : `opacity-100`
          }`}
        >
          <div className="flex-1">
            <h1 className="my-4">{note.title}</h1>
            <MDXRenderer>{note.childMdx.body}</MDXRenderer>
          </div>
          <div className="refs-box bg-indigo-100 text-gray-600 rounded-lg mb-4 p-4">
            {referenceBlock}
            <p className="text-sm m-0">
              If you think this note resonated, be it positive or negative, send me a{' '}
              <a href="https://twitter.com/messages/compose?recipient_id=532906019">
                direct message
              </a>{' '}
              on Twitter or an <a href="mailto:bsaaravind+notes@gmail.com">email</a> and we can
              talk.
            </p>
          </div>
        </div>
      </div>
    </MDXProvider>
  );
};

export default BrainNoteContainer;
