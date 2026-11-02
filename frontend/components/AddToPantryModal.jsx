/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useState, useEffect } from "react";
import {
  Camera,
  Plus,
  X,
  Check,
  Loader2,
  Sparkles,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

import ImageUploader from "@/components/ImageUploader";

import useFetch from "@/hooks/use-fetch";

import {
  scanPantryImage,
  saveToPantry,
  addPantryItemManually,
} from "@/actions/pantry.actions";

import { toast } from "sonner";

export default function AddToPantryModal({
  isOpen,
  onClose,
  onSuccess,
}) {
  const [activeTab, setActiveTab] = useState("scan");
  const [selectedImage, setSelectedImage] = useState(null);

  const [scannedIngredients, setScannedIngredients] = useState([]);

  const [manualItem, setManualItem] = useState({
    name: "",
    quantity: "",
  });

  const [error, setError] = useState("");

  // Scan image
  const {
    loading: scanning,
    data: scanData,
    fn: scanImage,
  } = useFetch(scanPantryImage);

  // Save scanned items
  const {
    loading: saving,
    data: saveData,
    fn: saveScannedItems,
  } = useFetch(saveToPantry);

  // Add manual item
  const {
    loading: adding,
    data: addData,
    fn: addManualItem,
  } = useFetch(addPantryItemManually);

  // Handle image selection
  const handleImageSelect = (file) => {
    setSelectedImage(file);
    setScannedIngredients([]);
    setError("");
  };

  // Scan image
  const handleScan = async () => {
    try {
      if (!selectedImage) {
        toast.error("Please select an image");
        return;
      }

      setError("");

      const formData = new FormData();
      formData.append("image", selectedImage);

      await scanImage(formData);
    } catch (err) {
      console.error(err);
      setError("Failed to scan image");
      toast.error("Failed to scan image");
    }
  };

  // Update scanned ingredients
  useEffect(() => {
    if (scanData?.success && scanData?.ingredients) {
      setScannedIngredients(scanData.ingredients);

      toast.success(
        `Found ${scanData.ingredients.length} ingredients!`
      );
    }

    if (scanData && !scanData.success) {
      setError(scanData.message || "Failed to scan image");
    }
  }, [scanData]);

  // Save scanned items
  const handleSaveScanned = async () => {
    try {
      if (scannedIngredients.length === 0) {
        toast.error("No ingredients to save");
        return;
      }

      const formData = new FormData();

      formData.append(
        "ingredients",
        JSON.stringify(scannedIngredients)
      );

      await saveScannedItems(formData);
    } catch (err) {
      console.error(err);
      toast.error("Failed to save ingredients");
    }
  };

  // Reset modal
  const handleClose = () => {
    setActiveTab("scan");
    setSelectedImage(null);
    setScannedIngredients([]);

    setManualItem({
      name: "",
      quantity: "",
    });

    setError("");

    onClose();
  };

  // Save success
  useEffect(() => {
    if (saveData?.success) {
      toast.success(saveData.message);

      handleClose();

      if (onSuccess) {
        onSuccess();
      }
    }
  }, [saveData]);

  // Manual add
  const handleAddManual = async (e) => {
    e.preventDefault();

    try {
      if (
        !manualItem.name.trim() ||
        !manualItem.quantity.trim()
      ) {
        toast.error("Please fill in all fields");
        return;
      }

      const formData = new FormData();

      formData.append("name", manualItem.name);
      formData.append("quantity", manualItem.quantity);

      await addManualItem(formData);
    } catch (err) {
      console.error(err);
      toast.error("Failed to add item");
    }
  };

  // Manual add success
  useEffect(() => {
    if (addData?.success) {
      toast.success("Item added to pantry!");

      setManualItem({
        name: "",
        quantity: "",
      });

      handleClose();

      if (onSuccess) {
        onSuccess();
      }
    }
  }, [addData]);

  // Remove ingredient
  const removeIngredient = (index) => {
    setScannedIngredients((prev) =>
      prev.filter((_, i) => i !== index)
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto rounded-[32px] border border-green-100 bg-gradient-to-br from-[#f7fff9] via-white to-[#f3fff6] shadow-[0_20px_80px_rgba(34,197,94,0.15)] p-0">

        {/* Background Glow */}
        <div className="absolute top-0 left-0 h-56 w-56 bg-green-300/20 blur-3xl rounded-full" />

        <div className="absolute bottom-0 right-0 h-56 w-56 bg-emerald-300/20 blur-3xl rounded-full" />

        <div className="relative p-8">

          {/* Header */}
          <DialogHeader className="mb-8 text-center">

            <div className="inline-flex mx-auto items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Sparkles className="w-4 h-4" />
              Smart Pantry AI
            </div>

            <DialogTitle className="text-4xl font-black tracking-tight leading-tight text-slate-900">
              Add to your{" "}
              <span className="bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent">
                pantry
              </span>
            </DialogTitle>

            <DialogDescription className="text-slate-500 text-base mt-3 max-w-lg mx-auto">
              Scan ingredients with AI or manually organize your kitchen in seconds.
            </DialogDescription>

          </DialogHeader>

          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="mt-4"
          >

            {/* Tabs */}
            <TabsList className="grid w-full grid-cols-2 bg-green-50 border border-green-100 rounded-2xl p-1 h-14">

              <TabsTrigger
                value="scan"
                className="gap-2 rounded-xl font-semibold text-slate-600 data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-emerald-500 data-[state=active]:text-white"
              >
                <Camera className="w-4 h-4" />
                AI Scan
              </TabsTrigger>

              <TabsTrigger
                value="manual"
                className="gap-2 rounded-xl font-semibold text-slate-600 data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-emerald-500 data-[state=active]:text-white"
              >
                <Plus className="w-4 h-4" />
                Add Manual
              </TabsTrigger>

            </TabsList>

            {/* AI Scan */}
            <TabsContent
              value="scan"
              className="space-y-6 mt-8"
            >

              {scannedIngredients.length === 0 ? (

                <div className="space-y-6">

                  <div className="rounded-3xl border border-dashed border-green-200 bg-white/80 backdrop-blur-xl p-6">

                    <ImageUploader
                      onImageSelect={handleImageSelect}
                      loading={scanning}
                    />

                  </div>

                  {error && (
                    <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                      {error}
                    </div>
                  )}

                  {selectedImage && (

                    <Button
                      onClick={handleScan}
                      disabled={scanning}
                      className="w-full h-14 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 hover:scale-[1.02] transition-all duration-300 text-white text-lg shadow-lg"
                    >

                      {scanning ? (
                        <>
                          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                          Analyzing Pantry...
                        </>
                      ) : (
                        <>
                          <Camera className="w-5 h-5 mr-2" />
                          Scan Pantry
                        </>
                      )}

                    </Button>
                  )}

                </div>

              ) : (

                <div className="space-y-5">

                  <div className="flex items-center justify-between">

                    <div>
                      <h3 className="text-xl font-bold text-slate-900">
                        Review Ingredients
                      </h3>

                      <p className="text-sm text-slate-500 mt-1">
                        AI detected {scannedIngredients.length} ingredients
                      </p>
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setScannedIngredients([]);
                        setSelectedImage(null);
                      }}
                      className="rounded-xl border-green-200 hover:bg-green-50"
                    >
                      <Camera className="w-4 h-4 mr-2" />
                      Scan Again
                    </Button>

                  </div>

                  {/* Ingredients */}
                  <div className="space-y-3 max-h-96 overflow-y-auto pr-1">

                    {scannedIngredients.map(
                      (ingredient, index) => (
                        <div
                          key={index}
                          className="group flex items-center gap-3 p-4 bg-white rounded-2xl border border-green-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                        >

                          <div className="flex-1">

                            <div className="font-semibold text-slate-900">
                              {ingredient.name}
                            </div>

                            <div className="text-sm text-slate-500">
                              {ingredient.quantity}
                            </div>

                          </div>

                          {ingredient.confidence && (
                            <Badge className="bg-green-100 text-green-700 border-0 rounded-full px-3 py-1">
                              {Math.round(
                                ingredient.confidence * 100
                              )}
                              %
                            </Badge>
                          )}

                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() =>
                              removeIngredient(index)
                            }
                            className="rounded-full hover:bg-red-100 hover:text-red-600"
                          >
                            <X className="w-4 h-4" />
                          </Button>

                        </div>
                      )
                    )}

                  </div>

                  {/* Save */}
                  <Button
                    onClick={handleSaveScanned}
                    disabled={
                      saving ||
                      scannedIngredients.length === 0
                    }
                    className="w-full h-14 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 hover:scale-[1.02] transition-all duration-300 text-white text-lg shadow-xl"
                  >

                    {saving ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Saving Ingredients...
                      </>
                    ) : (
                      <>
                        <Check className="w-5 h-5 mr-2" />
                        Save to Pantry
                      </>
                    )}

                  </Button>

                </div>
              )}

            </TabsContent>

            {/* Manual */}
            <TabsContent value="manual" className="mt-8">

              <form
                onSubmit={handleAddManual}
                className="space-y-5"
              >

                <div>

                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Ingredient Name
                  </label>

                  <input
                    type="text"
                    value={manualItem.name}
                    onChange={(e) =>
                      setManualItem({
                        ...manualItem,
                        name: e.target.value,
                      })
                    }
                    placeholder="e.g., Chicken Breast"
                    disabled={adding}
                    className="w-full px-5 py-4 rounded-2xl border border-green-100 bg-white focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                  />

                </div>

                <div>

                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Quantity
                  </label>

                  <input
                    type="text"
                    value={manualItem.quantity}
                    onChange={(e) =>
                      setManualItem({
                        ...manualItem,
                        quantity: e.target.value,
                      })
                    }
                    placeholder="e.g., 2 cups"
                    disabled={adding}
                    className="w-full px-5 py-4 rounded-2xl border border-green-100 bg-white focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                  />

                </div>

                <Button
                  type="submit"
                  disabled={adding}
                  className="w-full h-14 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 hover:scale-[1.02] transition-all duration-300 text-white text-lg shadow-xl"
                >

                  {adding ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Adding Item...
                    </>
                  ) : (
                    <>
                      <Plus className="w-5 h-5 mr-2" />
                      Add to Pantry
                    </>
                  )}

                </Button>

              </form>

            </TabsContent>

          </Tabs>

        </div>

      </DialogContent>
    </Dialog>
  );
}