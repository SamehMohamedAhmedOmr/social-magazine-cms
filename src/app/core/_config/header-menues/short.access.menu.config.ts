import {Injectable} from '@angular/core';
import {SystemPermissionsHelperService} from '../../services/Helpers/system.permissions.helper.service';
import {SectionIconsName} from '../../Global/section.icons.name';
import {RoutesName} from '../../Global/routes.name';


@Injectable({
	providedIn: 'root'
})
export class ShortAccessMenuConfig {

	systemPermissionsHelperService: SystemPermissionsHelperService;



	constructor() {
		this.systemPermissionsHelperService = new SystemPermissionsHelperService();
	}

	private section = {
		title: 'Short Access',
		root: true,
		translate: 'MENU.SHORT_ACCESS',
		icon: 'flaticon2-reply-1',
		submenu: [
		]
	};

	public MAGAZINE_EDITOR_MANAGER = {
		icon: SectionIconsName.MAGAZINE_EDITOR_MANAGER(),
		title: 'MAGAZINE_EDITOR_MANAGER',
		translate: 'MENUS.USERS.menu.MAGAZINE_EDITOR_MANAGER',
		page: RoutesName.MAGAZINE_EDITOR_MANAGER()
	};

	public MAGAZINE_NEWS = {
		icon: SectionIconsName.magazineNews(),
		title: 'MENUS.WEBSITE_CONTENT.menu.MAGAZINE_NEWS',
		translate: 'MENUS.WEBSITE_CONTENT.menu.MAGAZINE_NEWS',
		page: RoutesName.magazineNews()
	};

	public MAGAZINE_INFORMATION = {
		icon: SectionIconsName.magazineInformation(),
		title: 'MENUS.MAGAZINE_SETTINGS.menu.MAGAZINE_INFORMATION',
		translate: 'MENUS.MAGAZINE_SETTINGS.menu.MAGAZINE_INFORMATION',
		page: RoutesName.magazineInformation()
	};

	public menu: any = {
		items: [
		]
	};

	public checkRoutePermissions(){
		let user_type = localStorage.getItem('user_type');

		if (user_type == '0') {
			this.attachMenuItem([], this.MAGAZINE_EDITOR_MANAGER);
		}

		this.attachMenuItem([], this.MAGAZINE_NEWS);

		if (user_type == '0') {
			this.attachMenuItem([], this.MAGAZINE_INFORMATION);
		}

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
			this.menu.items.push(this.section);
		}
	}

	public get configs(): any {
		this.checkRoutePermissions();
		return this.menu.items;
	}

}
