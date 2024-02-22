import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  let auth = inject(AuthService);
  let router = inject(Router);

  if (auth.isLoggedIn()) {
    return true;
  }

  // Redirect to the login page
  return router.parseUrl('/login');
};
