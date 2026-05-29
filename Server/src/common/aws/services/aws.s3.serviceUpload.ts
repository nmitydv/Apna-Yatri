import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { json } from 'stream/consumers';

@Injectable()
export class AwsUploadService {
    private readonly s3Client = new S3Client({credentials:{
        accessKeyId:this.configService.get("AWS_CREDENTIAL_KEY"),
        secretAccessKey : this.configService.get("AWS_CREDENTIAL_SECRET"),
    }
        , region : this.configService.getOrThrow('AWS_S3_REGION')});
    constructor(private readonly configService:ConfigService){}
    async upload(fileName : string , file:string){
        const buf = Buffer.from(file.replace(/^data:image\/\w+;base64,/, ""),'base64')
        await this.s3Client.send(
            new PutObjectCommand({
                Bucket :'singaji-code-masters',
                Key : `${fileName}`,
                Body:buf,
                ContentEncoding: 'base64',
                ContentType:'image/png'
            }),
        );

        return fileName;
    }
}
