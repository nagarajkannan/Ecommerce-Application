import React, { useContext } from "react";
import { Shopcontext } from "../context/Shopcontext";

const CartTotal = () => {
  const { currency, delivery_fee, getTotalCartAmount } = useContext(Shopcontext);

  const subtotal = getTotalCartAmount();
  const tax = subtotal * 0.05; // 5% tax
  const total = subtotal === 0 ? 0 : subtotal + delivery_fee + tax;

  return (
    <div className="w-full flex flex-col gap-3 p-9">
      <div className="text-3xl mb-3font-semibold">
        <p>CART TOTAL</p>
      </div>

      <div className="flex flex-col gap-4 mt-2 text-lg">
        {/* Subtotal */}
        <div className="flex justify-between">
          <p>Subtotal</p>
          <p>
            {currency} {subtotal.toFixed(2)}
          </p>
        </div>
        <hr />

        {/* Shipping */}
        <div className="flex justify-between">
          <p>Shipping Fee</p>
          <p>
            {currency} {delivery_fee.toFixed(2)}
          </p>
        </div>
        <hr />

        {/* Tax */}
        <div className="flex justify-between">
          <p>Estimated Tax (5%)</p>
          <p>
            {currency} {tax.toFixed(2)}
          </p>
        </div>
        <hr />

        {/* Final Total */}
        <div className="flex justify-between font-bold text-xl">
          <p>Total</p>
          <p>
            {currency} {total.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;
