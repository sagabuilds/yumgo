import React from "react";
import { ArrowRight, Star, Flame, Clock, Users } from "lucide-react";
import Image from "next/image";
import { SignUpButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { auth } from "@clerk/nextjs/server";
import { SITE_STATS, FEATURES, HOW_IT_WORKS_STEPS } from "@/lib/data";
import PricingSection from "@/components/PricingSection";
import Link from "next/link";

// High-fidelity background images matching each feature perfectly
const FEATURE_BACKGROUNDS = [
  "https://images.unsplash.com/photo-1588854337236-6889d631faa8?auto=format&fit=crop&w=800&q=80", // Open fridge with fresh colorful organic produce
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80", // Plated chef suggestions meal
  "https://images.unsplash.com/photo-1506368249639-73a05d6f6488?auto=format&fit=crop&w=800&q=80", // Organized clean pantry herbs & searches
  "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80"  // Tablet displaying cookbook on kitchen counter
];

export default async function LandingPage() {
  const { has } = await auth();
  const subscriptionTier = has({ plan: "pro" }) ? "pro" : "free";

  return (
    <div className="min-h-screen bg-[#f8faf8] text-[#1e293b] selection:bg-green-200 selection:text-green-800 overflow-hidden relative font-sans">
      
      {/* Decorative Herb Glows */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-green-500/5 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-[20%] left-[-10%] w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none z-0" />

      {/* Hero Section */}
      <section className="relative pt-24 pb-20 px-6 md:px-12 lg:px-16 z-10">
        <div className="max-w-7xl mx-auto">
          {/* Main Organic Grid Container */}
          <div className="bg-white rounded-[48px] border border-green-100/60 shadow-[0_20px_60px_rgba(46,125,50,0.05)] overflow-hidden flex flex-col lg:flex-row items-stretch">
            
            {/* Left Column: Organic Text Content */}
            <div className="flex-1 p-8 md:p-16 lg:p-20 flex flex-col justify-center relative">
              <div className="absolute top-10 right-10 text-green-500/10 text-9xl font-serif pointer-events-none select-none">🍃</div>
              
              <div className="self-start mb-6">
                <Badge
                  variant="outline"
                  className="bg-slate-900 text-white border-none text-[10px] md:text-xs font-black px-4 py-2 rounded-md uppercase tracking-[0.2em] shadow-sm flex items-center gap-1.5"
                >
                  <Flame className="w-3.5 h-3.5 text-green-400 fill-green-400" />
                  <span>ONE STOP</span>
                </Badge>
              </div>

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-8 leading-[1.05] tracking-tight text-slate-900">
                Reimagine <br />
                <span className="font-serif italic text-green-600 font-normal pr-2">your</span> leftovers <br />
                <span className="text-green-600 relative">
                  instantly.
                  <span className="absolute bottom-1 left-0 w-full h-[4px] bg-green-500/30 rounded-full"></span>
                </span>
                <span className="inline-block align-middle ml-4 rotate-3 hover:rotate-0 transition-all duration-500 hover:scale-105 shadow-md relative rounded-2xl overflow-hidden border-2 border-green-50">
                  <Image
                    src="/cake.png"
                    alt="delicious food cake representation"
                    width={140}
                    height={140}
                    className="object-cover h-[60px] w-[90px] md:h-[80px] md:w-[120px]"
                  />
                </span>
              </h1>

              <p className="text-base md:text-lg text-slate-600 font-light leading-relaxed mb-10 max-w-lg">
                Snap a photo of your fridge. We&apos;ll tell you what to cook. Save money, reduce waste, and eat better tonight.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <Link href="/dashboard" className="w-full sm:w-auto">
                  <Button
                    size="xl"
                    className="w-full sm:w-auto px-8 py-7 rounded-full text-base font-bold bg-green-600 hover:bg-green-700 text-white shadow-[0_8px_30px_rgba(74,222,128,0.25)] hover:shadow-[0_8px_40px_rgba(74,222,128,0.45)] transition-all duration-300 hover:-translate-y-0.5 group border-none"
                  >
                    <span className="flex items-center justify-center gap-2">
                      ORDER NOW
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
                    </span>
                  </Button>
                </Link>
              </div>

              <div className="mt-8 flex items-center gap-2 text-xs md:text-sm text-slate-500 font-medium">
                <span className="h-2 w-2 rounded-full bg-green-500 animate-ping"></span>
                <span>
                  <strong className="text-slate-800 font-bold">10k+ cooks</strong> joined last month
                </span>
              </div>
            </div>

            {/* Right Column: Dark Slate Table Food Presentation */}
            <div className="flex-1 min-h-[400px] lg:min-h-auto bg-gradient-to-br from-[#1b221b] to-[#0c0f0c] p-8 md:p-12 lg:p-16 flex items-center justify-center relative">
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
              
              <Card className="relative w-full max-w-sm aspect-[4/5] rounded-[36px] overflow-hidden border border-white/10 shadow-[0_30px_80px_rgba(0,0,0,0.5)] group transition-all duration-500 hover:border-green-500/20 py-0">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 z-10" />
                <Image
                  src="/pizza.png"
                  alt="Delicious Spaghetti al Pomodoro dish"
                  width={1000}
                  height={1000}
                  className="w-full h-full object-cover transform scale-100 group-hover:scale-[1.03] transition-transform duration-1000 ease-out"
                />

                {/* Floating Plate Recipe Match Card */}
                <Card className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md border border-green-100 rounded-2xl py-0 z-20 shadow-2xl transition-all duration-500 group-hover:translate-y-[-4px]">
                  <CardContent className="p-5">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-bold text-base md:text-lg text-slate-900 group-hover:text-green-700 transition-colors">
                          Spaghetti al Pomodoro
                        </h3>
                        <div className="flex gap-1 mt-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className="w-3.5 h-3.5 fill-amber-500 text-amber-500"
                            />
                          ))}
                        </div>
                      </div>
                      <Badge
                        variant="outline"
                        className="border border-green-600 bg-green-50 text-green-700 font-bold px-3 py-1 text-xs rounded-full uppercase tracking-wider"
                      >
                        98% MATCH
                      </Badge>
                    </div>
                    <div className="flex gap-4 text-xs text-slate-500 font-medium border-t border-slate-100 pt-3 mt-3">
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-green-600" /> 25 mins
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-green-600" /> 2 servings
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Card>
            </div>

          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="relative py-14 bg-slate-900 border-y border-slate-800 text-white z-10">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 text-center px-6">
          {SITE_STATS.map((stat, i) => (
            <div key={i} className="group">
              <div className="text-3xl md:text-4xl font-extrabold mb-1.5 text-white tracking-tight group-hover:scale-105 transition-transform duration-300">
                {stat.val}
              </div>
              <Badge
                variant="secondary"
                className="bg-transparent text-green-400 text-xs sm:text-sm uppercase tracking-wider font-semibold border-none hover:text-green-300 transition-colors"
              >
                {stat.label}
              </Badge>
            </div>
          ))}
        </div>
      </section>

      {/* Features: "Your Smart Kitchen" with 3D compact visual cards */}
      <section className="relative py-24 px-6 md:px-12 lg:px-16 z-10 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 text-center lg:text-left flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <Badge className="bg-green-100 border border-green-200 text-green-700 px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-md mb-3 self-start">
                FEATURES
              </Badge>
              <h2 className="text-4xl md:text-5xl font-black mb-3 tracking-tight text-slate-900 mt-2">
                Your Smart Kitchen
              </h2>
              <p className="text-slate-500 text-base md:text-lg font-light">
                Everything you need to master your meal prep.
              </p>
            </div>
            <div className="h-1 bg-gradient-to-r from-green-500 to-transparent w-full max-w-[200px] hidden lg:block mb-2"></div>
          </div>

          {/* Grid Layout featuring 3D, compact cards with raised edges */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {FEATURES.map((feature, index) => {
              const IconComponent = feature.icon;
              const bgImage = FEATURE_BACKGROUNDS[index % FEATURE_BACKGROUNDS.length];
              
              return (
                <Card
                  key={index}
                  className="relative min-h-[260px] md:min-h-[280px] rounded-[24px] overflow-hidden border-2 border-slate-100 hover:border-green-400 shadow-[0_8px_0_rgba(46,125,50,0.04)] hover:shadow-[0_14px_0_rgba(34,197,94,0.08)] hover:-translate-y-1.5 transition-all duration-300 group py-0 flex flex-col justify-end"
                >
                  {/* Backdrop Realistic Image Layer */}
                  <div className="absolute inset-0 z-0 overflow-hidden">
                    <img
                      src={bgImage}
                      alt={feature.title}
                      className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-[1.2s] ease-out"
                    />
                    {/* Multilayered shading overlay for contrast and readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent z-10" />
                  </div>

                  {/* Card Badge on top right */}
                  <Badge
                    className="absolute top-4 right-4 z-20 bg-green-600 hover:bg-green-700 text-white font-bold text-[9px] tracking-wider px-3 py-1 rounded-full border border-green-500 shadow-md uppercase"
                  >
                    {feature.limit.split(" ")[feature.limit.split(" ").length - 1] === "free" ? "FREE" : "PRO"}
                  </Badge>

                  {/* Compact content wrapper with tactile glass details */}
                  <CardContent className="relative p-6 md:p-8 z-20 flex flex-col gap-3 transform translate-y-1 group-hover:translate-y-0 transition-transform duration-500">
                    <div className="flex items-center gap-3">
                      {/* Compact Glass Icon Badge */}
                      <div className="border border-white/20 bg-slate-900/80 backdrop-blur-md p-2.5 rounded-xl text-green-400 group-hover:text-green-300 shadow-md">
                        <IconComponent className="w-5 h-5" />
                      </div>
                      
                      <h3 className="text-xl font-extrabold text-white group-hover:text-green-300 transition-colors tracking-tight">
                        {feature.title}
                      </h3>
                    </div>

                    <p className="text-slate-100 text-xs md:text-sm font-normal leading-relaxed text-shadow-sm">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works: "Cook in 3 Steps" */}
      <section className="relative py-28 px-6 md:px-12 lg:px-16 border-y border-green-100 bg-[#f4fbf4]/40 text-slate-900 z-10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black mb-20 text-center tracking-tight text-slate-900">
            Cook in <span className="text-green-600 font-serif italic pr-2">3 Steps</span>
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {HOW_IT_WORKS_STEPS.map((item, i) => (
              <div key={i} className="relative group bg-white border border-green-100/50 rounded-3xl p-8 hover:border-green-300 transition-all duration-500 hover:translate-y-[-4px] shadow-sm hover:shadow-md">
                <div className="absolute top-6 right-8 text-7xl md:text-8xl font-black text-green-100/10 group-hover:text-green-500/5 transition-colors select-none font-sans">
                  {item.step}
                </div>
                <div className="flex flex-col gap-4">
                  <Badge
                    variant="outline"
                    className="text-3xl font-extrabold text-green-500 border-none bg-transparent p-0 h-auto self-start"
                  >
                    {item.step}
                  </Badge>
                  <div>
                    <h3 className="text-2xl font-bold mb-3 text-slate-900 group-hover:text-green-700 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-slate-600 text-base font-light leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="relative py-20 px-6 z-10">
        <PricingSection subscriptionTier={subscriptionTier} />
      </section>
    </div>
  );
}
