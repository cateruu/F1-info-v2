export const getCountryName = (country: string) => {
  let correctCountry;
  if (country === 'UAE') {
    correctCountry = 'ae';
  } else {
    correctCountry = country;
  }

  return correctCountry;
};
