import { FunctionComponent, ReactNode, useEffect, useState } from 'react';
import { AuthService, AuthServiceService } from '../../../model/iiif';
import { font } from '../../../utils/classnames';
import { trackEvent } from '@weco/common/utils/ga';
import ButtonSolid from '@weco/common/views/components/ButtonSolid/ButtonSolid';
import Space from '@weco/common/views/components/styled/Space';
import styled from 'styled-components';
import useShowClickthrough from '@weco/common/hooks/useShowClickthrough';

const IframeAuthMessage = styled.iframe`
  display: none;
`;
const iframeId = 'authMessage';
function reloadAuthIframe(document, id: string) {
  const authMessageIframe: HTMLIFrameElement = document.getElementById(id);
  // assigning the iframe src to itself reloads the iframe and refires the window.message event
  // eslint-disable-next-line no-self-assign
  authMessageIframe.src = authMessageIframe.src;
}

type Props = {
  authService: AuthService | undefined;
  tokenService: AuthServiceService | undefined;
  trackingId: string;
  children: ReactNode;
};

const IIIFClickthrough: FunctionComponent<Props> = ({
  authService,
  tokenService,
  trackingId,
  children,
}: Props) => {
  const [origin, setOrigin] = useState<string>();
  const showClickthroughMessage = useShowClickthrough(
    authService,
    tokenService
  );
  useEffect(() => {
    setOrigin(`${window.location.protocol}//${window.location.hostname}`);
  }, []);

  return authService && tokenService ? (
    <>
      {tokenService && origin && (
        <IframeAuthMessage
          id={iframeId}
          src={`${tokenService['@id']}?messageId=1&origin=${origin}`}
        />
      )}
      {showClickthroughMessage ? (
        <div className={font('hnr', 5)}>
          {authService?.label && (
            <h2 className={font('hnb', 4)}>{authService?.label}</h2>
          )}
          {authService?.description && (
            <p
              dangerouslySetInnerHTML={{
                __html: authService?.description,
              }}
            />
          )}
          {authService?.['@id'] && origin && (
            <Space as="span" h={{ size: 'm', properties: ['margin-right'] }}>
              <ButtonSolid
                text="Show the content"
                clickHandler={() => {
                  trackEvent({
                    category: 'ButtonSolidLink',
                    action: 'follow link "Show the content"',
                    label: `workId: ${trackingId}`,
                  });
                  const authServiceWindow = window.open(
                    `${authService?.['@id'] || ''}?origin=${origin}`
                  );
                  authServiceWindow &&
                    authServiceWindow.addEventListener('unload', function() {
                      reloadAuthIframe(document, iframeId);
                    });
                }}
              />
            </Space>
          )}
        </div>
      ) : (
        <>{children}</>
      )}
    </>
  ) : null;
};

export default IIIFClickthrough;
