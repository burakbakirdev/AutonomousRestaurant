#!/usr/bin/env bash

# exit on first error after this point to avoid redeploying with successful build
set -e

echo
echo ---------------------------------------------------------
echo "Step 0: Check for environment variable with contract name"
echo ---------------------------------------------------------
echo

[ -z "$CONTRACT" ] && echo "Missing \$CONTRACT environment variable" && exit 1
[ -z "$CONTRACT" ] || echo "Found it! \$CONTRACT is set to [ $CONTRACT ]"

echo
echo
echo ---------------------------------------------------------
echo "Step 1: Initializing the contract"
echo ---------------------------------------------------------
echo

near call $CONTRACT initialize --accountId $CONTRACT

echo
echo
echo ---------------------------------------------------------
echo "Step 2: Choosing table."
echo ---------------------------------------------------------
echo

near call $CONTRACT chooseTables '{"tableId": 2}' --accountId $CONTRACT

echo
echo
echo ---------------------------------------------------------
echo "Step 3: Giving Order."
echo ---------------------------------------------------------
echo

near call $CONTRACT giveOrder '{"tableId": 2, "consumableId": 3}' --accountId $CONTRACT
near call $CONTRACT giveOrder '{"tableId": 2, "consumableId": 12}' --accountId $CONTRACT

echo
echo
echo ---------------------------------------------------------
echo "Step 4: Requesting check."
echo ---------------------------------------------------------
echo

near call $CONTRACT getCheck '{"tableId": 2}' --accountId $CONTRACT
echo
echo
echo ---------------------------------------------------------
echo "Step 5: Paying check."
echo ---------------------------------------------------------
echo

near call $CONTRACT payCheck '{"tableId": 2}' --accountId $CONTRACT --deposit 1.61

echo
echo
exit 0