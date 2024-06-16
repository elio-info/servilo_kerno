import { Body, Controller, Get, Headers, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { Anonymous } from '../authz/decorators/anonymous.decorator';
import {
  ApiBearerAuth,
  ApiBody,
  ApiHeader,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ApiNotFoundCustomErrorResponse } from '../common/doc/api-not-found-custom-error-response.decorator';
import { ApiUnauthorizedCustomErrorResponse } from '../common/doc/api-unauthorized-custom-error-response.decorator';
import { ErrorHandler } from '../common/errors/handler/error-handler.decorator';
import { CurrentUser } from '../authz/decorators/current-user.decorator';
import { ChangePassDto } from './dto/changePass.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiBody({
    description: 'Authentication object with username and password',
    type: LoginDto,
  })
  @ApiOkResponse({
    schema: { properties: { access_token: { type: 'string' } } },
  })
  @ApiUnauthorizedCustomErrorResponse(
    'This will be returned when the password does not match',
  )
  @ApiNotFoundCustomErrorResponse('User')
  @Post('login')
  @Anonymous()
  @ErrorHandler()
  login(@Body() login: LoginDto) {
    return this.authService.signIn(login.username, login.password);
  }

  @ApiUnauthorizedCustomErrorResponse('Invalid or expired Token')
  @ApiNotFoundCustomErrorResponse('User')
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer theJsonWebToken',
    required: false,
  })
  @ApiBearerAuth()
  @Get('user')
  @ErrorHandler()
  getUserData(@Headers('Authorization') auth: string) {
    return this.authService.getUserInfo(auth);
  }

  @ApiUnauthorizedCustomErrorResponse('Invalid or expired Token')
  @ApiBody({
    description: 'The old and new Password',
    type: ChangePassDto,
  })
  @ApiNotFoundCustomErrorResponse('User')
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer theJsonWebToken',
    required: false,
  })
  @ApiBearerAuth()
  @Post('change-pass')
  @ErrorHandler()
  changePassword(@CurrentUser() user, @Body() data: ChangePassDto) {
    return this.authService.changePassword(
      user,
      data.oldPassword,
      data.newPassword,
    );
  }
}
