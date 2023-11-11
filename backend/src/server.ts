import {ApiProvider} from "api-provider";
import {ExpressApiRouter} from "api-provider-express";
import mongoose from 'mongoose';
import express from "express";
import cors from "cors";
import path from "path";
import bodyParser from "body-parser";
import {ApiSwaggerProvider} from "api-core-mapper";

export class Server {
    async listen(port: number) {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/test');

        const API = new ApiProvider();

        API.service(require('../../package.json'))
            .info({
                title: 'Sprintform Homework API',
                description: 'Demo API for handling financial transactions.',
            })
            .edgeDir(path.join(__dirname, 'edges'));

        const app = express();
        app.use(cors());
        app.use(bodyParser.json());

        const mapper: ApiSwaggerProvider = await API.provide(ApiSwaggerProvider);
        mapper.levelLimit = 1;

        const swagger = (await mapper.mapV2())[0];
        const openApi = (await mapper.mapV3())[0];
        app.get('/swagger.json', (req: any, res: any) => res.send(swagger));
        app.get('/openapi.json', (req: any, res: any) => res.send(openApi));

        const provider = await API.provide(ExpressApiRouter);
        provider.apply(app)

        return new Promise<void>((resolve, reject) => {
            try {
                app.listen(port, resolve)
            }
            catch(e) {
                reject(e)
            }
        });
    }
}