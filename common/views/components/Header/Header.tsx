// @flow
import { FunctionComponent, useState, useContext } from 'react';
import { font, classNames } from '../../../utils/classnames';
import WellcomeCollectionBlack from '../../../icons/wellcome_collection_black';
import Space from '../styled/Space';
import TogglesContext from '@weco/common/views/components/TogglesContext/TogglesContext';
import { useUserInfo } from '@weco/identity/src/frontend/MyAccount/UserInfoContext';

export const navHeight = 85;

type Props = {
  siteSection: string | null;
};

export const links = [
  {
    href: '/visit-us',
    title: 'Visit us',
    siteSection: 'visit-us',
  },
  {
    href: '/whats-on',
    title: "What's on",
    siteSection: 'whats-on',
  },
  {
    href: '/stories',
    title: 'Stories',
    siteSection: 'stories',
  },
  {
    href: '/collections',
    title: 'Collections',
    siteSection: 'collections',
  },
  {
    href: '/get-involved',
    title: 'Get involved',
    siteSection: 'get-involved',
  },
  {
    href: '/about-us',
    title: 'About us',
    siteSection: 'about-us',
  },
];

const Header: FunctionComponent<Props> = ({ siteSection }) => {
  const [isActive, setIsActive] = useState(false);
  const showLogin = useContext(TogglesContext);
  const test = useUserInfo();

  return (
    <>
      <pre
        style={{
          maxWidth: '600px',
          margin: '0 auto 24px',
          fontSize: '14px',
        }}
      >
        <code
          style={{
            display: 'block',
            padding: '24px',
            backgroundColor: '#EFE1AA',
            color: '#000',
            border: '4px solid #000',
            borderRadius: '6px',
          }}
        >
          {JSON.stringify(test, null, 1)}
        </code>
      </pre>
      {true && ( // TODO showLogin
        <div style={{ textAlign: 'right' }}>
          <Space
            h={{ size: 'l', properties: ['padding-right', 'padding-left'] }}
            className={classNames({
              'text-align-right': true,
            })}
          >
            {/* // TODO just /account */}
            <a href="http://localhost:3000/account">Login</a>
          </Space>
        </div>
      )}
      <div
        className={classNames({
          'header grid bg-white border-color-pumice border-bottom-width-1': true,
          'header--is-burger-open': isActive,
        })}
        style={{
          height: `${navHeight}px`,
        }}
      >
        <div className="header__upper grid__cell">
          <div className="header__inner container">
            <div className="header__burger">
              <a
                href="#footer-nav-1"
                id="header-burger-trigger"
                className="header__burger-trigger"
                aria-label="menu"
                onClick={event => {
                  event.preventDefault();
                  setIsActive(!isActive);
                }}
              >
                <span />
                <span />
                <span />
              </a>
            </div>
            <div className="header__brand">
              <a href="/" className="header__brand-link">
                <WellcomeCollectionBlack />
              </a>
            </div>
            <nav
              id="header-nav"
              className="header__nav"
              aria-labelledby="header-burger-trigger"
            >
              <ul
                className={`plain-list header__list ${font(
                  'wb',
                  5
                )} no-margin no-padding`}
              >
                {links.map((link, i) => (
                  <li
                    className={`header__item ${
                      link.siteSection === siteSection
                        ? ' header__item--is-current'
                        : ''
                    }`}
                    key={i}
                  >
                    <a
                      className="header__link"
                      href={link.href}
                      {...(link.siteSection === siteSection
                        ? { 'aria-current': true }
                        : {})}
                    >
                      {link.title}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            {/* we leave this here until we know exactly what we want to do with search */}
            <div id="header-search" className="header__search" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
