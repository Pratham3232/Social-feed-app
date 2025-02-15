import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../social feed/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class AdminService{
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ){}

    async deleteUserFeature(body): Promise<any>{
        const userId = body.userId;
        const deleteId = body.deleteId;

        const priorityPosition = {
            "user": 1,
            "admin": 2,
            "owner": 3
        }

        const user = await this.usersRepository.findOne({ where: { id: userId } });

        if(!user){
            return {
                status: "error",
                message: "Invalid user id"
            }
        }

        const deleteUser = await this.usersRepository.findOne({ where: { id: deleteId } });

        if(!deleteUser){
            return {
                status: "error",
                message: "Invalid admin/owner id"
            }
        }

        if(priorityPosition[user.role] - priorityPosition[deleteUser.role] <= 0){
            return {
                status: "error",
                message: "You cannot delete this user"
            }
        }

        await this.usersRepository.delete(deleteId);

        return{
            status: "success",
            message: "User deleted successfully"
        }
    }
}