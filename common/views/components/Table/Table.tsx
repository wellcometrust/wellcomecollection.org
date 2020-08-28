import styled from 'styled-components';
import {useRef, useEffect, useState} from 'react';
import { font, classNames } from '../../../utils/classnames';
import Space from '../styled/Space';
import Control from '../Buttons/Control/Control';

const ControlsWrap = styled.div`
  position: relative;
`;

const ScrollButtonWrap = styled.div`
  position: absolute;
  z-index: 2;
  top: 50%;
  cursor: pointer;
  pointer-events: ${props => props.isActive ? 'all' : 'none'};
  opacity: ${props => props.isActive ? 1 : 0.2};
  transition: opacity 300ms ease;

  ${props => props.isLeft && `
    left: 0;
    transform: translateX(-50%) translateY(-50%);
  `}

  ${props => !props.isLeft && `
    right: 0;
    transform: translateX(50%) translateY(-50%);
  `}
`

const ScrollButtons = styled.div`
  display: ${props => props.isActive ? 'block' : 'none'};
`;

const TableWrap = styled.div`
  position: relative;
  max-width: 100%;
  overflow: scroll;
  background: linear-gradient(to right, white 30%, rgba(255, 255, 255,  0)),
    linear-gradient(to right, rgba(255, 255, 255, 0), white 70%) 0 100%,
    radial-gradient(farthest-side at 0% 50%, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0)),
    radial-gradient(farthest-side at 100% 50%, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0)) 0 100%;
  background-repeat: no-repeat;
  background-color: white;
  background-size: 40px 100%, 40px 100%, 14px 100%, 14px 100%;
  background-position: 0 0, 100%, 0 0, 100%;
  background-attachment: local, local, scroll, scroll;
`;

const TableTable = styled.table.attrs({
  className: classNames({
    [font('hnl', 5)]: true,
  })
})`
  width: 100%;
  border-collapse: collapse;
`;

const TableThead = styled.thead`
  text-align: left;
`;

const TableCaption = styled.caption.attrs({
  className: classNames({
    'visually-hidden': true,
  }),
})``;

const TableTbody = styled.tbody``;

const TableTr = styled.tr`
  ${TableTbody} & {
    border-bottom: 1px dotted #ccc;
  }
`;

const TableTh = styled(Space).attrs({
  as: 'th',
  v: {size: 's', properties: ['padding-top', 'padding-bottom']},
  h: {size: 's', properties: ['padding-left', 'padding-right']},
})`
  font-weight: bold;
  background: #ddd;
  white-space: nowrap;
`;

const TableTd = styled(Space).attrs({
  as: 'td',
  v: {size: 's', properties: ['padding-top', 'padding-bottom']},
  h: {size: 's', properties: ['padding-left', 'padding-right']},
})``;

const Table = () => {
  const leftButtonRef = useRef(null);
  const rightButtonRef = useRef(null);
  const tableRef = useRef(null);
  const controlsRef = useRef(null);
  const tableWrapRef = useRef(null);
  const [isLeftActive, setIsLeftActive] = useState(false);
  const [isRightActive, setIsRightActive] = useState(false);
  const [isOverflown, setIsOverflown] = useState(false);

  function getUiData() {
    return {
      tableWidth: tableRef && tableRef.current.offsetWidth,
      tableWrapScrollLeft: tableWrapRef && tableWrapRef.current.scrollLeft,
      tableWrapWidth: tableWrapRef && tableWrapRef.current.offsetWidth,
    };
  }

  function checkOverflow() {
    setIsOverflown(tableRef && tableWrapRef && tableRef.current.offsetWidth > tableWrapRef.current.offsetWidth)
  }

  function updateButtonVisibility() {
    const {
      tableWidth,
      tableWrapScrollLeft,
      tableWrapWidth
    } = getUiData();

    setIsLeftActive(tableWrapScrollLeft > 0);
    setIsRightActive(tableWrapScrollLeft < (tableWidth - tableWrapWidth))
  }

  function scroll(isLeft: boolean) {
    // 1. get current table scroll position
    const { tableWrapScrollLeft } = getUiData();

    // 2. scroll tableWrapper
    const distance = isLeft ? -200 : 200;

    tableWrapRef && tableWrapRef.current.scrollTo({
      top: 0,
      left: tableWrapScrollLeft + distance,
      behavior: 'smooth'
    });

     // 3. update Button Visibility
    updateButtonVisibility();
  }

  function scrollLeft() {
    scroll(true);
  }

  function scrollRight() {
    scroll(false);
  }

  useEffect(() => {
    window.addEventListener('resize', checkOverflow);
    window.addEventListener('resize', updateButtonVisibility);
    tableWrapRef && tableWrapRef.current.addEventListener('scroll', updateButtonVisibility);
    leftButtonRef && leftButtonRef.current.addEventListener('click', scrollLeft);
    rightButtonRef && rightButtonRef.current.addEventListener('click', scrollRight);

    checkOverflow();
    updateButtonVisibility();

    return () => {
      window.removeEventListener('resize', checkOverflow);
      window.removeEventListener('resize', updateButtonVisibility);
      tableWrapRef && tableWrapRef.current.removeEventListener('scroll', updateButtonVisibility);
      leftButtonRef && leftButtonRef.current.removeEventListener('click', scrollLeft);
      rightButtonRef && rightButtonRef.current.removeEventListener('click', scrollRight);
    }
  }, []);

  return (
    <>
      <h2 className="h2" aria-hidden="true">Delivery schedule</h2>
      <ControlsWrap ref={controlsRef}>
        <ScrollButtons isActive={isOverflown}>
          <ScrollButtonWrap isLeft isActive={isLeftActive} ref={leftButtonRef}>
            <Control icon="chevron" extraClasses="icon--90 bg-white font-green border-width-2 border-color-green" />
          </ScrollButtonWrap>
          <ScrollButtonWrap isActive={isRightActive} ref={rightButtonRef}>
            <Control icon="chevron" extraClasses="icon--270 bg-white font-green border-width-2 border-color-green" />
          </ScrollButtonWrap>
        </ScrollButtons>
        <TableWrap ref={tableWrapRef}>
          <TableTable id="table" ref={tableRef}>
            <TableCaption>Delivery schedule</TableCaption>
            <colgroup>
              <col />
              <col />
              <col />
              <col />
              <col />
              <col />
            </colgroup>
            <TableThead>
              <TableTr>
                <TableTh scope="col">Monday</TableTh>
                <TableTh scope="col">Tuesday</TableTh>
                <TableTh scope="col">Wednesday</TableTh>
                <TableTh scope="col">Thursday</TableTh>
                <TableTh scope="col">Friday</TableTh>
                <TableTh scope="col">Saturday</TableTh>
              </TableTr>
            </TableThead>
            <TableTbody>
              <TableTr>
                <TableTd>11:00</TableTd>
                <TableTd>11:00</TableTd>
                <TableTd>11:00</TableTd>
                <TableTd>11:00</TableTd>
                <TableTd>11:00</TableTd>
                <TableTd>11:00</TableTd>
              </TableTr>
              <TableTr>
                <TableTd>12:00</TableTd>
                <TableTd>12:00</TableTd>
                <TableTd>12:00</TableTd>
                <TableTd>12:00</TableTd>
                <TableTd>12:00</TableTd>
                <TableTd>12:00</TableTd>
              </TableTr>
              <TableTr>
                <TableTd>13:00</TableTd>
                <TableTd>13:00</TableTd>
                <TableTd>13:00</TableTd>
                <TableTd>13:00</TableTd>
                <TableTd>13:00</TableTd>
                <TableTd>13:00</TableTd>
              </TableTr>
            </TableTbody>
          </TableTable>
        </TableWrap>
      </ControlsWrap>
    </>
  );
};

export default Table;