import {Injectable} from '@angular/core';
import {SystemPermissionsHelperService} from '../../services/Helpers/system.permissions.helper.service';
import {RoutesName} from '../../Global/routes.name';
import {SectionIconsName} from '../../Global/section.icons.name';


@Injectable({
	providedIn: 'root'
})
export class UsersMenuConfig {

	systemPermissionsHelperService: SystemPermissionsHelperService;

	constructor() {
		this.systemPermissionsHelperService = new SystemPermissionsHelperService();
	}

	private header = {section: 'USERS', translate: 'MENUS.USERS.TITLE'};

	private section = {
		title: 'USERS',
		root: true,
		translate: 'MENUS.USERS.TITLE',
		icon: SectionIconsName.users(),
		submenu: [
		]
	};

	public MAGAZINE_EDITOR_MANAGER = {
		icon: SectionIconsName.MAGAZINE_EDITOR_MANAGER(),
		title: 'MAGAZINE_EDITOR_MANAGER',
		translate: 'MENUS.USERS.menu.MAGAZINE_EDITOR_MANAGER',
		page: RoutesName.users() + '/' + RoutesName.MAGAZINE_EDITOR_MANAGER()
	};

	public JOURNAL_EDITOR_DIRECTOR = {
		icon: SectionIconsName.JOURNAL_EDITOR_DIRECTOR(),
		title: 'JOURNAL_EDITOR_DIRECTOR',
		translate: 'MENUS.USERS.menu.JOURNAL_EDITOR_DIRECTOR',
		page: RoutesName.users() + '/' + RoutesName.JOURNAL_EDITOR_DIRECTOR()
	};

	public REFEREES = {
		icon: SectionIconsName.REFEREES(),
		title: 'REFEREES',
		translate: 'MENUS.USERS.menu.REFEREES',
		page: RoutesName.users() + '/' + RoutesName.REFEREES()
	};

	public RESEARCHER = {
		icon: SectionIconsName.RESEARCHER(),
		title: 'RESEARCHER',
		translate: 'MENUS.USERS.menu.RESEARCHER',
		page: RoutesName.users() + '/' + RoutesName.RESEARCHER()
	};


	public menu: any = {
		items: [
		]
	};


	public checkRoutePermissions(){

		this.attachMenuItem([],this.MAGAZINE_EDITOR_MANAGER);
		this.attachMenuItem([],this.JOURNAL_EDITOR_DIRECTOR);
		this.attachMenuItem([],this.REFEREES);
		this.attachMenuItem([],this.RESEARCHER);

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
