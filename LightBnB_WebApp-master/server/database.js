/* eslint-disable camelcase */
const properties = require('./json/properties.json');
const users = require('./json/users.json');


const { Pool } = require('pg');
const { query } = require('express');

const pool = new Pool({
  user: 'vagrant',
  password: '1234',
  host: 'localhost',
  database: 'lightBnB'
});

// the following assumes that you named your connection variable `pool`
// pool.query(`SELECT title FROM properties LIMIT 10;`)
//   .then(response => {
//     console.log(response);
//   });
/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */

// const getUserWithEmail = function (email) {
//   let user;
//   for (const userId in users) {
//     user = users[userId];
//     if (user.email.toLowerCase() === email.toLowerCase()) {
//       break;
//     } else {
//       user = null;
//     }
//   }
//   return Promise.resolve(user);
// };
const getUserWithEmail = (email) => {
  return pool
    .query(`
      SELECT * FROM users WHERE email $1`, [email])
    .then((result) => {
      const resultRowsLength = result.rows.length;
      if (resultRowsLength !== 0) {
        console.log(result.rows);
        return result.rows[0];
      } else return null;
    })
    .catch((err) => {
      console.log(err.message);
    });
};
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */

// const getUserWithId = function (id) {
//   return Promise.resolve(users[id]);
// };
const getUserWithId = (id) => {
  return pool
    .query(`
      SELECT * FROM users WHERE id $1`, [id])
    .then((result) => {
      const resultRowsLength = result.rows.length;
      if (resultRowsLength !== 0) {
        console.log(result.rows);
        return result.rows[0];
      } else return null;
    })
    .catch((err) => {
      console.log(err.message);
    });
};
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */

// const addUser = function (user) {
//   const userId = Object.keys(users).length + 1;
//   user.id = userId;
//   users[userId] = user;
//   return Promise.resolve(user);
// };
const addUser = (user) => {
  return pool
    .query(`
      INSERT INTO users (name, email, password)
        VALUES ($1, $2, $3)
        RETURNING *;`, [user.name, user.email, user.password])
    .then((result) => {
      const resultRowsLength = result.rows.length;
      if (resultRowsLength !== 0) {
        console.log(result.rows);
        return result.rows[0];
      } else return null;
    })
    .catch((err) => {
      console.log(err.message);
    });
};
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */

// const getAllReservations = function (guest_id, limit = 10) {
//   return getAllProperties(null, 2);
// };
const getAllReservations = (guest_id, limit = 10) => {
  return pool
    .query(`
      SELECT reservations.id, properties.title, properties.cost_per_night, reservations.start_date, avg(rating) as average_rating
      FROM reservations
      JOIN properties ON reservations.property_id = properties.id
      JOIN property_reviews ON properties.id = property_reviews.property_id
      WHERE reservations.guest_id = $1
      GROUP BY properties.id, reservations.id
      ORDER BY reservations.start_date
      LIMIT $2;`, [guest_id, limit])
    .then((result) => {
      const resultRowsLength = result.rows.length;
      if (resultRowsLength !== 0) {
        console.log(result.rows);
        return result.rows[0];
      } else return null;
    })
    .catch((err) => {
      console.log(err.message);
    });
};
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */

// const getAllProperties = function (options, limit = 10) {
//   const limitedProperties = {};
//   for (let i = 1; i <= limit; i++) {
//     limitedProperties[i] = properties[i];
//   }
//   return Promise.resolve(limitedProperties);
// };
const getAllProperties = (options, limit = 10) => {
  const queryParams = [];

  let queryString = `
  SELECT properties.*, avg(property_reviews.rating) as average_rating
    FROM properties
    JOIN property_reviews ON properties.id = property_id
      WHERE true
    `;
  // -------city-------
  if (options.city) {
    queryParams.push(`%${options.city}%`);
    queryString += `AND city LIKE $${queryParams.length};`;
  }
  // -------owner_id-------
  if (options.owner_id) {
    queryParams.push(`%${options.owner_id}`);
    queryString += `AND owner_id = ${queryParams.length};`;
  }
  // -------minimum_price_per_night-------
  if (options.minimum_price_per_night) {
    queryParams.push(`%${options.minimum_price_per_night}`);
    queryString += `AND cost_per_night >= ${queryParams.length};`;
  }
  // -------maximum_price_per_night-------
  if (options.maximum_price_per_night) {
    queryParams.push(`%${options.maximum_price_per_night}`);
    queryString += `AND cost_per_night <= ${queryParams.length};`;
  }
  // -------minimum_rating-------
  if (options.minimum_rating) {
    queryParams.push(`%${options.minimum_rating}`);
    queryString += `HAVING average_rating >= ${queryParams.length};`;
  }

  queryParams.Push(limit);
  queryString += `
  GROUP BY properties.id
  ORDER BY cost_per_night
  LIMIT $${queryParams.length};
  `;

  console.log(queryString, queryParams);

  return pool.query({ queryString, queryParams })
    .then((res) => res.rows);
};
exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */

// const addProperty = function (property) {
//   const propertyId = Object.keys(properties).length + 1;
//   property.id = propertyId;
//   properties[propertyId] = property;
//   return Promise.resolve(property);
// };
const addProperty = (property) => {
  const queryParams = [property.owner_id, property.title, property.description, property.thumbnail_photo_url, property.cover_photo_url, property.cost_per_night, property.parking_spaces, property.number_of_bathrooms, property.number_of_bedrooms, property.country, property.street, property.city, property.province, property.post_code, property.active];

  let queryString = `
  INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code, active)
  VALUES(
    $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15);
    `;

  return pool.query({ queryString, queryParams })
    .then((res) => res.rows);
};
exports.addProperty = addProperty;
