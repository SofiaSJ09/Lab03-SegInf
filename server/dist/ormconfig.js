"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const risk_entity_1 = require("./src/risks/entities/risk.entity");
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'sqlite',
    database: 'data.sqlite',
    synchronize: true,
    logging: false,
    entities: [risk_entity_1.Risk],
    migrations: [],
    subscribers: [],
});
//# sourceMappingURL=ormconfig.js.map