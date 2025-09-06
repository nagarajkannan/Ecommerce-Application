import React, { useContext } from "react";
import { Shopcontext } from "../context/Shopcontext";

const CartTotal = () => {
  const { currency, delivery_fee, getTotalCartAmount } = useContext(Shopcontext);

  const subtotal = getTotalCartAmount();
  const tax = subtotal * 0.05; // 5% tax
  const total = subtotal === 0 ? 0 : subtotal + delivery_fee + tax;

  return (
    <div className="w-full max-w-md mx-auto sm:mx-0 flex flex-col gap-4 p-6 sm:p-9 bg-white rounded-xl shadow-md">
      {/* Header */}
      <div className="text-2xl sm:text-3xl font-semibold mb-4 text-gray-800">
        CART TOTAL
      </div>

      <div className="flex flex-col gap-3 text-sm sm:text-base">
        {/* Subtotal */}
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>{currency} {subtotal.toFixed(2)}</span>
        </div>
        <hr />

        {/* Shipping */}
        <div className="flex justify-between">
          <span>Shipping Fee</span>
          <span>{currency} {delivery_fee.toFixed(2)}</span>
        </div>
        <hr />

        {/* Tax */}
        <div className="flex justify-between">
          <span>Estimated Tax (5%)</span>
          <span>{currency} {tax.toFixed(2)}</span>
        </div>
        <hr />

        {/* Total */}
        <div className="flex justify-between font-bold text-lg sm:text-xl mt-2">
          <span>Total</span>
          <span>{currency} {total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;
