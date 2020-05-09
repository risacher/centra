module.exports = class CentraResponse {
	constructor (res, resOptions) {
		this.coreRes = res
		this.resOptions = resOptions

		this.body = Buffer.alloc(0)

		this.headers = res.headers
		this.statusCode = res.statusCode
	}

	_addChunk (chunk) {
		this.body = Buffer.concat([this.body, chunk])
	}

	async json () {
	    try { return JSON.parse(this.body) }
            catch (ex) { console.error("JSON parsing error: ", this.body.toString()); return { success: false, cause: 'JSON parse failure', data: this.body.toString} ; }
	}

	async text () {
		return this.body.toString()
	}
}
