export interface ProductCart {
    cart: Product[];
}


export interface Product {
    idpro: string,
    name_pro: string,
    image_pro: string,
    price: number,
    sale:number,
    quantity: number,
    color:string,
    size:string

}