import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    const requiredRole = next.data['requiredRole'];
    const currentUserRole = this.authService.getRole();

    if (currentUserRole && this.isRoleSufficient(currentUserRole, requiredRole)) {
      return true;
    } else {
      this.router.navigate(['/not-authorized']);
      return false;
    }
  }

  private isRoleSufficient(userRole: string, requiredRole: string): boolean {
    const roleHierarchy = { 'viewer': 1, 'editor': 2, 'admin': 3 };
    return roleHierarchy[userRole as keyof typeof roleHierarchy] >= roleHierarchy[requiredRole as keyof typeof roleHierarchy];
  }
}