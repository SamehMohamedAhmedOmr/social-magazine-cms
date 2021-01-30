import {ShortAccessMenuConfig} from './header-menues/short.access.menu.config';
import {AddNewMenuConfig} from './header-menues/add.new.menu.config';
import {RoutesName} from '../Global/routes.name';
import {UsersMenuConfig} from './aside-menues/users.menu.config';
import {MagazineSettingMenuConfig} from './aside-menues/magazine-setting.menu.config';
import {WebsiteContentConfig} from './aside-menues/website.content.config';



export class MenuConfig {

	// Aside Menu
	magazineSettingMenuConfig: MagazineSettingMenuConfig;
	usersMenuConfig: UsersMenuConfig;
	websiteContentConfig: WebsiteContentConfig;

	// Header Menu
	shortAccessMenuConfig: ShortAccessMenuConfig;
	addNewMenuConfig:AddNewMenuConfig;

	constructor() {
		this.magazineSettingMenuConfig = new MagazineSettingMenuConfig();
		this.usersMenuConfig = new UsersMenuConfig();
		this.websiteContentConfig = new WebsiteContentConfig();

		this.shortAccessMenuConfig = new ShortAccessMenuConfig();
		this.addNewMenuConfig = new AddNewMenuConfig();
	}

	public defaults: any = {
		header: {
			self: {},
			items: [
				{
					title: 'Dashboards',
					root: true,
					alignment: 'left',
					icon: 'flaticon2-architecture-and-city',
					page: RoutesName.default(),
					translate: 'MENU.DASHBOARD',
				},

			]
		},
		aside: {
			self: {},
			items: [
				{
					title: 'Dashboard',
					root: true,
					icon: 'flaticon2-architecture-and-city',
					page: RoutesName.default(),
					translate: 'MENU.DASHBOARD',
					bullet: 'dot',
				},
			]
		},
	};

	public get configs(): any {
		this.attachHeaderMenuItems();
		this.attachAsideMenuItems();
		return this.defaults;
	}

	public attachAsideMenuItems()
	{
		let user_type = localStorage.getItem('user_type');

		if (user_type == '0'){
			// users Config
			let usersMenuConfig = this.usersMenuConfig.configs;
			this.attachAsideMenu(usersMenuConfig);
		}

		// Website Content Config
		let websiteContentConfig = this.websiteContentConfig.configs;
		this.attachAsideMenu(websiteContentConfig);


		if (user_type == '0'){
			// Magazine Setting Config
			let magazine_setting_config = this.magazineSettingMenuConfig.configs;
			this.attachAsideMenu(magazine_setting_config);
		}

	}

	public attachHeaderMenuItems() {

		// Short Access Config
		let short_access_items = this.shortAccessMenuConfig.configs;
		this.attachHeaderMenu(short_access_items);

		// Short Access Config
		let add_menu_items = this.addNewMenuConfig.configs;
		this.attachHeaderMenu(add_menu_items);

	}

	public attachAsideMenu(items){
		items.forEach((item)=>{
			this.defaults.aside.items.push(
				item
			);
		});
	}

	public attachHeaderMenu(items){
		items.forEach((item)=>{
			this.defaults.header.items.push(
				item
			);
		});
	}


}
