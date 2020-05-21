import React from 'react';
import Tippy from '@tippyjs/react';
import { LinkToStacked } from 'react-stacked-pages-hook';

// Animation styles are imported in `src/styles.css`

// TODO cmd+click open page in new tab

const AnchorTag = ({ href, popups = {}, index, ...restProps }) => {
  if (!href.match(/^http/))
    return (
      <Tippy content={popups[href.replace(/^\//, '')]} placement="right" animation="shift-away">
        <LinkToStacked {...restProps} to={href} />
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
