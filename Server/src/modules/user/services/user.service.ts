import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { IUserService } from 'src/modules/user/interfaces/user.service.interface';
import {
    IDatabaseCreateOptions,
    IDatabaseExistOptions,
    IDatabaseFindAllOptions,
    IDatabaseFindOneOptions,
    IDatabaseOptions,
    IDatabaseManyOptions,
} from 'src/common/database/interfaces/database.interface';
import {
    UserDoc,
    UserEntity,
} from 'src/modules/user/repository/entities/user.entity';
import { UserRepository } from 'src/modules/user/repository/repositories/user.repository';
import { HelperDateService } from 'src/common/helper/services/helper.date.service';
import { ConfigService } from '@nestjs/config';
import { HelperStringService } from 'src/common/helper/services/helper.string.service';
import { UserCreateDto } from 'src/modules/user/dtos/user.create.dto';
import { UserUpdateNameDto } from 'src/modules/user/dtos/user.update-name.dto';
import { UserPayloadSerialization } from 'src/modules/user/serializations/user.payload.serialization';
import { plainToInstance } from 'class-transformer';
import { IUserDoc } from '../interfaces/user.interface';
import { UserUpdateDto } from '../dtos/user.update.dto';
import { DebuggerService } from 'src/common/debugger/services/debugger.service';
import { AwsS3Serialization } from 'src/common/aws/serializations/aws.s3.serialization';

@Injectable()
export class UserService implements IUserService {
    private readonly uploadPath: string;

    constructor(
        private readonly userRepository: UserRepository,
        private readonly helperDateService: HelperDateService,
        private readonly helperStringService: HelperStringService,
        private readonly configService: ConfigService,
        private readonly logger: DebuggerService,
    ) {
        this.uploadPath = this.configService.get<string>('user.uploadPath') || '/tmp';
    }

    async findAll(find?: Record<string, any>, options?: IDatabaseFindAllOptions): Promise<UserEntity[]> {
        return this.userRepository.findAll<UserEntity>(find, options);
    }

    async findOneById<T>(_id: string, options?: IDatabaseFindOneOptions): Promise<T> {
        return this.userRepository.findOne<T>({ _id }, options);
    }

    async findOne<T>(find: Record<string, any>, options?: IDatabaseFindOneOptions): Promise<T> {
        return this.userRepository.findOne<T>(find, options);
    }

    async findOneByUsername<T>(username: string, options?: IDatabaseFindOneOptions): Promise<T> {
        return this.userRepository.findOne<T>({ username }, options);
    }

    async getTotal(find?: Record<string, any>, options?: IDatabaseOptions): Promise<number> {
        return this.userRepository.getTotal(find, options);
    }

    async create(
        {
            name,
            location,
            gender,
            email,
            mobileNumber,
            role,
            age,
            profilePicture,
        }: UserCreateDto,
        options?: IDatabaseCreateOptions
    ): Promise<UserDoc> {
        const create: UserEntity = new UserEntity();
        create.name = name;
        create.location = location;
        create.email = email;
        create.role = role;
        create.isActive = true;
        create.age = age;
        create.gender = gender;
        create.joiningDate = this.helperDateService.create();
        create.mobileNumber = mobileNumber ?? undefined;
        create.profilePicture = profilePicture ?? undefined;
        create.notificationTokens = [];

        return this.userRepository.create<UserEntity>(create, options);
    }

    async existByEmail(email: string, options?: IDatabaseExistOptions): Promise<boolean> {
        return this.userRepository.exists(
            {
                email: {
                    $regex: new RegExp(`\\b${email}\\b`),
                    $options: 'i',
                },
            },
            { ...options, withDeleted: true }
        );
    }

    async existByMobileNumber(mobileNumber: string, options?: IDatabaseExistOptions): Promise<boolean> {
        return this.userRepository.exists({ mobileNumber }, { ...options, withDeleted: true });
    }

    async existByUsername(username: string, options?: IDatabaseExistOptions): Promise<boolean> {
        return this.userRepository.exists({ username }, { ...options, withDeleted: true });
    }

    async delete(repository: UserDoc): Promise<UserDoc> {
        return this.userRepository.softDelete(repository);
    }

    async updateName(repository: UserDoc, { name }: UserUpdateNameDto): Promise<UserDoc> {
        repository.name = name;
        return this.userRepository.save(repository);
    }

    async updatePhoto(
        repository: UserDoc,
        photo: AwsS3Serialization
    ): Promise<UserDoc> {
        repository.profilePicture = photo.path;
        return this.userRepository.save(repository);
    }

    async createPhotoFilename(): Promise<Record<string, any>> {
        const filename: string = this.helperStringService.random(20);
        return {
            path: this.uploadPath,
            filename: filename,
        };
    }

    async payloadSerialization(data: IUserDoc): Promise<UserPayloadSerialization> {
        return plainToInstance(UserPayloadSerialization, data.toObject());
    }

    async deleteMany(find: Record<string, any>, options?: IDatabaseManyOptions): Promise<boolean> {
        return this.userRepository.deleteMany(find, options);
    }

    async SignIn<T>(email: string, options?: IDatabaseFindOneOptions): Promise<any> {
        const user = await this.userRepository.findOne<any>({ email }, options);
        if (!user) {
            throw new NotFoundException('User not found of this email');
        }
        return { data: { user } };
    }

    async updateUser(userId: string, userUpdateDto: UserUpdateDto): Promise<any> {
        const user = await this.userRepository.findOne({ _id: userId });
        if (!user) {
            throw new NotFoundException('User not found');
        }

        user.name = userUpdateDto.name;
        user.mobileNumber = userUpdateDto.mobileNumber;
        user.age = userUpdateDto.age;
        user.gender = userUpdateDto.gender;
        user.location = userUpdateDto.location;
        user.profilePicture = userUpdateDto.profilePicture;

        return user.save();
    }

    async updateIsActive<T>(userId: string, isActive: boolean, options?: IDatabaseFindOneOptions): Promise<any> {
        const user = await this.userRepository.findOne<UserDoc>({ _id: userId }, options);
        if (!user) {
            throw new NotFoundException('User not found');
        }
        user.isActive = isActive;
        return user.save();
    }

    async SaveNotificationToken<T>(userId: string, token: string, options?: IDatabaseFindOneOptions): Promise<any> {
        const user = await this.userRepository.findOne<UserDoc>({ _id: userId }, options);
        if (!user) {
            throw new NotFoundException('User not found');
        }
        if (!user.notificationTokens.includes(token)) {
            user.notificationTokens.push(token);
        }
        return user.save();
    }

    async rawPipeline(pipeline: any, options?: IDatabaseFindOneOptions): Promise<any> {
        return this.userRepository.raw(pipeline);
    }
}