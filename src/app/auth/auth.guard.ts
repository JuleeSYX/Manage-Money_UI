import { inject } from '@angular/core';
import { CanActivateFn, Router} from '@angular/router';
// import { CookieService } from 'ngx-cookie-service';
export const AuthGuard: CanActivateFn = (route, state) =>{
  // const cookieService = inject(CookieService);
  const token = localStorage.getItem("auth-token")
  const router = inject(Router);
  if(token != '' && token != null){
    return true;
  }
  router.navigateByUrl('/login')
  return false;
}
