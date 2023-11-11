import {UserDTO} from '../../../infra/protocols/dtos/user.dto'
import {SignUpCommandOutput} from '@aws-sdk/client-cognito-identity-provider'

export interface IAuthService {
  register(user: UserDTO): Promise<SignUpCommandOutput>
}