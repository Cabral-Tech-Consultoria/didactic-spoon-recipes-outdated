import {CognitoIdentityProviderClient, SignUpCommand} from '@aws-sdk/client-cognito-identity-provider'

export type Attributes = { Name: string, Value: string }
export type SignUpInfo = {
  ClientId: string
  Username: string
  Password: string
  UserAttributes: Array<Attributes>
}

export const SignUp = async (signUp: SignUpInfo) => {
	const provider = new IdentityProvider()

	return provider.send(new SignUpCommand(signUp))
}

export class IdentityProvider {
	private handler: CognitoIdentityProviderClient

	constructor() {
		this.handler = new CognitoIdentityProviderClient({
			region: process.env.AWS_POLL_REGION,
		})
	}

	public async send(command: SignUpCommand) {
		return this.handler.send(command)
	}
}