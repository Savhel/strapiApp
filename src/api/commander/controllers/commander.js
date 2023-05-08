'use strict';

/**
 * commander controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::commander.commander', ({ strapi })=>({
    async create(ctx) {
        const { cart, info } = ctx.request.body;
        if (!cart || !info) {
            ctx.response.status = 400;
            return { error: "Le panier est vide !" };
        }

        const lineItems = await Promise.all(
            cart.map(async (product) => {
                const item = await strapi
                    .service("api::product.product")
                    .findOne(product.id);
                return {
                    price_data: {
                        currency: "XAF",
                        product_data: {
                            name: item.titre
                        },
                        unit_amount: item.prix * 100,
                    },
                    quantite: product.amount,
                };
            })
        );
        try {
            await strapi.service("api::commander.commander").create({
              data: {
                panier: cart,
                nom: info.nom,
                prenom: info.prenom,
                telephone: info.telephone,
                email: info.email,
                adresse: info.adresse,
                payement: info.payement,
                code: info.code,
              },
            });
            return (ctx.response.status = 200);
        } catch (error) {
            ctx.response.status = 500;
        }
    }
}));
