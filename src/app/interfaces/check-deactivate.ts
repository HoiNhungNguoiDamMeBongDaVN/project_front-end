import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";

// export interface CheckDeactivate {
//     checkDeactivate(currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState: RouterStateSnapshot): Observable<boolean>
// }

export interface CheckDeactivate {
    checkDeactivate(): Observable<boolean>;
}