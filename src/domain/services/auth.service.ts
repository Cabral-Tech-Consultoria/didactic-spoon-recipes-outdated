import {UserDTO} from '../../infra/protocols/dtos/user.dto'
import {IAuthService} from './protocols/i-auth.service'
import {injectable} from 'inversify'
import {
	CognitoIdentityProviderClient,
	SignUpCommand,
	SignUpCommandOutput
} from '@aws-sdk/client-cognito-identity-provider'
import logger from '../../infra/logger/log'

@injectable()
export class AuthService implements IAuthService {
	private identityProvider: CognitoIdentityProviderClient

	constructor() {
		this.identityProvider = new CognitoIdentityProviderClient({
			region: 'us-east-1',
		})
	}

	async register(user: UserDTO): Promise<SignUpCommandOutput> {
		logger.info({message: 'Param received', payload: user})

		logger.info({message: 'Add the required attributes'})
		const attributes = []
		attributes.push({Name: 'name', Value: user.name})
		attributes.push({Name: 'nickname', Value: user.username})
		attributes.push({Name: 'email', Value: user.email})
		attributes.push({Name: 'phone_number', Value: user.phoneNumber})

		logger.info({message: 'Call the command to register the user'})
		const commandInput = {
			ClientId: process.env.AWS_CLIENT_ID,
			Username: user.username,
			Password: user.password,
			UserAttributes: attributes,
		}
		logger.info({message: 'Command input mounted', payload: commandInput})
		const command = new SignUpCommand(commandInput)

		logger.info({message: 'Send the command'})
		return this.identityProvider.send(command)
	}
}