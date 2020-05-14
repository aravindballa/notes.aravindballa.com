import React from 'react';
import { Link } from 'gatsby';
import Tippy from '@tippyjs/react';
import 'tippy.js/animations/shift-away.css';

const AnchorTag = ({ href, popups = {}, ...restProps }) => {
  if (!href.match(/^http/))
    return (
      <Tippy content={popups[href.replace(/^\//, '')]} placement="top" animation="shift-away">
        <Link {...restProps} to={href} />
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
