export class UserDTO {
	constructor(
    public name: string,
    public username: string,
    public email: EmailType,
    public password: string,
    public passwordConfirmation: string,
    public phoneNumber: PhoneNumberType,
	) {
	}
}

type EmailType = `${string}@${string}`
type CountryCode = number
type PhoneNumber = `${number}${number}${number}${number}${number}${number}${number}${number}`
type CellPhoneNumber = `${number}${number}${number}${number}${number}${number}${number}${number}${number}`

type PhoneNumberType = `+${CountryCode}${PhoneNumber | CellPhoneNumber}`