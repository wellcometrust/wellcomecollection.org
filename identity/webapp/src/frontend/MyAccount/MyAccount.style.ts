import styled, { css } from 'styled-components';
import { SolidButton } from '@weco/common/views/components/ButtonSolid/ButtonSolid';

export const Grid = styled.main`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 1em;

  @media screen and (min-width: 600px) {
    grid-template-columns: 1fr 1fr;
  }
`;

export const DetailWrapper = styled.figure`
  margin: 0;
`;

export const Label = styled.figcaption.attrs({ className: 'font-hnl fonts-loaded font-size-4' })`
  display: block;
  font-weight: bold;
`;

export const HorizontalRule = styled.hr`
  grid-column: 1 / -1;
`;

const DangerButtonModifier = css`
  background-color: #d1192c;
  border-color: #d1192c;

  &:not([disabled]):hover {
    background-color: #b80013;
    border-color: #b80013;
  }
`;

export const Button = styled(SolidButton)`
  width: 100%;
  justify-content: center;
  height: 55px;

  ${props => props.isDangerous && DangerButtonModifier}
`;