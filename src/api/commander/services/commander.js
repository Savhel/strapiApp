'use strict';

/**
 * commander service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::commander.commander');
