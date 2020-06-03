'use strict';
const debounce = require('lodash.debounce');
import { error, Stack } from '@pnotify/core';
import createCountryMarkup from '../templates/country-info-template.hbs';
import fetchCountries from './fetchCountries';

const refs = {
  input: document.querySelector('#search-input'),
  countryInfo: document.querySelector('#country-info'),
  countriesList: document.querySelector('#countries-list'),
};

refs.input.addEventListener('input', debounce(searchCountryFromInput, 500));

function searchCountryFromInput(e) {
  const searchQuery = 'name/' + e.target.value;

  fetchCountries(searchQuery)
    .then(buildCountryInfoMarkup)
    .catch(() => error({ text: 'Please enter a valid request!' }));
}

function buildCountryInfoMarkup(countries) {
  clearInputs();

  if (countries.length >= 10) {
    const myStack = new Stack({
      dir1: 'down',
      dir2: 'left',
      firstpos1: 53,
      firstpos2: 8,
      context: document.querySelector('.country-wrapper'),
    });
    return error({
      text: 'Too many matches found. Please enter a more specific query!',
      stack: myStack,
    });
  }

  const markup = [];

  if (countries.length > 1 && countries.length < 10) {
    markup = countries.map(country => `<li>${country.name}</li>`).join('');
    refs.countriesList.insertAdjacentHTML('afterbegin', markup);
  } else {
    markup = countries.map(createCountryMarkup).join('');
    refs.countryInfo.insertAdjacentHTML('afterbegin', markup);
  }
}

function clearInputs() {
//refs.input.value = '';
  refs.countryInfo.innerHTML = '';
  refs.countriesList.innerHTML = '';
}
