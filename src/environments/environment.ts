export const environment = {
	production: false,
	apisVersion: "v1" ,
	baseUrl: window["env"]["stageUrl"] || 'https://backend.j-fss.com',
	debug: window["env"]["debug"] || false,

	url : function url (version: string = null) {
		return environment.baseUrl + '/api/' + ((version) ? version+'/' : '');
	}

};
