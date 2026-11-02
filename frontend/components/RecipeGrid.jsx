"use client";

import { useEffect } from "react";
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import useFetch from "@/hooks/use-fetch";
import RecipeCard from "@/components/RecipeCard";

export default function RecipeGrid({
  type,
  value,
  fetchAction,
  backLink = "/dashboard",
}) {
  const { loading, data, fn: fetchMeals } = useFetch(fetchAction);

  useEffect(() => {
    if (value) {
      const formattedValue =
        value.charAt(0).toUpperCase() + value.slice(1);

      fetchMeals(formattedValue);
    }
  }, [value]);

  const meals = data?.meals || [];

  const displayName = value?.replace(/-/g, " ");

  return (
    <div className="min-h-screen bg-gradient-to-br from-lime-50 via-green-50 to-yellow-50 pt-14 pb-16 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-10">
          <Link
            href={backLink}
            className="inline-flex items-center gap-2 text-green-700 hover:text-yellow-600 transition-all duration-300 mb-5 font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>

          <div className="bg-white/70 backdrop-blur-lg border border-green-100 rounded-3xl p-8 shadow-lg">
            <h1 className="text-5xl md:text-6xl font-extrabold capitalize tracking-tight leading-tight text-black">
              {displayName}{" "}
              <span className="text-green-700">
                {type === "cuisine" ? "Cuisine" : "Recipes"}
              </span>
            </h1>

            {!loading && meals.length > 0 && (
              <p className="text-stone-700 mt-4 text-lg">
                {meals.length} delicious {displayName}{" "}
                {type === "cuisine" ? "dishes" : "recipes"} waiting for you 🍴
              </p>
            )}
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col justify-center items-center py-24">
            <div className="bg-white rounded-full p-5 shadow-lg border border-green-100">
              <Loader2 className="w-10 h-10 text-green-700 animate-spin" />
            </div>

            <p className="text-stone-700 mt-5 text-lg font-medium">
              Loading delicious recipes...
            </p>
          </div>
        )}

        {/* Meals Grid */}
        {!loading && meals.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {meals.map((meal) => (
              <div
                key={meal.idMeal}
                className="transform hover:-translate-y-2 transition-all duration-300"
              >
                <RecipeCard recipe={meal} variant="grid" />
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && meals.length === 0 && (
          <div className="bg-white/70 backdrop-blur-lg border border-yellow-200 rounded-3xl py-24 px-6 text-center shadow-lg">
            <div className="text-7xl mb-6">🥗</div>

            <h3 className="text-3xl font-bold text-black mb-4">
              No recipes found
            </h3>

            <p className="text-stone-700 mb-8 max-w-xl mx-auto text-lg">
              We couldn&apos;t find any {displayName}{" "}
              {type === "cuisine" ? "dishes" : "recipes"} right now.
            </p>

            <Link href={backLink}>
              <span className="inline-flex items-center gap-2 bg-green-700 hover:bg-yellow-500 hover:text-black text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-md">
                <ArrowLeft className="w-4 h-4" />
                Explore More Recipes
              </span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}