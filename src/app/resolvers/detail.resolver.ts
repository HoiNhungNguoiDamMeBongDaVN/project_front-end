import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from "@angular/router";
import { Observable, tap } from "rxjs";
import { product } from "../models/product.model";
import { ApiProductsService } from "../services/api_products/api-product.service";

@Injectable({ providedIn: 'root' })

export class DetailResolver implements Resolve<any>{

    constructor(private readonly router: Router, private readonly apiProductsService: ApiProductsService) { }

    resolve(route: ActivatedRouteSnapshot): Observable<any> {
        const idpro = route.params["idpro"];
        console.log(idpro,"ra ci j");
        
        if (!idpro) {
            this.redirectToNoDetail();
        }
        return this.apiProductsService.getProductDetail(idpro).pipe(
            tap(data => {
                if (!data) {
                    this.redirectToNoDetail();
                }
            })
        )
    }


    private redirectToNoDetail() {
        this.router.navigate(['/product_women']);
    }
}