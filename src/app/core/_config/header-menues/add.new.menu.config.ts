import {Injectable} from '@angular/core';
import {SystemPermissionsHelperService} from '../../services/Helpers/system.permissions.helper.service';
import {SectionIconsName} from '../../Global/section.icons.name';
import {RoutesName} from '../../Global/routes.name';


@Injectable({
	providedIn: 'root'
})
export class AddNewMenuConfig {

	systemPermissionsHelperService: SystemPermissionsHelperService;


	constructor() {
		this.systemPermissionsHelperService = new SystemPermissionsHelperService();
	}

	private section = {
		title: 'Add New', // <= Title of the page
		root: true,
		translate: 'MENU.ADD_NEW',
		icon: 'flaticon-plus',
		submenu: [
		]
	};

	public MAGAZINE_EDITOR_MANAGER = {
		icon: SectionIconsName.MAGAZINE_EDITOR_MANAGER(),
		title: 'MAGAZINE_EDITOR_MANAGER',
		translate: 'MENUS.USERS.menu.MAGAZINE_EDITOR_MANAGER',
		page: RoutesName.MAGAZINE_EDITOR_MANAGER() + '/' + RoutesName.add()
	};

	public MAGAZINE_NEWS = {
		icon: SectionIconsName.magazineNews(),
		title: 'MENUS.WEBSITE_CONTENT.menu.MAGAZINE_NEWS',
		translate: 'MENUS.WEBSITE_CONTENT.menu.MAGAZINE_NEWS',
		page: RoutesName.magazineNews() + '/' + RoutesName.add()
	};

	public menu: any = {
		items: [
		]
	};

	public checkRoutePermissions(){

		this.attachMenuItem([], this.MAGAZINE_EDITOR_MANAGER);
		this.attachMenuItem([], this.MAGAZINE_NEWS);

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
