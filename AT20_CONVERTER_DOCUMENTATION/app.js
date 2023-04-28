const express = require('express');
const app = express();
const swaggerUi = require('swagger-ui-express');
const fs = require("fs");
const dotenv = require('dotenv');
const YAML = require('yaml');

const file  = fs.readFileSync('./src/views/converter.yaml', 'utf8')
const swaggerDocument = YAML.parse(file)

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const PORT = process.env.PORT || 9595;

app.listen(PORT, () => {
    console.info(`Server running on port ${PORT}`);
});
