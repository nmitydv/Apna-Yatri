/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-var-requires */
// Shim SlowBuffer to prevent crash in buffer-equal-constant-time dependency on startup under newer Node.js versions
const bufferModule = require('buffer');
if (!bufferModule.SlowBuffer) {
    bufferModule.SlowBuffer = function() {};
}
if (!bufferModule.SlowBuffer.prototype) {
    bufferModule.SlowBuffer.prototype = {};
}
if (!bufferModule.SlowBuffer.prototype.equal) {
    bufferModule.SlowBuffer.prototype.equal = function() {};
}

import { NestApplication, NestFactory } from '@nestjs/core';
import { Logger, VersioningType } from '@nestjs/common';
import { AppModule } from 'src/app/app.module';
import { ConfigService } from '@nestjs/config';
import { useContainer } from 'class-validator';
import swaggerInit from './swagger';
import { FirebaseService } from './common/firebase/services/firebase.service';
import { json } from 'express';

async function bootstrap() {
    const app: NestApplication = await NestFactory.create(AppModule);

    const configService = app.get(ConfigService);
    const firebaseService = app.get(FirebaseService);
    const databaseUri: string = configService.get<string>('database.host');
    const env: string = configService.get<string>('app.env');
    const host: string = configService.get<string>('app.http.host');
    const port: number = configService.get<number>('app.http.port');
    const globalPrefix: string = configService.get<string>('app.globalPrefix');
    const versioningPrefix: string = configService.get<string>(
        'app.versioning.prefix'
    );
    //for limit of profilePicture
    app.use(json({ limit:'100mb' }));
    const version: string = configService.get<string>('app.versioning.version');
    // enable
    const httpEnable: boolean = configService.get<boolean>('app.http.enable');
    const versionEnable: string = configService.get<string>(
        'app.versioning.enable'
    );
    const jobEnable: boolean = configService.get<boolean>('app.jobEnable');

    const logger = new Logger();
    process.env.NODE_ENV = env;

    // Global
    app.setGlobalPrefix(globalPrefix);
    useContainer(app.select(AppModule), { fallbackOnErrors: true });

    // Versioning
    if (versionEnable) {
        app.enableVersioning({
            type: VersioningType.URI,
            defaultVersion: version,
            prefix: versioningPrefix,
        });
    }

    // Swagger
    await swaggerInit(app);
// sa 
    // Listen
    await app.listen(port, host);

    logger.log(`==========================================================`);

    // logger.log(`Environment Variable`, 'NestApplication');
    // logger.log(JSON.parse(JSON.stringify(process.env)), 'NestApplication');

    logger.log(`==========================================================`);

    logger.log(`Job is ${jobEnable}`, 'NestApplication');
    logger.log(
        `Http is ${httpEnable}, ${
            httpEnable ? 'routes registered' : 'no routes registered'
        }`,
        'NestApplication'
    );
    logger.log(`Http versioning is ${versionEnable}`, 'NestApplication');

    logger.log(
        `Http Server running on ${await app.getUrl()}`,
        'NestApplication'
    );
    logger.log(`Database uri ${databaseUri}`, 'NestApplication');
    (await firebaseService.Firestore()).listCollections().then((collections) => {
        logger.log(`Firebase Firestore collections`, 'NestApplication');
        collections.forEach((collection) => {
            logger.log(`- ${collection.id}`, 'NestApplication');
        });
    }); 

    logger.log(`==========================================================`);
   
}
bootstrap();
