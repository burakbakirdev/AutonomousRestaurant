import { context, PersistentMap, PersistentUnorderedMap, PersistentVector } from "near-sdk-as";
import { Timestamp } from "../../utils";

export const consumables = new PersistentUnorderedMap<u32, Consumable>("c");
export const tables = new PersistentUnorderedMap<u32, Table>("t");


@nearBindgen
export class Consumable {
     id: u32;
     type: string;
     name: string;
     availability: bool;
     rate: f32;
     price: f64;

     constructor(id: u32, type: string, name: string, availability: bool, rate: f32, price: f32){
        this.id = id;
        this.type = type;
        this.name = name;
        this.availability = availability;
        this.rate = rate;
        this.price = price;

     }
}     
@nearBindgen
export class Table{
    id: u32;
    person: string;
    orderList: PersistentVector<Consumable>;
    check: f64;
    
    constructor(id: u32, person: string ){
        this.orderList = new PersistentVector<Consumable>("v");
        this.id = id;
        this.person = person;
        //this.orderList = orderList;

    }
    
}

