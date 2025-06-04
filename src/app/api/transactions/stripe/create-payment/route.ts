import { NextResponse } from "next/server";
import Stripe from "stripe";
import { rechargeService, CreateTransactionRequest } from "@/services/recharge.service";

interface Topup {
  phoneNumber: string;
  amount: number;
}

interface CreatePaymentRequest {
  topups: Topup[];
  country: string;
  operator: string;
  currency: string;
  email: string;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { topups, country, operator, currency, email } = body as CreatePaymentRequest;

    // Validate request
    if (!topups || !topups.length) {
      return NextResponse.json(
        { error: "At least one topup is required" },
        { status: 400 }
      );
    }

    // Calculate total amount
    const totalAmount = topups.reduce((sum: number, topup: Topup) => sum + Number(topup.amount), 0);

    // Get Stripe settings
    const settings = await rechargeService.getPaymentSettings();
    const stripe = new Stripe(settings.stripe.secretKey, {
      apiVersion: "2025-05-28.basil",
    });

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(totalAmount * 100), // Convert to cents
      currency: currency.toLowerCase(),
      payment_method_types: ["card"],
      metadata: {
        type: "TOPUP",
        country,
        operator,
        phoneNumbers: topups.map((t: Topup) => t.phoneNumber).join(","),
        amounts: topups.map((t: Topup) => t.amount).join(",")
      },
      receipt_email: email,
    });

    // Create transactions in pending state
    const transactions = await Promise.all(
      topups.map((topup: Topup) =>
        rechargeService.createTransaction({
          phoneNumber: String(topup.phoneNumber),
          operator,
          amount: Number(topup.amount)
        } as CreateTransactionRequest)
      )
    );

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
      transactions: transactions.map(t => ({
        id: t.id,
        phoneNumber: t.phoneNumber,
        amount: t.amount,
        status: t.status,
        createdAt: t.createdAt
      }))
    });
  } catch (error: any) {
    console.error("Payment intent creation error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create payment intent" },
      { status: 500 }
    );
  }
} 