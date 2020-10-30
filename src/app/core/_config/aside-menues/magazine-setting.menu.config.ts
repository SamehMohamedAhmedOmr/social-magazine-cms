import {Injectable} from '@angular/core';
import {SystemPermissionsHelperService} from '../../services/Helpers/system.permissions.helper.service';
import {RoutesName} from '../../Global/routes.name';
import {SectionIconsName} from '../../Global/section.icons.name';


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

	public WHO_IS_US = {
		icon: SectionIconsName.whoIsUs(),
		title: 'MENUS.MAGAZINE_SETTINGS.menu.WHO_IS_US',
		translate: 'MENUS.MAGAZINE_SETTINGS.menu.WHO_IS_US',
		page: RoutesName.whoIsUs()
	};

	public PUBLICATION_RULE = {
		icon: SectionIconsName.publicationRules(),
		title: 'MENUS.MAGAZINE_SETTINGS.menu.PUBLICATION_RULE',
		translate: 'MENUS.MAGAZINE_SETTINGS.menu.PUBLICATION_RULE',
		page: RoutesName.publicationRules()
	};

	public ADVISORY_BODY = {
		icon: SectionIconsName.advisoryBody(),
		title: 'MENUS.MAGAZINE_SETTINGS.menu.ADVISORY_BODY',
		translate: 'MENUS.MAGAZINE_SETTINGS.menu.ADVISORY_BODY',
		page: RoutesName.advisoryBody()
	};

	public MAGAZINE_CATEGORY = {
		icon: SectionIconsName.magazineCategory(),
		title: 'MENUS.MAGAZINE_SETTINGS.menu.MAGAZINE_CATEGORY',
		translate: 'MENUS.MAGAZINE_SETTINGS.menu.MAGAZINE_CATEGORY',
		page: RoutesName.magazineCategory()
	};

	public MAGAZINE_NEWS = {
		icon: SectionIconsName.magazineNews(),
		title: 'MENUS.MAGAZINE_SETTINGS.menu.MAGAZINE_NEWS',
		translate: 'MENUS.MAGAZINE_SETTINGS.menu.MAGAZINE_NEWS',
		page: RoutesName.magazineNews()
	};

	public TESTIMONIAL = {
		icon: SectionIconsName.testimonial(),
		title: 'MENUS.MAGAZINE_SETTINGS.menu.TESTIMONIAL',
		translate: 'MENUS.MAGAZINE_SETTINGS.menu.TESTIMONIAL',
		page: RoutesName.testimonial()
	};

	public MAGAZINE_GOAL = {
		icon: SectionIconsName.magazineGoals(),
		title: 'MENUS.MAGAZINE_SETTINGS.menu.MAGAZINE_GOAL',
		translate: 'MENUS.MAGAZINE_SETTINGS.menu.MAGAZINE_GOAL',
		page: RoutesName.magazineGoals()
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

		this.attachMenuItem([],this.MAGAZINE_NEWS);

		this.attachMenuItem([],this.MAGAZINE_INFORMATION);

		this.attachMenuItem([],this.WHO_IS_US);

		this.attachMenuItem([],this.MAGAZINE_GOAL);

		this.attachMenuItem([],this.PUBLICATION_RULE);

		this.attachMenuItem([],this.ADVISORY_BODY);

		this.attachMenuItem([],this.MAGAZINE_CATEGORY);

		this.attachMenuItem([],this.TESTIMONIAL);

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
