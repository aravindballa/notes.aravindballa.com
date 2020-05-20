import React from 'react';
import { Link, navigate, withPrefix } from 'gatsby';
import Tippy from '@tippyjs/react';
import qs from 'querystring';

// Animation styles are imported in `src/styles.css`

const AnchorTag = ({ href, popups = {}, index, ...restProps }) => {
  if (!href.match(/^http/))
    return (
      <Tippy content={popups[href.replace(/^\//, '')]} placement="right" animation="shift-away">
        <Link
          {...restProps}
          to={href}
          onClick={(ev) => {
            ev.preventDefault();
            const search = qs.parse(window.location.search.replace(/^\?/, ''));
            let stackedNotes = search.stackedNotes || [];
            if (typeof stackedNotes === 'string') {
              stackedNotes = [stackedNotes];
            }
            stackedNotes.splice(index, stackedNotes.length - index, href);
            search.stackedNotes = stackedNotes;
            navigate(
              `${window.location.pathname.replace(withPrefix(''), '')}?${qs.stringify(search)}`
            );

            // TODO: if note is already open - scrollback to it
          }}
        />
      </Tippy>
    );
  return (
    <Tippy
      placement="top"
      animation="shift-away"
      maxWidth="none"
      content={
        <div className="py-1 px-2 bg-white rounded text-sm text-blue-600 shadow">{href}</div>
      }
    >
      <a className="whitespace-no-wrap" {...restProps} href={href} />
    </Tippy>
  );
};

export default {
  a: AnchorTag,
};
