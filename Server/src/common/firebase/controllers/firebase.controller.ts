
import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ApiTags } from "@nestjs/swagger";
import { TokenDto } from './refreshdto';
import {  } from 'firebase-admin';
import { FirebaseService } from '../services/firebase.service';

// @ApiTags('modules.firebase')
@Controller({
    version: '1',
    path: '/firebase'
})

export class FirebaseController {

    constructor( private readonly firebaseService: FirebaseService) { }

    @Post('/refresh-token')
    async refreshToken(@Body() tokenDto: TokenDto): Promise<any> {
        console.log(tokenDto.refreshToken + " ----------")
        try {
            const myHeaders = {
                'Content-Type': 'application/x-www-form-urlencoded',
            };
            const urlencoded = new URLSearchParams();
            urlencoded.append('grant_type', 'refresh_token');
            urlencoded.append('refresh_token', tokenDto.refreshToken);
            const requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: urlencoded,
            };
            const results = await fetch("https://securetoken.googleapis.com/v1/token?key=AIzaSyBFlxRKkwFImunmhBLLQQpdo3daLpHOA7g", requestOptions)
            const response = await results.json()
            console.log(response + "-------res")
            return response;
        } catch (error) {
            console.log("enter catch")
            console.error('Error:', error.response?.data || error.message || error);
            throw new Error('Internal Server Error');
        }
    }
    

    
    @Get('/push-notification/:token')
    async SendNotification(@Param('token') token: string): Promise<any> {
        // console.log(tokenDto.refreshToken + " ----------")
        try {
         console.log(token);
        // (await this.firebaseService.GetFirebaseAdmin()).messaging().send({
        //     token: token,
        //     notification:{
        //         title: "test",
        //         body: "This test msg from nest js"
        //     }
        // })
        const noti = this.firebaseService.sendPushNotification(["6c694503-89b2-40ba-ad22-f76ab716e611","b32b5bfb-faaf-43fd-9bd4-694c81b6b3cc"]);
         
        } catch (error) {
            console.log("enter catch")
            console.error('Error:', error.response?.data || error.message || error);
            throw new Error('Internal Server Error');
        }
    }
    


}