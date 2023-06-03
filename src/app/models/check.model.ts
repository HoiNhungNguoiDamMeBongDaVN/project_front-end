
import {pay} from './method_pay.model';
import { customer } from './customer.model';
import {product} from './product.model';
export class checkOut{
    date:Date=new Date();
    public id:number=0;
    public totalAmount:number=0;
    public totalPriceProduct:number=0;
    public totalPriceProductSale:number=0; 
    public carts:product[]=[];
    public pay:pay =new pay();
    public customer:customer=new customer(); 
    public show:boolean=false;  
    public time:string=this.date.getHours()+':'+this.date.getMinutes()+'  '+this.date.getDate()+'-'+(this.date.getMonth()+1)+'-'+this.date.getFullYear();
}