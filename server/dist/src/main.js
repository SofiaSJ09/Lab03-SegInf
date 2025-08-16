"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: { enableImplicitConversion: true },
    }));
    const isProd = process.env.NODE_ENV === 'production' ||
        process.env.RENDER === 'true' ||
        !!process.env.PORT;
    if (isProd) {
        const frontendOrigin = process.env.FRONTEND_ORIGIN;
        app.enableCors({
            origin: frontendOrigin
                ? [frontendOrigin]
                : [/^http:\/\/localhost:\d+$/, /\.vercel\.app$/],
        });
        if (process.env.API_PREFIX) {
            app.setGlobalPrefix(process.env.API_PREFIX);
        }
        const port = parseInt(process.env.PORT || '3001', 10);
        await app.listen(port, '0.0.0.0');
        console.log(`Risk Calculator API running on http://0.0.0.0:${port}${process.env.API_PREFIX ? `/${process.env.API_PREFIX}` : ''}`);
    }
    else {
        app.enableCors({
            origin: 'http://localhost:5173',
        });
        await app.listen(3001);
        console.log('Risk Calculator API running on http://localhost:3001');
    }
}
bootstrap();
//# sourceMappingURL=main.js.map