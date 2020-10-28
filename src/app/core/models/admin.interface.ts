export interface Admin {
	message : string,
	data: {
		id:number,
		email: string ,
		name: string,
		profilePicture: string,
	},
	meta: {
		access_token:string,
		expires_in:number,
		refresh_token:string
	}
}
