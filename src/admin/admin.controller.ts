import { Body, Controller, Post } from "@nestjs/common";
import { AdminService } from "./admin.service";

@Controller('/')
export class AdminController {
    constructor(
        private readonly adminService: AdminService
    ){}

    @Post('deleteUser')
    DeleteUser(@Body() req){
        return this.adminService.deleteUserFeature(req);
    }
}