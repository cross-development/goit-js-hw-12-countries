'use strict';

export default function fetchCountries(searchQuery) {
  const baseUrl = 'https://restcountries.eu/rest/v2/';

  return fetch(baseUrl + searchQuery).then(response => response.json());
}
