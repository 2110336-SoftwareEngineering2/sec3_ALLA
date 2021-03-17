import { ApiProperty } from '@nestjs/swagger';

export class LoginDTO {
    @ApiProperty({type: String, description: 'username'})
    username : string;

    @ApiProperty({type: String, description: 'password'})
    password : string;
}