import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AccountPermissionsService} from '../services/ACL-Module/account.permissions.service';
import {RoutesName} from '../Global/routes.name';

@Injectable({
	providedIn: 'root'
})
export class PermissionsGuard {

	constructor(private router: Router,
				private AccountPermissionsService: AccountPermissionsService) {

	}

	canActivate(route: ActivatedRouteSnapshot,
				state: RouterStateSnapshot): boolean {

		let user_type = localStorage.getItem('user_type');

		if (user_type == '0'){
			return true;
		}

		this.router.navigate([RoutesName.cms()]);
		return false;
	}


}
