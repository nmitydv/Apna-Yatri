import {
    Controller,
    Get,
    Post,
    Body,
    Delete,
    Put,
    NotFoundException,
    Patch,
    HttpCode,
    HttpStatus,
    Param,
    Query,
    BadRequestException,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PaginationService } from 'src/common/pagination/services/pagination.service';
import {
    Response,
    ResponsePaging,
} from 'src/common/response/decorators/response.decorator';
import {
    IResponsePaging,
} from 'src/common/response/interfaces/response.interface';
import { UserService } from 'src/modules/user/services/user.service';
import { AuthJwtAdminAccessProtected, AuthJwtAccessRoleProtected } from 'src/common/auth/decorators/auth.jwt.decorator';
import {
    USER_DEFAULT_AVAILABLE_ORDER_BY,
    USER_DEFAULT_AVAILABLE_SEARCH,
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
import { UserDoc } from 'src/modules/user/repository/entities/user.entity';
import { IDatabaseCreateOptions } from 'src/common/database/interfaces/database.interface';
import { DebuggerService } from 'src/common/debugger/services/debugger.service';
import { ENUM_AUTH_ACCESS_FOR } from 'src/common/auth/constants/auth.enum.constant';
import { SkipThrottle } from '@nestjs/throttler';

@ApiTags('modules.admin.user')
@Controller({
    version: '1',
    path: '/user',
})
export class UserAdminController {
    constructor(
        private readonly paginationService: PaginationService,
        private readonly userService: UserService,
        private readonly logger: DebuggerService,
    ) {}

    @SkipThrottle()
    @Response('user.get')
    @AuthJwtAccessRoleProtected([ENUM_AUTH_ACCESS_FOR.ADMIN, ENUM_AUTH_ACCESS_FOR.USER])
    @Get('/:id')
    async findOne(@Param('id') id: string, @Query() options: IDatabaseCreateOptions) {
        this.logger.info2("UserAdminController.findOne() started");
        try {
            const user = await this.userService.findOneById<UserDoc>(id, options);
            this.logger.info2("UserAdminController.findOne() ended");
            return { data: user.toObject() };
        } catch (error) {
            console.error(error);
            throw new BadRequestException('User not found: ' + error.message);
        }
    }

    @ResponsePaging('user.list')
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
    ): Promise<IResponsePaging> {
        this.logger.info2("UserAdminController.list() started");
        const find: Record<string, any> = {
            ..._search,
            ...role,
            ...isActive,
        };

        const users = await this.userService.findAll(find, {
            paging: {
                limit: _limit,
                offset: _offset,
            },
            order: _order,
        });
        const total: number = await this.userService.getTotal(find);
        const totalPage: number = this.paginationService.totalPage(total, _limit);
        this.logger.info2("UserAdminController.list() ended");
        return {
            _pagination: { total, totalPage },
            data: users,
        };
    }

    @Response('user.updateActive')
    @AuthJwtAdminAccessProtected()
    @Patch('Active/:userId/:isActive')
    async updateIsActiveUser(@Param("userId") userId: string, @Param('isActive') isActive: boolean) {
        this.logger.info2("UserAdminController.updateIsActiveUser() started");
        if (isActive == null || !userId) {
            throw new BadRequestException("Enter correct user data.");
        }
        try {
            const user = await this.userService.updateIsActive(userId, isActive);
            this.logger.info2("UserAdminController.updateIsActiveUser() ended");
            return { data: user.toObject() };
        } catch (err) {
            throw new BadRequestException("Failed to update user activity: " + err.message);
        }
    }
}
