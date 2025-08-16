"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const common_1 = require("@nestjs/common");
const request = require("supertest");
const app_module_1 = require("./../src/app.module");
describe('Risk Calculator (e2e)', () => {
    let app;
    beforeEach(async () => {
        const moduleFixture = await testing_1.Test.createTestingModule({
            imports: [app_module_1.AppModule],
        }).compile();
        app = moduleFixture.createNestApplication();
        app.useGlobalPipes(new common_1.ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            transform: true,
        }));
        await app.init();
    });
    afterAll(async () => {
        await app.close();
    });
    it('/api/risks (POST)', () => {
        const createRiskDto = {
            hazard: 'Test electrical hazard',
            likelihood: 3,
            severity: 4,
        };
        return request(app.getHttpServer())
            .post('/api/risks')
            .send(createRiskDto)
            .expect(201)
            .expect((res) => {
            expect(res.body).toHaveProperty('id');
            expect(res.body.hazard).toBe(createRiskDto.hazard);
            expect(res.body.likelihood).toBe(createRiskDto.likelihood);
            expect(res.body.severity).toBe(createRiskDto.severity);
            expect(res.body.riskScore).toBe(createRiskDto.likelihood * createRiskDto.severity);
            expect(res.body.riskLevel).toBe('High');
        });
    });
    it('/api/risks (GET)', () => {
        return request(app.getHttpServer())
            .get('/api/risks')
            .expect(200)
            .expect((res) => {
            expect(Array.isArray(res.body)).toBe(true);
        });
    });
});
//# sourceMappingURL=app.e2e-spec.js.map