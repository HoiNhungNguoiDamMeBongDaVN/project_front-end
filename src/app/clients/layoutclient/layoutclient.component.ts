import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { search } from 'src/app/models/searchProduct.model';

@Component({
  selector: 'app-layoutclient',
  
  templateUrl: './layoutclient.component.html',
  styleUrls: ['./layoutclient.component.scss'],
  
})
export class LayoutclientComponent implements OnInit { 
  parentMessage: string="";

  constructor(private router:Router) { }


  search:search=new search();

  ngOnInit(): void {
    //this.receiveMessage();
  }

  receiveMessage(){
    this.parentMessage=this.search.searchNameProduct;
  }

}
