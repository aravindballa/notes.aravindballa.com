import React from 'react';
import Tippy from '@tippyjs/react';
import { LinkToStacked } from 'react-stacked-pages-hook';
import { Link } from 'gatsby';

// Animation styles are imported in `src/styles.css`

// TODO cmd+click open page in new tab

const innerLinkStyles = `text-blue-600 px-1 -mx-1 rounded hover:bg-blue-100 focus:bg-blue-100`;

const AnchorTag = ({ href, popups = {}, noPopups = false, ...restProps }) => {
  if (!href) href = restProps.to;
  if (!href.match(/^http/))
    return noPopups ? (
      <Link {...restProps} to={href} className={innerLinkStyles} />
    ) : (
      <Tippy content={popups[href.replace(/^\//, '')]} placement="right" animation="shift-away">
        <LinkToStacked {...restProps} to={href} className={innerLinkStyles} />
      </Tippy>
    );
  return noPopups || restProps.children === href ? (
    <a {...restProps} href={href} />
  ) : (
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

const NoteTag = ({ children, color }) => (
  <div
    className={`bg-${color}-200 text-${color}-800 py-1 px-2 mb-2 mr-2 text-xs font-bold rounded inline-block`}
  >
    {children}
  </div>
);

export default {
  a: AnchorTag,
  NoteTag,
};
