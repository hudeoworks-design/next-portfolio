'use client';

import * as React from 'react';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import MuiLink, { LinkProps as MuiLinkProps } from '@mui/material/Link';
import { styled } from '@mui/material/styles';

// Styled anchor for internal use to prevent multiple nested <a> tags
const Anchor = styled('a')({});

interface NextLinkComposedProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'onClick' | 'onMouseEnter' | 'onTouchStart'>,
    Omit<NextLinkProps, 'href' | 'as'> {
  to: NextLinkProps['href'];
  linkAs?: NextLinkProps['as'];
}

export const NextLinkComposed = React.forwardRef<HTMLAnchorElement, NextLinkComposedProps>(
  function NextLinkComposed(props, ref) {
    const { to, linkAs, replace, scroll, prefetch, ...other } = props;

    return (
      <NextLink
        href={to}
        prefetch={prefetch}
        as={linkAs}
        replace={replace}
        scroll={scroll}
        ref={ref}
        {...other}
      />
    );
  }
);

export type LinkProps = {
  activeClassName?: string;
  as?: NextLinkProps['as'];
  href: NextLinkProps['href'];
  linkAs?: NextLinkProps['as'];
  noLinkStyle?: boolean;
} & Omit<NextLinkComposedProps, 'to' | 'linkAs' | 'href'> &
  Omit<MuiLinkProps, 'href'>;

const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(function Link(props, ref) {
  const {
    activeClassName = 'active',
    as,
    className: classNameProps,
    href,
    linkAs: linkAsProp,
    noLinkStyle,
    prefetch,
    replace,
    scroll,
    ...other
  } = props;

  const pathname = usePathname();
  const hrefPathname = typeof href === 'string' ? href : href.pathname;
  
  const className = clsx(classNameProps, {
    [activeClassName]: pathname === hrefPathname,
  });

  const isExternal = typeof href === 'string' && (href.startsWith('http') || href.startsWith('mailto:'));

  if (isExternal) {
    if (noLinkStyle) {
      return <Anchor className={className} href={href as string} ref={ref} {...other} />;
    }
    return <MuiLink className={className} href={href as string} ref={ref} {...other} />;
  }

  const linkAs = linkAsProp || as;
  const nextjsProps = { to: href, linkAs, replace, scroll, prefetch };

  if (noLinkStyle) {
    return <NextLinkComposed className={className} ref={ref} {...nextjsProps} {...other} />;
  }

  return (
    <MuiLink
      component={NextLinkComposed}
      className={className}
      ref={ref}
      {...nextjsProps}
      {...other}
    />
  );
});

export default Link;

// import React, { forwardRef } from 'react';
// import NextLink, { LinkProps as NextLinkProps } from 'next/link';
// import { Link as MuiLink, LinkProps as MuiLinkProps } from '@mui/material';

// // Combine MUI and Next.js prop types
// export type CustomLinkProps = Omit<MuiLinkProps, 'href'> & 
//   Pick<NextLinkProps, 'href' | 'as' | 'prefetch' | 'replace' | 'scroll' | 'shallow' | 'locale'>;

// const Link = forwardRef<HTMLAnchorElement, CustomLinkProps>(
//   // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   ({ href, as, prefetch, replace, scroll, shallow, locale, ...props }, ref) => {
//     return (
//       <MuiLink
//         ref={ref}
//         component={NextLink} // Directly use NextLink as the base component
//         
//         href={href as any}
//         as={as}
//         prefetch={prefetch}
//         replace={replace}
//         scroll={scroll}
//         {...props}
//       />
//     );
//   }
// );

// Link.displayName = 'Link';

// export default Link;
