// Angular
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Components
import { BaseComponent } from './views/theme/base/base.component';
import { ErrorPageComponent } from './views/theme/content/error-page/error-page.component';
// Auth
import { AuthGuard } from './core/guards/auth.guard';
import { GuestGuard } from './core/guards/guest.guard';
import { FormsComponent } from './views/pages/Templates/forms/forms.component';
import { DataTablesComponent } from './views/pages/Templates/data-tables/data-tables.component';
import { AnalyticsComponent } from './views/pages/Templates/analytics/analytics.component';
import {PermissionsGuard} from './core/guards/permissions.guard';
import {RoutesName} from './core/Global/routes.name';


const routes: Routes = [
	{
		path: '',
		canActivate: [GuestGuard],
		loadChildren: () => import('./views/pages/auth/auth.module')
			.then(m => m.AuthModule)
	},
	// اعادة-تعيين-كلمة-المرور
	{
		path: RoutesName.forgetPassword(),
		canActivate: [GuestGuard],
		loadChildren: () => import('./views/pages/users-module/forget-password/forget-password.module')
			.then(m => m.ForgetPasswordModule)
	},
	{
		path: RoutesName.cms(),
		component: BaseComponent,
		canActivate: [AuthGuard],
		runGuardsAndResolvers: 'always',
		children: [
			{
				path: '',
				loadChildren: () => import('./views/pages/dashboard/dashboard.module').then(m => m.DashboardModule)
			},

			// Section - Module
			// ًمن-نحن
			{
				path: RoutesName.whoIsUs(),
				canActivate: [PermissionsGuard],
				loadChildren: () => import('./views/pages/section-module/who-is-us/who-is-us.module')
					.then(m => m.WhoIsUsModule)
			},

			// الهيئة-الاستشارية
			{
				path: RoutesName.advisoryBody(),
				canActivate: [PermissionsGuard],
				loadChildren: () => import('./views/pages/section-module/advisory-body/advisory-body.module')
					.then(m => m.AdvisoryBodyModule)
			},

			// شروط-النشر
			{
				path: RoutesName.publicationRules(),
				canActivate: [PermissionsGuard],
				loadChildren: () => import('./views/pages/section-module/publication-rule/publication-rule.module')
					.then(m => m.PublicationRuleModule)
			},

			// التصنيف
			{
				path: RoutesName.magazineCategory(),
				canActivate: [PermissionsGuard],
				loadChildren: () => import('./views/pages/section-module/magazine-category/magazine-category.module')
					.then(m => m.MagazineCategoryModule)
			},

			// قالوا-عنا
			{
				path: RoutesName.testimonial(),
				canActivate: [PermissionsGuard],
				loadChildren: () => import('./views/pages/section-module/testimonial/testimonial.module')
					.then(m => m.TestimonialModule)
			},

			// اهداف-المجلة
			{
				path: RoutesName.magazineGoals(),
				canActivate: [PermissionsGuard],
				loadChildren: () => import('./views/pages/section-module/magazine-goals/magazine-goals.module')
					.then(m => m.MagazineGoalsModule)
			},

			// معلومات-عن-المجلة
			{
				path: RoutesName.magazineInformation(),
				canActivate: [PermissionsGuard],
				loadChildren: () => import('./views/pages/section-module/magazine-information/magazine-information.module')
					.then(m => m.MagazineInformationModule)
			},


			// user-module
			// الملف-الشخصي
			{
				path: RoutesName.profile(),
				loadChildren: () => import('./views/pages/users-module/profile/profile.module')
					.then(m => m.ProfileModule)
			},

			// رؤساء التحرير
			{
				path: RoutesName.MAGAZINE_EDITOR_MANAGER(),
				canActivate: [PermissionsGuard],
				loadChildren: () => import('./views/pages/users-module/users/magazine-manager/magazine-manager.module')
					.then(m => m.MagazineManagerModule)
			},

			// // مدير التحرير
			// {
			// 	path: RoutesName.JOURNAL_EDITOR_DIRECTOR(),
			// 	// canActivate: [PermissionsGuard],
			// 	// data: {
			// 	// 	permissions: permissionCatalogueConfig.product_permissions,
			// 	// },
			// 	loadChildren: () => import('./views/pages/users-module/users/magazine-director/magazine-director.module')
			// 		.then(m => m.MagazineDirectorModule)
			// },

			// // المحكمين
			// {
			// 	path: RoutesName.REFEREES(),
			// 	// canActivate: [PermissionsGuard],
			// 	// data: {
			// 	// 	permissions: permissionCatalogueConfig.product_permissions,
			// 	// },
			// 	loadChildren: () => import('./views/pages/users-module/users/magazine-referees/magazine-referees.module')
			// 		.then(m => m.MagazineRefereesModule)
			// },

			// // الباحثين
			// {
			// 	path: RoutesName.RESEARCHER(),
			// 	// canActivate: [PermissionsGuard],
			// 	// data: {
			// 	// 	permissions: permissionCatalogueConfig.product_permissions,
			// 	// },
			// 	loadChildren: () => import('./views/pages/users-module/users/researcher/researcher.module')
			// 		.then(m => m.ResearcherModule)
			// },

			// الاخبار
			{
				path: RoutesName.magazineNews(),
				// canActivate: [PermissionsGuard],
				// data: {
				// 	permissions: permissionCatalogueConfig.product_permissions,
				// },
				loadChildren: () => import('./views/pages/section-module/magazine-news/magazine-news.module')
					.then(m => m.MagazineNewsModule)
			},

			// EVENTS
			{
				path: RoutesName.EVENTS(),
				// canActivate: [PermissionsGuard],
				// data: {
				// 	permissions: permissionCatalogueConfig.product_permissions,
				// },
				loadChildren: () => import('./views/pages/section-module/events/events.module')
					.then(m => m.EventsModule)
			},

			// ACTIVITIES
			{
				path: RoutesName.ACTIVITIES(),
				// canActivate: [PermissionsGuard],
				// data: {
				// 	permissions: permissionCatalogueConfig.product_permissions,
				// },
				loadChildren: () => import('./views/pages/section-module/activities/activities.module')
					.then(m => m.ActivitiesModule)
			},

			// VIDEOS
			{
				path: RoutesName.VIDEOS(),
				// canActivate: [PermissionsGuard],
				// data: {
				// 	permissions: permissionCatalogueConfig.product_permissions,
				// },
				loadChildren: () => import('./views/pages/section-module/videos/videos.module')
					.then(m => m.VideosModule)
			},

			// PHOTOS
			{
				path: RoutesName.PHOTOS(),
				// canActivate: [PermissionsGuard],
				// data: {
				// 	permissions: permissionCatalogueConfig.product_permissions,
				// },
				loadChildren: () => import('./views/pages/section-module/photos/photos.module')
					.then(m => m.PhotosModule)
			},
		]
	},

	{
		path: 'error/:type', component: ErrorPageComponent,
		data: {
			'type': 'error-v1',
			'code': 403,
			'title': '403... Access forbidden',
			'desc': 'Looks like you don\'t have permission to access for requested page.<br> Please, contact administrator'
		}
	},
	{ path: '**', redirectTo: 'error/error-v1', pathMatch: 'full' },
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'}),
	],
	exports: [RouterModule]
})
export class AppRoutingModule {
}
