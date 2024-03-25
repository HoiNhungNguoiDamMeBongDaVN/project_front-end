import { Component, Injectable } from '@angular/core';
import { Router } from '@angular/router';
@Injectable({
    providedIn: 'root'
})
export class FunctionAlert {

    constructor(private router: Router) { }

    showAlertAndNavigate(notification: string, router: string) {
        if (router === '') {
            alert(notification);
        }
        else if (notification === '') {
            this.router.navigate([router]);
        }
        else {
            alert(notification);
            this.router.navigate([router]);
        }
    }


    showConfirmAndNavigate(notification: string, router: string) {

        confirm(notification);
        this.router.navigate([router]);

        // if (router === '') {
        //     confirm(notification);
        // }
        // else if (notification === '') {
        //     this.router.navigate([router]);
        // }
        // else {
        //     confirm(notification);
        //     this.router.navigate([router]);
        // }
    }
}