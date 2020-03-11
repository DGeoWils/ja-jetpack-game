import {
  colorDarkBrown,
  colorLightTan,
  colorDarkTan,
  colorLightPurple,
  colorDarkPurple,
  colorMediumBlue,
  colorDarkBlue,
  colorLightMetal,
  colorDarkMetal,
  colorBlack,
  colorWhite,
} from '../colors';

export const jettingPixels = [
  ['transparent', 'transparent', 'transparent', 'transparent', 'transparent', 'transparent', colorLightMetal, colorLightMetal, colorDarkMetal, 'transparent', 'transparent', 'transparent', 'transparent'],
  ['transparent', 'transparent', colorBlack, colorBlack, colorBlack, colorBlack, colorLightMetal, colorLightMetal, colorDarkMetal, colorDarkMetal, 'transparent', 'transparent', 'transparent'],
  ['transparent', colorBlack, colorBlack, colorBlack, colorBlack, colorBlack, colorDarkPurple, colorDarkPurple, colorLightPurple, colorMediumBlue, colorMediumBlue, colorMediumBlue, colorBlack],
  ['transparent', colorBlack, colorBlack, colorLightTan, colorLightTan, colorLightPurple, colorLightPurple, colorDarkPurple, colorLightPurple, colorMediumBlue, colorMediumBlue, colorMediumBlue, colorBlack],
  ['transparent', colorBlack, colorLightTan, colorWhite, colorLightTan, colorLightPurple, colorLightPurple, colorDarkPurple, colorLightPurple, colorDarkBlue, colorDarkBlue, colorDarkBlue, colorBlack],
  ['transparent', colorBlack, colorLightTan, colorDarkPurple, colorLightTan, 'transparent', colorDarkTan, colorLightTan, 'transparent', 'transparent', 'transparent', 'transparent', 'transparent'],
  ['transparent', 'transparent', 'transparent', 'transparent', 'transparent', 'transparent', 'transparent', 'transparent', 'transparent', 'transparent', 'transparent', 'transparent', 'transparent']
];

export const fallingPixels = [
  ['transparent', colorBlack, colorBlack, 'transparent', 'transparent', 'transparent', colorLightMetal, colorLightMetal, colorDarkMetal, 'transparent', 'transparent', 'transparent', 'transparent'],
  [colorBlack, colorBlack, colorBlack, colorBlack, 'transparent', colorLightMetal, colorLightMetal, colorLightMetal, colorDarkMetal, colorDarkMetal, 'transparent', 'transparent', 'transparent'],
  [colorBlack, colorBlack, colorBlack, colorBlack, colorBlack, colorDarkPurple, colorDarkPurple, colorDarkPurple, colorLightPurple, colorMediumBlue, colorMediumBlue, colorMediumBlue, colorBlack],
  [colorBlack, colorBlack, colorBlack, colorLightTan, colorLightTan, colorLightPurple, colorLightPurple, colorDarkPurple, colorLightPurple, colorMediumBlue, colorMediumBlue, colorMediumBlue, colorBlack],
  ['transparent', colorBlack, colorLightTan, colorWhite, colorLightTan, colorLightPurple, colorLightPurple, colorDarkPurple, colorLightPurple, colorDarkBlue, colorDarkBlue, colorBlack, 'transparent'],
  ['transparent', colorBlack, colorLightTan, colorDarkPurple, colorLightTan, 'transparent', colorDarkPurple, colorLightTan, 'transparent', colorDarkBlue, colorDarkBlue, colorBlack, 'transparent'],
  ['transparent', 'transparent', 'transparent', 'transparent', 'transparent', 'transparent', colorDarkTan, 'transparent', 'transparent', 'transparent', 'transparent', 'transparent', 'transparent']
];
