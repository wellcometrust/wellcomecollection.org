import { useRouter } from 'next/router';
import { FunctionComponent, useEffect, useState } from 'react';
import { ParsedUrlQuery } from 'querystring';
import cookies from 'next-cookies';
import useIsomorphicLayoutEffect from '../../../hooks/useIsomorphicLayoutEffect';

type Prop = {
  id: string;
  label: string;
  value: string;
};
const routeProps = {
  '/work': async (query: ParsedUrlQuery): Promise<Prop[]> => {
    const { id } = query;
    const work = await fetch(
      `https://api.wellcomecollection.org/catalogue/v2/works/${id}?include=identifiers`
    ).then(res => res.json());

    return work.identifiers.map(id => ({
      id: id.value,
      label: id.identifierType.label,
      value: id.value,
    }));
  },
};

const ApiToolbar: FunctionComponent = () => {
  const cookieName = 'apiToolbarMini';
  const router = useRouter();
  const [props, setProps] = useState<Prop[]>([]);
  const [mini, setMini] = useState<boolean>(false);
  useIsomorphicLayoutEffect(() => {
    setMini(cookies({})[cookieName] === 'true');
  }, []);
  useEffect(() => {
    const fn = routeProps[router.route];
    if (fn) {
      fn(router.query).then(setProps);
    }
  }, []);

  return (
    <div
      className={`bg-purple font-white flex ${mini && 'inline-block'}`}
      style={{
        zIndex: 100,
      }}
    >
      <div
        className="flex flex--v-center"
        style={{
          flexGrow: 1,
        }}
      >
        {!mini && (
          <>
            <span
              className="h3"
              style={{
                marginLeft: '10px',
              }}
            >
              API toolbar
            </span>
            <ul className="flex plain-list no-margin font-size-5">
              {props.map(prop => (
                <li
                  key={prop.id}
                  style={{
                    marginRight: '10px',
                  }}
                >
                  {prop.label}: {prop.value}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>

      <button
        className="plain-button"
        type="button"
        onClick={() => {
          setMini(!mini);
          document.cookie = `${cookieName}=${!mini}; path=/`;
        }}
        style={{ padding: '10px' }}
      >
        {!mini && <>🤏</>}
        {mini && <>👐</>}
      </button>
    </div>
  );
};

export default ApiToolbar;