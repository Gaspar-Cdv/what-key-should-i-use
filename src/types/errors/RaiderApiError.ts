export class RaiderApiError extends Error {
	httpCode: number

	constructor (message: string, httpCode: number) {
		super(message)
		this.name = 'RaiderApiError'
		this.httpCode = httpCode
		Object.setPrototypeOf(this, RaiderApiError.prototype)
	}
}
