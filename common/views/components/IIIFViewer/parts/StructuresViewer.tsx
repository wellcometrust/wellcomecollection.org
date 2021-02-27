import { IIIFManifest } from '@weco/common/model/iiif';
import { getStructures, getCanvases } from '@weco/common/utils/iiif';
import { FunctionComponent, RefObject } from 'react';
import { FixedSizeList } from 'react-window';

type Props = {
  manifest: IIIFManifest | undefined;
  setActiveIndex: (number) => void;
  setGridVisible: (boolean) => void;
  mainViewerRef: RefObject<FixedSizeList>;
};
const StructuresViewer: FunctionComponent<Props> = ({
  manifest,
  setActiveIndex,
  mainViewerRef,
  setGridVisible,
}: Props) => {
  const structures = manifest ? getStructures(manifest) : [];
  const canvases = manifest ? getCanvases(manifest) : [];

  return structures.length > 0 ? (
    <ul>
      {structures.map((structure, i) => {
        const firstCanvasInRange = structure.canvases[0];
        const canvasIndex = canvases.findIndex(
          canvas => canvas['@id'] === firstCanvasInRange
        );
        return (
          <li key={i}>
            <a
              onClick={e => {
                e.preventDefault();
                mainViewerRef &&
                  mainViewerRef.current &&
                  mainViewerRef.current.scrollToItem(canvasIndex);
                setActiveIndex(canvasIndex);
                setGridVisible(false);
              }}
            >
              {structure.label}
            </a>
          </li>
        );
      })}
    </ul>
  ) : null;
};

export default StructuresViewer;
