import {
    Controller,
    Get,
    Post,
    Body,
    Delete,
    Put,
    InternalServerErrorException,
    NotFoundException,
    UploadedFile,
    ConflictException,
    Patch,
    HttpCode,
    HttpStatus,
    Param,
    Query,
    BadRequestException,
    UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from 'src/common/auth/services/auth.service';
import { ENUM_ERROR_STATUS_CODE_ERROR } from 'src/common/error/constants/error.status-code.constant';
import { UploadFileSingle } from 'src/common/file/decorators/file.decorator';
import { IFileExtract } from 'src/common/file/interfaces/file.interface';
import { FileExtractPipe } from 'src/common/file/pipes/file.extract.pipe';
import { FileRequiredPipe } from 'src/common/file/pipes/file.required.pipe';
import { FileSizeExcelPipe } from 'src/common/file/pipes/file.size.pipe';
import { FileTypeExcelPipe } from 'src/common/file/pipes/file.type.pipe';
import { FileValidationPipe } from 'src/common/file/pipes/file.validation.pipe';
import { ENUM_HELPER_FILE_TYPE } from 'src/common/helper/constants/helper.enum.constant';
import { PaginationService } from 'src/common/pagination/services/pagination.service';
import { RequestParamGuard } from 'src/common/request/decorators/request.decorator';
import {
    Response,
    ResponseExcel,
    ResponsePaging,
} from 'src/common/response/decorators/response.decorator';
import {
    IResponse,
    IResponsePaging,
} from 'src/common/response/interfaces/response.interface';
import { ResponseIdSerialization } from 'src/common/response/serializations/response.id.serialization';
import {
    UserGetGuard,
    UserUpdateActiveGuard,
    UserUpdateBlockedGuard,
    UserUpdateGuard,
    UserUpdateInactiveGuard,
    vehicleApprove,
} from 'src/modules/user/decorators/user.admin.decorator';
import { GetUser } from 'src/modules/user/decorators/user.decorator';
import {
    UserActiveDoc,
    UserBlockedDoc,
    UserByIdDoc,
    UserByRoleDoc,
    UserExportDoc,
    UserGetDoc,
    UserImportDoc,
    UserInactiveDoc,
    UserListDoc,
    UserUpdateDoc,
    vehicleIsApproveDoc,
} from 'src/modules/user/docs/user.admin.doc';
import { UserCreateDto } from 'src/modules/user/dtos/user.create.dto';
import { UserImportDto } from 'src/modules/user/dtos/user.import.dto';
import { UserRequestDto } from 'src/modules/user/dtos/user.request.dto';
import { IUserDoc, IUserEntity } from "src/modules/user/interfaces/user.interface";
import { UserGetSerialization } from 'src/modules/user/serializations/user.get.serialization';
import { UserImportSerialization } from 'src/modules/user/serializations/user.import.serialization';
import { UserListSerialization } from 'src/modules/user/serializations/user.list.serialization';
import { UserService } from 'src/modules/user/services/user.service';
import { AuthJwtAccessRoleProtected, AuthJwtAdminAccessProtected } from 'src/common/auth/decorators/auth.jwt.decorator';
import { UserUpdateNameDto } from 'src/modules/user/dtos/user.update-name.dto';
import {
    USER_DEFAULT_AVAILABLE_ORDER_BY,
    USER_DEFAULT_AVAILABLE_SEARCH,
    USER_DEFAULT_BLOCKED,
    USER_DEFAULT_IS_ACTIVE,
    USER_DEFAULT_ORDER_BY,
    USER_DEFAULT_ORDER_DIRECTION,
    USER_DEFAULT_PER_PAGE,
} from 'src/modules/user/constants/user.list.constant';
import { PaginationListDto } from 'src/common/pagination/dtos/pagination.list.dto';
import {
    PaginationQuery,
    PaginationQueryFilterEqual,
    PaginationQueryFilterInBoolean,
} from 'src/common/pagination/decorators/pagination.decorator';
import { UserDoc, UserEntity } from 'src/modules/user/repository/entities/user.entity';
import { VehicleService } from 'src/modules/vehicle/services/vehicle.service';
import { IDatabaseCreateOptions } from 'src/common/database/interfaces/database.interface';
import { DebuggerService } from 'src/common/debugger/services/debugger.service';
import { options } from 'yargs';
import { FirebaseAuthGuard } from 'src/common/auth/guards/firebase-auth.guard';
import { RolesGuard } from 'src/common/auth/guards/role.guard';
import { ENUM_AUTH_ACCESS_FOR } from 'src/common/auth/constants/auth.enum.constant';
import { VehicleStatus } from 'src/modules/vehicle/constants/vehicle.constant';
import { FirebaseService } from 'src/common/firebase/services/firebase.service';
import { UserNotificationConst } from '../constants/user.notification.constant';
import { UserWattsappMessageConst } from '../constants/user.wattsappMessage.constant';
import { SkipThrottle } from '@nestjs/throttler';
@ApiTags('modules.admin.user')
@Controller({
    version: '1',
    path: '/user',
})
export class UserAdminController {
    constructor(
        private readonly authService: AuthService,
        private readonly paginationService: PaginationService,
        private readonly userService: UserService,
        private readonly logger : DebuggerService,
        private readonly firebaseService: FirebaseService,
    ) { }
  // find user by id 
    @SkipThrottle()
     @UserByIdDoc()
     @Response('user.get', {
        serialization: UserGetSerialization,
      })
      @AuthJwtAccessRoleProtected([ENUM_AUTH_ACCESS_FOR.ADMIN,ENUM_AUTH_ACCESS_FOR.USER,ENUM_AUTH_ACCESS_FOR.VEHICLE_OWNER,ENUM_AUTH_ACCESS_FOR.DRIVER])
    @Get('/:id')
    async findOne(@Param('id') id: string, @Query() options: IDatabaseCreateOptions,) {
        this.logger.info2("UserAdminController.findOne() started");
       try {
         const user = await this.userService.findOneById<UserDoc>(id,options);
         this.logger.info2("UserAdminController.findOne() ended");
         return { data: user.toObject() };
       } catch (error) {
   
         console.error(error);
         throw new BadRequestException('user not found '+ error);
       }
     }


    @UserListDoc()
    @ResponsePaging('user.list', {
        serialization: UserListSerialization,
    })
    @AuthJwtAdminAccessProtected()
    @Get('')
    async list(
        @PaginationQuery(
            USER_DEFAULT_PER_PAGE,
            USER_DEFAULT_ORDER_BY,
            USER_DEFAULT_ORDER_DIRECTION,
            USER_DEFAULT_AVAILABLE_SEARCH,
            USER_DEFAULT_AVAILABLE_ORDER_BY
        )
        { _search, _limit, _offset, _order }: PaginationListDto,
        @PaginationQueryFilterEqual('role')
        role: Record<string, any>,
        @PaginationQueryFilterInBoolean('isActive', USER_DEFAULT_IS_ACTIVE)
        isActive: Record<string, any>,
        // @PaginationQueryFilterInBoolean('blocked', USER_DEFAULT_BLOCKED)
        // blocked: Record<string, any>
    ): Promise<IResponsePaging> {
        this.logger.info2("UserAdminController.list() started");
        const find: Record<string, any> = {
            ..._search,
            ...role,
            ...isActive,
            // ...blocked,
        };

        const users: IUserEntity[] = await this.userService.findAll(find, {
            paging: {
                limit: _limit,
                offset: _offset,
            },
            order: _order,
        });
        const total: number = await this.userService.getTotal(find);
        const totalPage: number = this.paginationService.totalPage(
            total,
            _limit
        );
        this.logger.info2("UserAdminController.list() ended");
        return {
            _pagination: { total, totalPage },
            data: users,
        };
    }


//     @UserGetDoc()
//     @Response('user.get', {
//         serialization: UserGetSerialization,
//     })
//     @UserGetGuard()
//     @RequestParamGuard(UserRequestDto)
//     @AuthJwtAdminAccessProtected()
//     @Get('get/:user')
//     async get(@GetUser() user: UserDoc): Promise<IResponse> {
//         const userWithRole: IUserDoc = await this.userService.findOne(
//             user
//         );
//         return { data: userWithRole.toObject() };
//     }



//     @UserUpdateDoc()
//     @Response('user.update', {
//         serialization: ResponseIdSerialization,
//     })
//     @UserUpdateGuard()
//     @RequestParamGuard(UserRequestDto)
//    @AuthJwtAdminAccessProtected()
//     async update(
//         @GetUser() user: UserDoc,
//         @Body()
//         body: UserUpdateNameDto
//     ): Promise<IResponse> {
//         try {
//             await this.userService.updateName(user, body);
//         } catch (err: any) {
//             throw new InternalServerErrorException({
//                 statusCode: ENUM_ERROR_STATUS_CODE_ERROR.ERROR_UNKNOWN,
//                 message: 'http.serverError.internalServerError',
//                 _error: err.message,
//             });
//         }

//         return {
//             data: { _id: user._id },
//         };
//     }

//     @UserInactiveDoc()
//     @Response('user.inactive')
//     @UserUpdateInactiveGuard()
//     @RequestParamGuard(UserRequestDto)
//     @AuthJwtAdminAccessProtected()
//     @Patch('/update/:user/inactive')
//     async inactive(@GetUser() user: UserDoc): Promise<void> {
//         try {
//             // await this.userService.inactive(user);
//         } catch (err: any) {
//             throw new InternalServerErrorException({
//                 statusCode: ENUM_ERROR_STATUS_CODE_ERROR.ERROR_UNKNOWN,
//                 message: 'http.serverError.internalServerError',
//                 _error: err.message,
//             });
//         }

//         return;
//     }

//     @UserActiveDoc()
//     @Response('user.active')
//     @UserUpdateActiveGuard()
//     @RequestParamGuard(UserRequestDto)
//     @AuthJwtAdminAccessProtected()
//     @Patch('/update/:user/active')
//     async active(@GetUser() user: UserDoc): Promise<void> {
//         try {
//             // await this.userService.active(user);
//         } catch (err: any) {
//             throw new InternalServerErrorException({
//                 statusCode: ENUM_ERROR_STATUS_CODE_ERROR.ERROR_UNKNOWN,
//                 message: 'http.serverError.internalServerError',
//                 _error: err.message,
//             });
//         }

//         return;
//     }

//     @UserImportDoc()
//     @Response('user.import', {
//         serialization: UserImportSerialization,
//     })
//     @UploadFileSingle('file')
//     @AuthJwtAdminAccessProtected()
//     @Post('/import')
//     async import(
//         @UploadedFile(
//             FileRequiredPipe,
//             FileSizeExcelPipe,
//             FileTypeExcelPipe,
//             FileExtractPipe,
//             new FileValidationPipe<UserImportDto>(UserImportDto)
//         )
//         file: IFileExtract<UserImportDto>
//     ): Promise<IResponse> {
//         return { data: { file } };
//     }

//     @UserExportDoc()
//     @ResponseExcel({
//         serialization: UserListSerialization,
//         fileType: ENUM_HELPER_FILE_TYPE.CSV,
//     })
//     @AuthJwtAdminAccessProtected()
//     @HttpCode(HttpStatus.OK)
//     @Post('/export')
//     async export(): Promise<IResponse> {
//         const users: IUserEntity[] = await this.userService.findAll({});

//         return { data: users };
//     }

//     @UserBlockedDoc()
//     @Response('user.blocked')
//     @UserUpdateBlockedGuard()
//     @RequestParamGuard(UserRequestDto)
//     @AuthJwtAdminAccessProtected()
//     @Patch('/update/:user/blocked')
//     async blocked(@GetUser() user: UserDoc): Promise<void> {
//         try {
//             // await this.userService.blocked(user);
//         } catch (err: any) {
//             throw new InternalServerErrorException({
//                 statusCode: ENUM_ERROR_STATUS_CODE_ERROR.ERROR_UNKNOWN,
//                 message: 'http.serverError.internalServerError',
//                 _error: err.message,
//             });
//         }
//         return;
//     }

    // @vehicleIsApproveDoc()
    // @Response('vehicle.isApprove')
    // @vehicleApprove()
    // @RequestParamGuard(vehicleIsApproveDoc)
    // @AuthJwtAdminAccessProtected()
    // @Patch('/update/:vehicle/IsApproved')
    // async isApproved(@vehicleApprove() vehicle: vehicleDoc): Promise<void> {
    //     try {
    //         // await this.userService.inactive(user);
    //         await this.vehicleService.approveVehicle(vehicle);
    //     } catch (err: any) {
    //         throw new InternalServerErrorException({
    //             statusCode: ENUM_ERROR_STATUS_CODE_ERROR.ERROR_UNKNOWN,
    //             message: 'http.serverError.internalServerError',
    //             _error: err.message,
    //         });
    //     }
    //     return;
    // }




    @vehicleIsApproveDoc()
    @Response('user.approve')
    // @AuthJwtAdminAccessProtected()
    @Patch('/:vehicleId/:isApproved')
    async approveVehicleRequest(@Param("vehicleId") vehicleId: string, @Param('isApproved') isApproved: string): Promise<void> {
        this.logger.info2("UserAdminController.approveVehicleRequest() started");
        if(!isApproved || !vehicleId || !Object.values(VehicleStatus).includes(isApproved)){
          throw new BadRequestException("enter correct data.");
        }
        try {

        const vehicle =  await this.userService.updateApprove(vehicleId, isApproved );

      const userId = vehicle.ownerId;
      let  customeNotification = null;
      let customeWattsappMessage =null;

        console.log(userId + " :  --- vehicleOwnerId ")
        if(vehicle.isApprove === "Approve"){
          console.log("enter approve ========")
            customeNotification = {
            ...UserNotificationConst.adminApproveVehicle,
          };
          customeWattsappMessage = UserWattsappMessageConst.adminApproveVehicle;
        }
        if(vehicle.isApprove === "Reject"){
          console.log("enter reject========")
            customeNotification = {
            ...UserNotificationConst.adminRejectVehicle,
          };
          customeWattsappMessage = UserWattsappMessageConst.adminRejectVehicle;
        }
        console.log(JSON.stringify(customeNotification)+"===---- notification")
         this.firebaseService.sendPushNotification([userId],customeNotification);
         this.firebaseService.sendWhatsAppMessage(userId,customeWattsappMessage);

        } catch (err) {
          throw new BadRequestException("enter valid values")
        }
        this.logger.info2("UserAdminController.approveVehicleRequest() ended");
        return;
      }

      @Response('user.approve')
    // @AuthJwtAdminAccessProtected()
    @Patch('Active/:userId/:isActive')
    async updateIsActiveUser<UserDoc>(@Param("userId") userId: string, @Param('isActive') isActive: boolean) {
        this.logger.info2("UserAdminController.updateIsActiveUser() started");
        if(isActive == null || !userId ){
            console.log("null value  catch-------")
          throw new BadRequestException("enter correct data.");
        }
        try {
            const user =  await this.userService.updateIsActive<UserDoc>(userId, isActive );
            const userid = user._id
            console.log(userid+" : userid--------") 
           
            let  customeNotification =null;
            let customeWattsappMessage =null;
            if(isActive == false){
                  customeNotification = {
                    ...UserNotificationConst.adminBlockUser,
                  };
                  customeWattsappMessage = UserWattsappMessageConst.adminBlockUser;
                  
            }
            if(isActive == true){
                customeNotification = {
                  ...UserNotificationConst.adminUnblockUser,
                };
                customeWattsappMessage = UserWattsappMessageConst.adminUnblockUser;
          }
              console.log(JSON.stringify(customeNotification)+"===---- notification")
              console.log(JSON.stringify(customeWattsappMessage)+"===---- message")
               this.firebaseService.sendPushNotification([userid],customeNotification);
               this.firebaseService.sendWhatsAppMessage(userid,customeWattsappMessage);

            this.logger.info2("UserAdminController.updateIsActiveUser() ended");
            return{ data: user.toObject() };
    } catch (err) {
        console.log("error value  catch-------")
        throw new BadRequestException("enter valid values")
    }
      
      }




      //    this.logger.info2("UserAdminController.findUsersByRole() started");
      //   try {
      //     const users = await this.userService.findUserByRole<UserDoc[]>(role,options);
      //     this.logger.info2("UserAdminController.findUsersByRole() ended");
      //     return { data: users };
      //   } catch (error) {
      //     throw new BadRequestException('users not found '+ error);
      //   }
      // }


}
