import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt'; 
import { User, UserDocument } from 'src/users/schema/users.schema';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (user && user.password === password) {
      const { password, ...result } = user.toObject();
      return result;  
    }
    return null;
  }

  async login(user: UserDocument) {
    const payload = { email: user.email, sub: user._id };
    
    return {
      access_token: this.jwtService.sign(payload),
      last_connection: new Date(),
    };
  }
  
}

