"use client";
import React from "react";
import { Button } from "./ui/button";
import {
  Cookie,
  Refrigerator,
  Sparkles,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, SignUpButton } from "@clerk/nextjs";
import HowToCookModal from "./HowToCookModal";
import PricingModal from "./PricingModal";
import Image from "next/image";
import { Badge } from "./ui/badge";
import UserDropdown from "./UserDropdown";
import { useUser } from "@clerk/nextjs";

export default function Header() {
  const { user } = useUser();
  const isAdmin =
    user?.primaryEmailAddress?.emailAddress === "nnocap118@gmail.com";

  return (
    <header className="fixed top-0 w-full z-50 backdrop-blur-md bg-white/80 border-b border-green-50 shadow-[0_2px_20px_rgba(46,125,50,0.03)] transition-all">
      <nav className="container mx-auto px-6 h-16 flex items-center justify-between">

        {/* 🔥 Logo */}
        <Link
          href={user ? "/dashboard" : "/"}
          className="flex items-center gap-2 group"
        >
          <div className="relative">
            <Image
              src="/ologo.png"
              alt="YumGo Logo"
              width={44}
              height={44}
              className="transition-transform duration-300 group-hover:scale-110"
            />
          </div>
          <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent">
            YumGo
          </span>
        </Link>

        {/* 🍝 Navigation */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <Link
            href="/recipes"
            className="flex items-center gap-2 hover:text-green-600 transition-all hover:scale-[1.05]"
          >
            <Cookie className="w-4 h-4 text-green-600" />
            My Recipes
          </Link>

          <Link
            href="/pantry"
            className="flex items-center gap-2 hover:text-green-600 transition-all hover:scale-[1.05]"
          >
            <Refrigerator className="w-4 h-4 text-green-600" />
            My Pantry
          </Link>

          <a
            href="http://localhost:1337/admin"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-green-600 transition-all hover:scale-[1.05]"
          >
            <ShieldCheck className="w-4 h-4 text-green-600" />
            Admin
          </a>
        </div>

        {/* 🚀 Actions */}
        <div className="flex items-center gap-3">
          <HowToCookModal />

          <SignedIn>
            {user && (
              <PricingModal subscriptionTier={user.subscriptionTier}>
                <Badge
                  className={`flex items-center gap-1.5 h-8 px-3 rounded-full text-xs font-semibold transition-all cursor-pointer border ${
                    user.subscriptionTier === "pro"
                      ? "bg-gradient-to-r from-green-600 to-emerald-500 text-white border-transparent shadow-md hover:scale-105"
                      : "bg-green-50/50 text-green-700 border-green-100 hover:bg-green-50 hover:border-green-200"
                  }`}
                >
                  <Sparkles
                    className={`h-3 w-3 ${
                      user.subscriptionTier === "pro"
                        ? "text-white"
                        : "text-green-600"
                    }`}
                  />
                  {user.subscriptionTier === "pro"
                    ? "Pro Chef"
                    : "Free Plan"}
                </Badge>
              </PricingModal>
            )}

            <UserDropdown />
          </SignedIn>

          <SignedOut>
            <SignInButton mode="modal">
              <Button
                variant="ghost"
                className="text-slate-600 hover:text-green-600 hover:bg-green-50 transition-all"
              >
                Sign In
              </Button>
            </SignInButton>

            <SignUpButton mode="modal">
              <Button className="rounded-full px-6 bg-green-600 hover:bg-green-700 text-white shadow-md shadow-green-600/10 border-0 transition-transform hover:scale-[1.03]">
                Get Started
              </Button>
            </SignUpButton>
          </SignedOut>
        </div>
      </nav>
    </header>
  );
}
