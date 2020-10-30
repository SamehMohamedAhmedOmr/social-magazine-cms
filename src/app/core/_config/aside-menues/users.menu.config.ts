import {Injectable} from '@angular/core';
import {SystemPermissionsHelperService} from '../../services/Helpers/system.permissions.helper.service';
import {RoutesName} from '../../Global/routes.name';


@Injectable({
	providedIn: 'root'
})
export class MagazineSettingMenuConfig {

	systemPermissionsHelperService: SystemPermissionsHelperService;

	constructor() {
		this.systemPermissionsHelperService = new SystemPermissionsHelperService();
	}

	private header = {section: 'MAGAZINE_SETTINGS', translate: 'MENUS.MAGAZINE_SETTINGS.TITLE'};

	private section = {
		title: 'MAGAZINE_SETTINGS',
		root: true,
		translate: 'MENUS.MAGAZINE_SETTINGS.TITLE',
		icon: 'flaticon2-settings',
		submenu: [
		]
	};

	public who_is_us_url = {
		icon: 'flaticon2-settings',
		title: 'Who is us',
		translate: 'MENUS.MAGAZINE_SETTINGS.menu.WHO_IS_US',
		page: RoutesName.whoIsUs()
	};



	public menu: any = {
		items: [
		]
	};


	public checkRoutePermissions(){

		this.attachMenuItem([],this.who_is_us_url);

		this.attachMenu();

	}

	attachMenuItem(permissions, url){
		let check = this.systemPermissionsHelperService.checkPermissions(permissions);
		if (check){
			this.attach(url)
		}
	}

	private attach(url){
		this.section.submenu.push(url)
	}

	private attachMenu(){
		if (this.section.submenu.length){
			this.menu.items.push(this.header);
			this.menu.items.push(this.section);
		}
	}

	public get configs(): any {
		this.checkRoutePermissions();
		return this.menu.items;
	}

}
