export const environment = {
	production: false,
	apisVersion: "v1" ,
	baseUrl: window["env"]["productionUrl"] || 'http://163.172.8.204:8012',
	debug: window["env"]["debug"] || false,

	url : function url (version: string = null) {
		return environment.baseUrl + '/api/' + ((version) ? version+'/' : '');
	}

};
