import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Member } from 'src/schema/member.schema';
import { CreateMemberDto } from './dto/create-member.dto';

@Injectable()
export class MemberService {

    constructor(
        @InjectModel(Member.name) private readonly teamModel: Model<Member>
    ){}

    async createMember(createMemberDto: CreateMemberDto) {
        return await this.teamModel.create(createMemberDto);
    }

    async getMembersByUserName(userName: string){
        return await this.teamModel.find({userName}).exec();
    }

    async deleteByTeam(id_team){
        return await this.teamModel.deleteMany({id_team:id_team});
    }
}
