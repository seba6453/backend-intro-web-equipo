import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Member } from 'src/schema/member.schema';
import { CreateMemberDto } from './dto/create-member.dto';
import { User } from 'src/team/entities/user.entity';
import { fetchUserOtherBackend } from 'src/fetchMicroService/getUser';

@Injectable()
export class MemberService {
  constructor(
    @InjectModel(Member.name) private readonly memberModel: Model<Member>,
  ) {}

  async createMember(createMemberDto: CreateMemberDto) {
    return await this.memberModel.create(createMemberDto);
  }

  async getMembersByUserName(userName: string) {
    return await this.memberModel.find({ userName }).exec();
  }

  async deleteByTeam(id_team) {
    return await this.memberModel.deleteMany({ id_team: id_team });
  }

  async getMemberByTeam(id_team: string) {
    return this.memberModel.find({ id_team: id_team }).exec();
  }

  async addMemberTeam(id_team: string, email: string, token: string) {
    const user: User = await fetchUserOtherBackend(token, email);
    return await this.memberModel.create({
      id_team: id_team,
      email: user.email,
      userName: user.userName,
    });
  }

  async removeMember(id_team: string, email: string) {
    return this.memberModel.deleteMany({ id_team: id_team, email: email });
  }
}
