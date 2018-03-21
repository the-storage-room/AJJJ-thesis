import db from '../../config/database/index';

import {
  fetchStarredMatchesHelper,
  fetchUnstarredMatchesHelper,
  starSingleMatchHelper,
  unstarSingleMatchHelper,
  addOutcomesHelper
} from './outcomesSQLHelpers';

export const addOutcomeQuery = async body => {
  try {
    const queryString = addOutcomesHelper(body);
    const { rows } = await db.query(queryString);
    console.log('Success on addOutcomeQuery', rows[0]);
    return rows[0];
  } catch (err) {
    console.log('Error on addOutcomeQuery', err);
  }
};

export const fetchStarredMatchesQuery = async body => {
  try {
    const queryString = fetchStarredMatchesHelper(body);
    const data = await db.query(queryString);
    console.log('Success on fetchStarredMatchesQuery', data);
    return data;
  } catch (err) {
    console.log('Error on fetchStarredMatchesQuery', err);
  }
};

export const fetchUnstarredMatchesQuery = async body => {
  try {
    const queryString = fetchUnstarredMatchesHelper(body);
    const data = await db.query(queryString);
    console.log('Success on fetchUnStarredMatchesQuery', data);
    return data;
  } catch (err) {
    console.log('Error on fetchUnstarredMatchesQuery', err);
  }
};

export const starSingleMatchQuery = async body => {
  try {
    const queryString = starSingleMatchHelper(body);
    const data = await db.query(queryString);
    console.log('Success on starSingleMatchQuery', data);
    return data;
  } catch (err) {
    console.log('Error on starSingleMatchQuery', err);
  }
};

export const unstarSingleMatchQuery = async body => {
  try {
    const queryString = unstarSingleMatchHelper(body);
    const data = await db.query(queryString);
    console.log('Success on unstarSingleMatchQuery', data);
    return data;
  } catch (err) {
    console.log('Error on unstarSingleMatchQuery', err);
  }
};