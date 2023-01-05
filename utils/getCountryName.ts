export const getCountryName = (country: string) => {
  let correctCountry;
  switch (country) {
    case 'UAE':
      correctCountry = 'ae';
      break;
    case 'UK':
      correctCountry = 'gb';
      break;
    default:
      correctCountry = country;
      break;
  }

  return correctCountry;
};
