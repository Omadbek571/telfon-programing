import { useState } from "react";
import { useTranslation } from "@/context/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

// Interfeys (Props uchun)
interface AddProductDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddProduct: (product: any) => void; // Backendga yuboriladigan ma'lumot tipini aniqlashtirish yaxshi
}

// Forma maydonlari uchun boshlang'ich holat
const initialFormData = {
  name: "",
  barcode: "",
  priceUzs: "",       // Android uchun
  priceUsd: "",       // Android uchun
  purchasePrice: "",  // iPhone uchun
  sellingPrice: "",   // iPhone uchun
  color: "",          // iPhone uchun
  capacity: "",       // Android uchun sig'im (matn, masalan, "128GB")
  region: "",         // iPhone uchun seriya/region
  purchaseDate: "",   // Ikkala rejim uchun olingan sana
  capacityValue: "",  // iPhone uchun sig'im (faqat raqam, masalan, 256)
  batteryHealth: "",  // iPhone uchun batareya sog'lig'i (faqat foiz, masalan, 85)
};

export function AddProductDialog({ open, onOpenChange, onAddProduct }: AddProductDialogProps) {
  // Hooklar
  const { t } = useTranslation();
  const [mode, setMode] = useState<"smartphone" | "iphone">("smartphone"); // 'smartphone' = Android
  const [formData, setFormData] = useState(initialFormData);

  // Formani tozalash funksiyasi
  const clearForm = () => {
    setFormData(initialFormData);
  };

  // Dialog ochilishi/yopilishi uchun handler
  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      clearForm(); // Yopilganda formani tozalash
      setMode("smartphone"); // Standart rejimga qaytarish
    }
    onOpenChange(isOpen);
  };

  // Forma yuborish (submit) uchun handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Brauzerning standart submit harakatini to'xtatish

    // Yuboriladigan mahsulot obyektini tayyorlash
    let product: any = {
        type: mode, // Mahsulot turi ('smartphone' yoki 'iphone')
        purchaseDate: formData.purchaseDate || null // Olingan sana (bo'sh bo'lsa null)
    };

    // Rejimga qarab obyektni to'ldirish
    if (mode === "smartphone") { // Android rejimi
      product = {
        ...product,
        name: formData.name,
        barcode: formData.barcode || null, // Shtrixkod ixtiyoriy bo'lsa null
        price: {
          uzs: Number(formData.priceUzs) || 0,
          usd: Number(formData.priceUsd) || 0,
        },
        capacity: formData.capacity, // Android uchun sig'im (matn)
      };
    } else { // mode === "iphone"
      product = {
        ...product,
        name: formData.name,
        barcode: formData.barcode || null,
        purchasePrice: Number(formData.purchasePrice) || 0,
        sellingPrice: Number(formData.sellingPrice) || 0,
        color: formData.color,
        capacityValue: Number(formData.capacityValue) || 0, // iPhone uchun sig'im (raqam)
        batteryHealth: formData.batteryHealth ? Number(formData.batteryHealth) : null, // Batareya sog'lig'i (raqam yoki null)
        region: formData.region,
      };
    }

    // Backendga yuborish yoki statega qo'shish
    console.log("Adding Product:", product); // Konsolga chiqarish (tekshirish uchun)
    onAddProduct(product); // Asosiy komponentga yuborish

    handleOpenChange(false); // Dialogni yopish va formani tozalash

    // Muvaffaqiyat xabari
    toast.success(t(mode === "smartphone" ? "androidAdded" : "iPhoneAdded"));
  };

  // Input o'zgarishlarini kuzatish uchun handler
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Rejimni o'zgartirish uchun handler
  const handleModeChange = (newMode: "smartphone" | "iphone") => {
     if (mode !== newMode) {
         clearForm(); // Rejim almashganda formani tozalash
         setMode(newMode);
     }
  }

  // Komponentning JSX strukturasi
  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[550px]">
        <form onSubmit={handleSubmit}>
          {/* Dialog sarlavhasi va tavsifi */}
          <DialogHeader>
            <DialogTitle>{t(mode === "smartphone" ? "addAndroid" : "addIPhone")}</DialogTitle>
            <DialogDescription>
              {t(mode === "smartphone" ? "addAndroidDescription" : "addIPhoneDescription")}
            </DialogDescription>
          </DialogHeader>

          {/* Rejim tanlash tugmalari */}
          <div className="flex justify-start gap-2 my-4">
            <Button
              type="button"
              variant={mode === "smartphone" ? "default" : "outline"}
              onClick={() => handleModeChange("smartphone")}
              aria-pressed={mode === 'smartphone'} // Ekran o'quvchilar uchun
            >
              {t("addAndroid")}
            </Button>
            <Button
              type="button"
              variant={mode === "iphone" ? "default" : "outline"}
              onClick={() => handleModeChange("iphone")}
              aria-pressed={mode === 'iphone'} // Ekran o'quvchilar uchun
            >
              {t("addIPhone")}
            </Button>
          </div>

          {/* Forma maydonlari (rejimga qarab) */}
          {mode === "smartphone" ? (
            // --- Android Qo'shish Formasi ---
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name-android" className="text-right">{t("name")}</Label>
                <Input id="name-android" name="name" value={formData.name} onChange={handleChange} className="col-span-3" required />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="barcode-android" className="text-right">{t("barcode")}</Label>
                <Input id="barcode-android" name="barcode" value={formData.barcode} onChange={handleChange} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="priceUzs-android" className="text-right">{t("priceUzs")}</Label>
                <Input id="priceUzs-android" name="priceUzs" type="number" value={formData.priceUzs} onChange={handleChange} className="col-span-3" required min="0" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="priceUsd-android" className="text-right">{t("priceUsd")}</Label>
                <Input id="priceUsd-android" name="priceUsd" type="number" step="0.01" value={formData.priceUsd} onChange={handleChange} className="col-span-3" required min="0" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="capacity-android" className="text-right">{t("capacityAndroidLabel")}</Label>
                <Input
                  id="capacity-android"
                  name="capacity"
                  value={formData.capacity}
                  onChange={handleChange}
                  className="col-span-3"
                  placeholder={t("e.g.") + " 128GB"}
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="purchaseDate-android" className="text-right">{t("purchaseDateLabel")}</Label>
                <Input id="purchaseDate-android" name="purchaseDate" type="date" value={formData.purchaseDate} onChange={handleChange} className="col-span-3" required />
              </div>
            </div>
          ) : (
            // --- iPhone Qo'shish Formasi ---
            <div className="grid gap-4 py-4">
               <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name-iphone" className="text-right">{t("name")}</Label>
                <Input id="name-iphone" name="name" value={formData.name} onChange={handleChange} className="col-span-3" placeholder={t("e.g.") + " iPhone 15 Pro"} required />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="barcode-iphone" className="text-right">{t("barcode")}</Label>
                <Input id="barcode-iphone" name="barcode" value={formData.barcode} onChange={handleChange} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="purchasePrice-iphone" className="text-right">{t("purchasePrice")}</Label>
                <Input id="purchasePrice-iphone" name="purchasePrice" type="number" step="0.01" value={formData.purchasePrice} onChange={handleChange} className="col-span-3" placeholder={t("e.g.") + " 900"} required min="0" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="sellingPrice-iphone" className="text-right">{t("sellingPrice")}</Label>
                <Input id="sellingPrice-iphone" name="sellingPrice" type="number" step="0.01" value={formData.sellingPrice} onChange={handleChange} className="col-span-3" placeholder={t("e.g.") + " 1100"} required min="0" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="purchaseDate-iphone" className="text-right">{t("purchaseDateLabel")}</Label>
                <Input id="purchaseDate-iphone" name="purchaseDate" type="date" value={formData.purchaseDate} onChange={handleChange} className="col-span-3" required />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="color-iphone" className="text-right">{t("color")}</Label>
                <Input id="color-iphone" name="color" value={formData.color} onChange={handleChange} className="col-span-3" placeholder={t("e.g.") + " Natural Titanium"} required />
              </div>

              {/* Sig'imi va Batareya holati - Har biri o'z labeli bilan yonma-yon */}
              <div className="grid grid-cols-4 gap-4">
                 {/* Chap taraf bo'sh */}
                 <div></div>
                 {/* O'ng taraf ikki ustunga bo'lingan */}
                 <div className="col-span-3 grid grid-cols-2 gap-4">
                    {/* 1-ustun: Sig'imi (Raqam) */}
                    <div className="space-y-1">
                       <Label htmlFor="capacityValue-iphone">{t("capacityValueLabel")}</Label>
                       <Input
                          id="capacityValue-iphone"
                          name="capacityValue"
                          type="number"
                          value={formData.capacityValue}
                          onChange={handleChange}
                          placeholder={t("e.g.") + " 256"}
                          required
                          min="0"
                          className="w-full"
                        />
                    </div>
                    {/* 2-ustun: Batareya holati (%) */}
                    <div className="space-y-1">
                       <Label htmlFor="batteryHealth-iphone">{t("batteryHealthLabel")}</Label>
                       <Input
                          id="batteryHealth-iphone"
                          name="batteryHealth"
                          type="number"
                          value={formData.batteryHealth}
                          onChange={handleChange}
                          placeholder={t("e.g.") + " 85"}
                          min="0"
                          max="100"
                          className="w-full"
                          // Majburiy emas
                        />
                    </div>
                 </div>
              </div>

              {/* Seriya/Region */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="region-iphone" className="text-right">{t("region")}</Label>
                <Input id="region-iphone" name="region" value={formData.region} onChange={handleChange} className="col-span-3" placeholder={t("e.g.") + " LL/A (USA)"} required />
              </div>
            </div>
          )}

          {/* Dialog footeri (Qo'shish tugmasi) */}
          <DialogFooter>
            <Button type="submit">{t("add")}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}