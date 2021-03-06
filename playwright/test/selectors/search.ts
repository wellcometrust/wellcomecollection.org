import {
  searchFormInputImage,
  searchFilterCloseButton,
} from '../text/aria-labels';

// input

export const worksSearchImagesInputField = `input[aria-label="${searchFormInputImage}"]`;

// modal

export const mobileModal = '#mobile-filters-modal';
export const mobileModalCloseButton = `${mobileModal} button[aria-label="${searchFilterCloseButton}"]`;
export const formatFilterDropDownContainer = 'div[id="workType"]';
export const formatFilterMobileButton =
  'button[aria-controls="mobile-filters-modal"]';

// dropdown

export const formatFilterDropDown = '#workType';
export const formatFilterDropDownButton = 'button[aria-controls="workType"]';

// result list

export const searchResultsContainer = 'ul[role="list"]';
