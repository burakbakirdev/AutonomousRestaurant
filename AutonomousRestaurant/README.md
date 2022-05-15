# AutonomousRestaurant
  Autonomous restaurants will become widespread in the future. There will be robot waiters inside, so we can quickly place our order and pay, and wait for the robots to bring our orders.This project aims to create a mobile application. With this application, you can quickly give your order, get the check and make your payment quickly.

## Loom Video



## How To Use

First of all, get source code here, you can clone it or download it, then follow the instructions mentioned below.

1)This command downloads all packages that the project will use:

```ts
yarn;
```

2)This command introduces the contract to the compiler and creates our wasm file:

```ts

yarn build:release
```

3)Deploy the project:

```ts

near dev-deploy ./build/release/simple.wasm
```

4)An account ID is created with the deployment of the project. This ID appears as "dev-...........".Copy and paste this ID into <Account ID>. With this step, you will not need to enter account id every time.(Please write without "<,>"these characters.)

```ts

export CONTRACT=<AccountId>
```

After all these steps, you can now switch to using the functions.

## Functions

1-Initialize
  <br/>
  First of all we need to initialize the contract.


```ts

near call $CONTRACT initialize --accountId $CONTRACT
```

2-Choose Tables
  <br/>
  Users choose tables with this function.

```ts

near call $CONTRACT chooseTables '{"tableId": 2}' --accountId $CONTRACT
```

3-Give Order
  <br/>
  This function can be called as many times as desired and serves to give an order.


```ts

near call $CONTRACT giveOrder '{"tableId": 2, "consumableId": 3}' --accountId $CONTRACT
```

4-Get Check
  <br/>
  This functions get the check, after you give order as much as you want.


```ts

near call $CONTRACT getCheck '{"tableId": 2}' --accountId $CONTRACT
```

5-Pay Check
  <br/>
  This function pay the check using your wallet after you input deposit. Be careful about input amount.


```ts

near call $CONTRACT payCheck '{"tableId": 2}' --accountId $CONTRACT --deposit 1.61
```

