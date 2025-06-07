import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const loggedIn = authService.isLoggedIn();

  if (!loggedIn) {
    router.navigate(['/acceso-denegado']);
  }

  return loggedIn;
};
