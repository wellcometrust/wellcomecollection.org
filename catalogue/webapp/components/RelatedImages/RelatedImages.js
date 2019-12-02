// @flow
import { font, grid } from '@weco/common/utils/classnames';
import Image from '@weco/common/views/components/Image/Image';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getSimilarPaletteImages } from '../../services/labs/palette-api';

type Props = {|
  originalId: string,
|};

const Wrapper = styled.div`
  padding-top: 40px;
  width: 100%;
`;

const ImageContainer = styled.div`
  margin-top: auto;
  padding-top: 20px;
`;

const RelatedImages = ({ originalId }: Props) => {
  const [relatedImages, setRelatedImages] = useState([]);
  useEffect(() => {
    const fetchRelatedImages = async () =>
      setRelatedImages(await getSimilarPaletteImages(originalId, 6));
    fetchRelatedImages();
  }, []);
  return relatedImages.length === 0 ? null : (
    <Wrapper>
      <h3 className={font('hnm', 4)}>Related images</h3>
      <div className="grid">
        {relatedImages.map(related => (
          <ImageContainer
            className={grid({ s: 6, m: 4, l: 4, xl: 4 })}
            key={related.id}
          >
            <Image
              contentUrl={related.miroUri}
              defaultSize={250}
              width={250}
              alt="foo"
              tasl={null}
            />
          </ImageContainer>
        ))}
      </div>
    </Wrapper>
  );
};

export default RelatedImages;
