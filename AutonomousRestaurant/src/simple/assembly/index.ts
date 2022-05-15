import { storage, context, u128, ContractPromiseBatch, PersistentVector } from "near-sdk-core"
import { Consumable, consumables, Table, tables } from "./models"


export function initialize(): void {
  let consumable1 = new Consumable(1, "food", "taco", true, 4.5, 2)
  consumables.set(consumable1.id, consumable1);
  let consumable2 = new Consumable(2, "food", "crisps", true, 5, 0.5)
  consumables.set(consumable2.id, consumable2);
  let consumable3 = new Consumable(3, "food", "hamburger", true, 4.5, 1.5)
  consumables.set(consumable3.id, consumable3);
  let consumable11 = new Consumable(11, "drink", "water", true, 4.5, 0.05)
  consumables.set(consumable11.id, consumable11);
  let consumable12 = new Consumable(12, "drink", "coke", true, 4.5, 0.1)
  consumables.set(consumable12.id, consumable12)

  let table1 = new Table(1, "")
  tables.set(table1.id, table1)
  let table2 = new Table(2, "")
  tables.set(table2.id, table2)
  let table3 = new Table(3, "")
  tables.set(table3.id, table3)

}


export function chooseTables(tableId: u32): Table{
  let table = tables.getSome(tableId)
  assert_available(table.person)
  table.person = context.sender
  tables.set(tableId, table)
  return table;

}

function assert_available(person: string): void {
  assert(person == "", "This table has taken.")
}

export function giveOrder(tableId: u32, consumableId: u32): PersistentVector<Consumable>{
  let table = tables.getSome(tableId)
  let consumable = consumables.getSome(consumableId)
  table.orderList.push(consumable)
  tables.set(tableId, table)

  return table.orderList;
}

export function getCheck(tableId: u32): string  {
  let table = tables.getSome(tableId);
  let sum: number = 0;
  for (let index = 0; index < table.orderList.length; index++) {
    sum += table.orderList[index].price 
    
  }
  table.check = sum;
  tables.set(tableId, table)

  return ` The amount you pay ${sum}`

}

export function payCheck (tableId: u32): string {
  let table = tables.getSome(tableId);
  assert_deposit(table.check)
  
  let sender = context.sender
  ContractPromiseBatch.create(sender).transfer(u128.from(table.check))
  
  return ` You have paid your check successfully. Amount ${table.check}`

}

function assert_deposit(price: f64): void {
  assert(context.attachedDeposit >= u128.from(price), "Please send enough NEAR.")
}