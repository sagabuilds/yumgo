/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChefHat, Search, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";

export default function HowToCookModal() {
  const router = useRouter();

  const [recipeName, setRecipeName] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!recipeName.trim()) {
      toast.error("Please enter a recipe name");
      return;
    }

    router.push(`/recipe?cook=${encodeURIComponent(recipeName.trim())}`);

    setIsOpen(false);
    setRecipeName("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <Button
        variant="ghost"
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 text-stone-700 hover:text-green-600 hover:bg-green-50 rounded-full px-4"
      >
        <ChefHat className="w-4 h-4" />
        How to Cook?
      </Button>

      <DialogContent className="max-w-2xl rounded-[32px] border border-green-100 bg-gradient-to-br from-[#f7fff9] via-white to-[#f3fff6] shadow-[0_20px_80px_rgba(34,197,94,0.15)] p-0 overflow-hidden">
        
        {/* Background Glow */}
        <div className="absolute top-0 left-0 h-56 w-56 bg-green-300/20 blur-3xl rounded-full" />
        <div className="absolute bottom-0 right-0 h-56 w-56 bg-emerald-300/20 blur-3xl rounded-full" />

        <div className="relative p-8">

          {/* Header */}
          <DialogHeader className="space-y-4">
            <div className="flex items-center gap-3">

              <div className="flex items-center justify-center h-12 w-12 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 shadow-lg">
                <ChefHat className="h-6 w-6 text-white" />
              </div>

              <div>
                <DialogTitle className="text-4xl font-black tracking-tight text-slate-900">
                  How to{" "}
                  <span className="bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent">
                    Cook?
                  </span>
                </DialogTitle>

                <DialogDescription className="text-slate-500 text-base mt-2">
                  Enter any recipe and our AI chef will guide you step-by-step.
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          {/* Search */}
          <div className="mt-8 space-y-4">

            <label className="text-sm font-semibold text-slate-700">
              What would you like to cook?
            </label>

            <div className="relative">

              <input
                type="text"
                value={recipeName}
                onChange={(e) => setRecipeName(e.target.value)}
                placeholder="e.g., Chicken Biryani, Chocolate Cake..."
                className="w-full h-16 rounded-2xl border border-green-200 bg-white/90 px-6 pr-14 text-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
              />

              <Search className="absolute right-5 top-1/2 -translate-y-1/2 h-6 w-6 text-slate-400" />
            </div>
          </div>

          {/* Suggestions */}
          <div className="mt-6 rounded-3xl border border-green-100 bg-green-50/70 p-5">

            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="h-4 w-4 text-green-600" />

              <p className="font-semibold text-green-800">
                Try These
              </p>
            </div>

            <div className="flex flex-wrap gap-3">

              {[
                "Butter Chicken",
                "Chocolate Brownies",
                "Caesar Salad",
                "Pasta Alfredo",
              ].map((item) => (
                <button
                  key={item}
                  onClick={() => setRecipeName(item)}
                  className="px-4 py-2 rounded-full bg-white border border-green-200 text-green-700 hover:bg-green-500 hover:text-white transition-all duration-300 text-sm font-medium shadow-sm"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Button */}
          <Button
            onClick={handleSubmit}
            disabled={!recipeName.trim()}
            className="mt-8 w-full h-14 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 hover:scale-[1.02] transition-all duration-300 text-white text-lg font-semibold shadow-xl disabled:opacity-50"
          >
            <ChefHat className="h-5 w-5 mr-2" />
            Get Recipe
          </Button>

        </div>
      </DialogContent>
    </Dialog>
  );
}