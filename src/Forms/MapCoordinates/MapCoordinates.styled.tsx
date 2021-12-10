import styled from 'styled-components';
import theme from '@root/theme';
import { StyledTextField } from '@root/forms/FormFieldText/FormFieldText.styled';

// Styles for the MapCoordinates component

export const FlexRow = styled.div`
  align-items: center;
  display: flex;
`;

export const StyledSpan = styled.span`
  color: ${theme.colors.gray600};
  font-family: ${theme.fontFamily};
  font-size: 14px;
`;

export const CoordinatesCard = styled.div`
  border: 2px solid ${theme.colors.gray200};
  border-radius: 4px;
  display: flex;
  font-family: ${theme.fontFamily};
  height: 204px;
  padding: 16px;
  position: relative;
  width: 414px;
`;

export const ButtonsWrapper = styled.div`
  bottom: 16px;
  display: flex;
  right: 16px;
  position: absolute;

  button:first-child {
    border-right: 2px solid ${theme.colors.gray200};
    padding-right: 16px;
  }

  button:last-child {
    padding-left: 16px;
  }
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

export const MapImageColumn = styled(Column)`
  margin-right: 16px;
`;

export const LatLngLabel = styled.span`
  color: ${theme.colors.gray600};
  font-size: 14px;
  font-weight: ${theme.fontWeight.semiBold};
`;

export const CoordinatesValues = styled.span`
  color: ${theme.colors.almostBlack};
  font-size: 14px;
`;

export const LatitudeValue = styled(CoordinatesValues)`
  margin-bottom: 24px;
`;

export const MapImage = styled.div`
  background-color: gray;
  height: 153px;
  width: 252px;
`;

// Styles for the Map component

export const MapContainer = styled.div`
  margin-bottom: 18px;
`;

// Styles for the LocationSearchInput component

export const LocationSearchInputWrapper = styled.div`
 margin-bottom: 8px;
`;

export const StyledInputSearch = styled(StyledTextField)`
  width: 684px;
`;

export const SuggestionsContainer = styled.div`
  border: ${theme.borders.fieldGray};
  font-family: ${theme.fontFamily};
`;

export const SuggestionsDescriptionContainer = styled.div`
  background-color: ${({ isSuggestionActive }) =>
    isSuggestionActive ? theme.colors.gray200 : 'white'};
  cursor: pointer;
  width: 683px;
`;

export const SuggestionDescription = styled.p`
  font-size: 14px;
  margin: 0;
  padding: 6px 16px 6px 16px;

  &:active {
    color: ${theme.colors.gray800};
    font-weight: ${theme.fontWeight.bold};
  }
`;
