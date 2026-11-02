"use client";

import React from "react";
import { Check, Sparkles, ChefHat } from "lucide-react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
} from "@clerk/nextjs";
import { CheckoutButton } from "@clerk/nextjs/experimental";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function PricingSection({
  subscriptionTier = "free",
}) {
  return (
    <section className="relative overflow-hidden bg-[#f8faf8] py-20 sm:py-24 text-slate-900 border-t border-green-100/60">
      {/* Background glow effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-72 w-72 bg-green-500/5 blur-3xl rounded-full" />
      </div>

      <div className="relative max-w-4xl mx-auto px-6 text-center">
        {/* Header Badge */}
        <div className="inline-block bg-[#111827] text-white text-[10px] font-black px-4 py-1.5 rounded-md uppercase tracking-[0.2em] mb-4">
          PRICING
        </div>

        {/* Title */}
        <h2 className="text-4xl md:text-6xl font-extrabold text-[#22c55e] mb-12 tracking-tight">
          Pick Your Plan
        </h2>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto items-stretch text-left">
          
          {/* FREE PLAN */}
          <Card className="relative bg-[#f8fafc] border border-slate-100 shadow-[0_10px_35px_rgba(0,0,0,0.02)] rounded-[32px] overflow-hidden py-0">
            <CardContent className="p-8 md:p-10 flex flex-col h-full justify-between">
              
              <div>
                {/* Title */}
                <h3 className="text-2xl font-bold text-slate-900 mb-6">
                  Free
                </h3>

                {/* Price */}
                <div className="flex items-baseline gap-1.5 mb-8">
                  <span className="text-5xl font-black text-slate-900 tracking-tight">
                    $0
                  </span>
                  <span className="text-sm text-slate-400 font-medium">
                    forever
                  </span>
                </div>

                {/* Check Features */}
                <ul className="space-y-4 mb-8">
                  {[
                    "5 scans / day",
                    "Basic recipe matching",
                    "Community support",
                  ].map((item, index) => (
                    <li
                      key={index}
                      className="flex items-center text-sm font-medium text-slate-700"
                    >
                      <span className="text-green-600 font-extrabold mr-2.5">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Button */}
              <div className="pt-4">
                <Link href="/dashboard" className="block">
                  <Button className="w-full h-12 bg-slate-950 text-white hover:bg-slate-800 rounded-full font-bold text-sm transition-transform hover:scale-[1.02] border-none">
                    Start Free
                  </Button>
                </Link>
              </div>

            </CardContent>
          </Card>

          {/* PRO PLAN */}
          <Card className="relative bg-[#0c1119] border border-slate-800 shadow-[0_20px_50px_rgba(0,0,0,0.4)] rounded-[32px] overflow-hidden py-0 text-white">
            <CardContent className="p-8 md:p-10 flex flex-col h-full justify-between">
              
              <div>
                {/* Title */}
                <h3 className="text-2xl font-bold text-white mb-6">
                  Pro
                </h3>

                {/* Price */}
                <div className="flex items-baseline gap-1.5 mb-8">
                  <span className="text-5xl font-black text-[#22c55e] tracking-tight">
                    $10
                  </span>
                  <span className="text-sm text-slate-400 font-medium">
                    /month
                  </span>
                </div>

                {/* Check Features */}
                <ul className="space-y-4 mb-8">
                  {[
                    "Unlimited scans",
                    "Smart pantry & expiry alerts",
                    "Premium recipes",
                    "Priority support",
                  ].map((item, index) => (
                    <li
                      key={index}
                      className="flex items-center text-sm font-medium text-white"
                    >
                      <span className="text-green-500 font-extrabold mr-2.5">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Button */}
              <div className="pt-4">
                <SignedIn>
                  <CheckoutButton
                    planId="cplan_37y5uChZ9uYauQyTlDkXDh997ht"
                    planPeriod="month"
                    newSubscriptionRedirectUrl="/dashboard"
                    checkoutProps={{
                      appearance: {
                        elements: {
                          drawerRoot: {
                            zIndex: 2000,
                          },
                        },
                      },
                    }}
                  >
                    <Button
                      disabled={subscriptionTier === "pro"}
                      className="w-full h-12 bg-[#22c55e] hover:bg-green-600 text-white rounded-full font-bold text-sm transition-transform hover:scale-[1.02] border-none disabled:opacity-60"
                    >
                      {subscriptionTier === "pro" ? "Subscribed" : "Go Pro"}
                    </Button>
                  </CheckoutButton>
                </SignedIn>

                <SignedOut>
                  <SignInButton mode="modal">
                    <Button className="w-full h-12 bg-[#22c55e] hover:bg-green-600 text-white rounded-full font-bold text-sm transition-transform hover:scale-[1.02] border-none">
                      Go Pro
                    </Button>
                  </SignInButton>
                </SignedOut>
              </div>

            </CardContent>
          </Card>

        </div>
      </div>
    </section>
  );
}