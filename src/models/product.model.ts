export class Product{
    id?: number;
    categoryID? : number;
    productName?: string;
    price?: number;

    constructor({id, categoryID, productName, price}){
        if (id !== null) this.id= id;
        if (categoryID !== null) this.categoryID= categoryID;
        if (productName !== null) this.productName= productName;
        if (price !== null) this.price= price;
    }
}