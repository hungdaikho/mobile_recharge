import { NextResponse } from "next/server";
import Stripe from "stripe";
import { rechargeService } from "@/services/recharge.service";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { transactionId, amount, currency, email, metadata } = body;

    // Get Stripe settings
    const settings = await rechargeService.getPaymentSettings();
    const stripe = new Stripe(settings.stripe.secretKey, {
      apiVersion: "2025-05-28.basil",
    });

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency: currency.toLowerCase(),
      payment_method_types: ["card"],
      metadata: {
        transactionId,
        ...metadata,
      },
      receipt_email: email,
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error: any) {
    console.error("Payment intent creation error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create payment intent" },
      { status: 500 }
    );
  }
} 