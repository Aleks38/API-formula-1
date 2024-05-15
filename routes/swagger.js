const swaggerUi = require('swagger-ui-express' )
const swaggerJsdoc = require ("swagger-jsdoc");

const options = {
    definition: {
        openapi: "3.1.0",
        info: {
            title: "Formula 1 API",
            version: "0.1.0",
            description:
                "C'est une API qui permet d'avoir les principales données sur la Formule 1",
            contact: {
                name: "Alexy Da Silva",
                email: "alexy.da-silva@etu.univ-grenoble-alpes.fr",
            },
        },
        servers: [
            {
                url: "http://localhost:3000/",
            },
        ],
    },
    apis: ["./routes/*.js"],
};

const specs = swaggerJsdoc(options);

module.exports = (app) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, {explorer: true}));
}