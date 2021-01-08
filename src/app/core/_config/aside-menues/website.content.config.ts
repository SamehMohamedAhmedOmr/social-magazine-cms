import {Injectable} from '@angular/core';
import {SystemPermissionsHelperService} from '../../services/Helpers/system.permissions.helper.service';
import {RoutesName} from '../../Global/routes.name';
import {SectionIconsName} from '../../Global/section.icons.name';


@Injectable({
	providedIn: 'root'
})
export class WebsiteContentConfig {

	systemPermissionsHelperService: SystemPermissionsHelperService;

	constructor() {
		this.systemPermissionsHelperService = new SystemPermissionsHelperService();
	}

	private header = {section: 'MAGAZINE_SETTINGS', translate: 'MENUS.MAGAZINE_SETTINGS.TITLE'};

	private section = {
		title: 'MAGAZINE_SETTINGS',
		root: true,
		translate: 'MENUS.WEBSITE_CONTENT.TITLE',
		icon: 'flaticon-settings-1',
		submenu: [
		]
	};

	public MAGAZINE_NEWS = {
		icon: SectionIconsName.magazineNews(),
		title: 'MENUS.WEBSITE_CONTENT.menu.MAGAZINE_NEWS',
		translate: 'MENUS.WEBSITE_CONTENT.menu.MAGAZINE_NEWS',
		page: RoutesName.magazineNews()
	};

	public EVENTS = {
		icon: SectionIconsName.EVENTS(),
		title: 'MENUS.WEBSITE_CONTENT.menu.EVENTS',
		translate: 'MENUS.WEBSITE_CONTENT.menu.EVENTS',
		page: RoutesName.EVENTS()
	};

	public ACTIVITIES = {
		icon: SectionIconsName.ACTIVITIES(),
		title: 'MENUS.WEBSITE_CONTENT.menu.ACTIVITIES',
		translate: 'MENUS.WEBSITE_CONTENT.menu.ACTIVITIES',
		page: RoutesName.ACTIVITIES()
	};

	public VIDEOS = {
		icon: SectionIconsName.VIDEOS(),
		title: 'MENUS.WEBSITE_CONTENT.menu.VIDEOS',
		translate: 'MENUS.WEBSITE_CONTENT.menu.VIDEOS',
		page: RoutesName.VIDEOS()
	};

	public PHOTOS = {
		icon: SectionIconsName.PHOTOS(),
		title: 'MENUS.WEBSITE_CONTENT.menu.PHOTOS',
		translate: 'MENUS.WEBSITE_CONTENT.menu.PHOTOS',
		page: RoutesName.PHOTOS()
	};


	public menu: any = {
		items: [
		]
	};


	public checkRoutePermissions(){

		this.attachMenuItem([],this.MAGAZINE_NEWS);
		this.attachMenuItem([],this.EVENTS);
		this.attachMenuItem([],this.ACTIVITIES);
		this.attachMenuItem([],this.VIDEOS);
		this.attachMenuItem([],this.PHOTOS);

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
