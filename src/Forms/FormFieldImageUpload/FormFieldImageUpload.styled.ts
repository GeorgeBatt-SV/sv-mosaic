import styled from 'styled-components';
import theme from '@root/theme';
import { AssetCard, ButtonsWrapper } from '../ImageVideoDocumentSetUp/ImageVideoDocumentSetUp.styled';

export const DragAndDropContainer = styled.div`
  align-items: center;
  background-color: ${theme.colors.gray200};
  display: flex;
  flex-direction: column;
  height: 204px;
  justify-content: center;
  position: relative;
  width: 300px;
`;

export const DragAndDropSpan = styled.span`
  color: ${theme.colors.gray600};
  font-size: 16px;
  margin-bottom: 24px;
`;

export const FileInput = styled.input`
  height: 100%;
  opacity: 0;
  position: absolute;
  width: 100%;

  &:focus {
    outline: none;
  }
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Row = styled.div`
  display: flex;
`;

export const ImagePropertiesColumn = styled(Column)`
  margin-left: 16px;
`;

export const MenuColumn = styled(Column)`
  margin-left: auto;
`;

export const ImageCard = styled(AssetCard)``;

export const ButtonsContainer = styled(ButtonsWrapper)``;

export const ImgLoaded = styled.img`
  border: 2px solid ${theme.colors.gray200};
  object-fit: cover;
`;
