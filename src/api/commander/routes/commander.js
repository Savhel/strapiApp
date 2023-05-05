'use strict';

/**
 * commander router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::commander.commander');
