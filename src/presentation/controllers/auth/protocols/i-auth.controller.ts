import {UserDTO} from '../../../../infra/protocols/dtos/user.dto'
import {APIGatewayProxyResult} from 'aws-lambda'

export interface IAuthController {
  register(user: UserDTO): Promise<APIGatewayProxyResult>
}