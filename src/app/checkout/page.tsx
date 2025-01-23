"use client";

import Footer from "@/components/footer";
import React, { useState } from "react";


export default function CheckoutPage() {
    const [paymentMethod, setPaymentMethod] = useState<"cod" | "bank" | null>(null);

    return (
        <div className="container mx-auto px-6 py-12">
            <h1 className="text-3xl font-bold mb-6">Checkout</h1>
            <form className="space-y-6">
                <div>
                    <label className="block font-bold">Name</label>
                    <input
                        type="text"
                        className="w-full border px-4 py-2 rounded"
                        required
                    />
                </div>
                <div>
                    <label className="block font-bold">Contact Number</label>
                    <input
                        type="tel"
                        className="w-full border px-4 py-2 rounded"
                        required
                    />
                </div>
                <div>
                    <label className="block font-bold">Country</label>
                    <input
                        type="text"
                        className="w-full border px-4 py-2 rounded"
                        required
                    />
                </div>
                <div>
                    <label className="block font-bold">City</label>
                    <input
                        type="text"
                        className="w-full border px-4 py-2 rounded"
                        required
                    />
                </div>
                <div>
                    <label className="block font-bold">Address</label>
                    <textarea
                        className="w-full border px-4 py-2 rounded"
                        rows={3}
                        required
                    ></textarea>
                </div>
                <div>
                    <label className="block font-bold">ZIP Code</label>
                    <input
                        type="text"
                        className="w-full border px-4 py-2 rounded"
                        required
                    />
                </div>

                <h2 className="text-xl font-bold">Payment Method</h2>
                <div>
                    <input
                        type="radio"
                        id="cod"
                        name="payment"
                        value="cod"
                        onChange={() => setPaymentMethod("cod")}
                    />
                    <label htmlFor="cod" className="ml-2">
                        Cash on Delivery (+ $10 delivery fee)
                    </label>
                </div>
                <div>
                    <input
                        type="radio"
                        id="bank"
                        name="payment"
                        value="bank"
                        onChange={() => setPaymentMethod("bank")}
                    />
                    <label htmlFor="bank" className="ml-2">
                        Bank Transfer
                    </label>
                </div>

                {paymentMethod === "bank" && (
                    <div className="space-y-4 mt-4">
                        <div>
                            <label className="block font-bold">Card Number</label>
                            <input
                                type="text"
                                className="w-full border px-4 py-2 rounded"
                                required
                            />
                        </div>
                        <div>
                            <label className="block font-bold">Name on Card</label>
                            <input
                                type="text"
                                className="w-full border px-4 py-2 rounded"
                                required
                            />
                        </div>
                        <div className="flex gap-4">
                            <div className="flex-1">
                                <label className="block font-bold">Expiry Date</label>
                                <input
                                    type="text"
                                    className="w-full border px-4 py-2 rounded"
                                    placeholder="MM/YY"
                                    required
                                />
                            </div>
                            <div className="flex-1">
                                <label className="block font-bold">Security Code</label>
                                <input
                                    type="text"
                                    className="w-full border px-4 py-2 rounded"
                                    required
                                />
                            </div>
                        </div>
                    </div>
                )}

                <button
                    type="submit"
                    className="bg-blue-500 text-white font-bold py-3 px-6 rounded w-full mt-4"
                >
                    Submit
                </button>
            </form>
       <Footer />
        </div>
    );
}
