import React, { useState } from "react";
import { useTranslation } from "@/context/LanguageContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Search, Plus, Pencil, Trash2 } from "lucide-react";
import { AddProductDialog } from "@/components/Products/AddProductDialog"; // Yo'lni tekshiring

// --- Demo Mahsulotlar (Android uchun capacity qo'shildi) ---
const sampleProducts = [
  {
    id: 1,
    type: 'smartphone', // Android
    name: 'Samsung Galaxy A54',
    barcode: '8806094787519',
    price: { uzs: 4500000, usd: 380 },
    // stock: 25, // Endi jadvalda ko'rsatilmaydi
    // minStock: 10, // Endi jadvalda ko'rsatilmaydi
    capacity: '128GB', // Android uchun Hajmi
    purchaseDate: '2024-01-10',
    // region: 'SER (RU)', // Android uchun ham region bo'lishi mumkin
  },
  {
    id: 2,
    type: 'iphone',
    name: 'iPhone 14 Pro',
    barcode: '194253401619',
    purchasePrice: 950,
    sellingPrice: 1150,
    color: 'Deep Purple',
    capacity: '128GB',
    region: 'LL/A (USA)',
    purchaseDate: '2024-02-05',
  },
  {
    id: 3,
    type: 'smartphone', // Yana bir Android
    name: 'Xiaomi Redmi Note 12',
    barcode: '6941812716182',
    price: { uzs: 2800000, usd: 230 },
    // stock: 40, // Endi jadvalda ko'rsatilmaydi
    // minStock: 15, // Endi jadvalda ko'rsatilmaydi
    capacity: '64GB', // Android uchun Hajmi
    purchaseDate: '2024-03-01',
  },
];
// --- Demo Mahsulotlar Tugadi ---

export default function Products() {
  const { t } = useTranslation();
  const [search, setSearch] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [products, setProducts] = useState(sampleProducts);

  const handleAddProduct = (newProduct: any) => {
    console.log("Adding product:", newProduct);
    setProducts(prev => [...prev, { ...newProduct, id: Date.now() }]);
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  const formatPrice = (price: number, currency: 'UZS' | 'USD' = 'UZS') => {
    // Oddiy formatlash, valyuta belgisi kerak bo'lsa to'liq locale ishlatiladi
    return price.toLocaleString('en-US'); // Yoki 'uz-UZ'
    // Yoki valyuta belgisi bilan:
    // return price.toLocaleString('uz-UZ', { style: 'currency', currency: currency, minimumFractionDigits: 0 });
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold gradient-heading">{t("products")}</h1>
        <Button className="flex items-center gap-2" onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="h-4 w-4" />
          {t("addProduct")}
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 justify-between">
        <div className="relative md:w-96">
          <Input
            placeholder={t("search")}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        </div>
      </div>

      <Card className="card-gradient">
        <CardHeader>
          <CardTitle>{t("products")} {t("list")}</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                {/* Yangilangan ustunlar */}
                <TableHead>{t("name")}</TableHead>
                <TableHead>{t("type")}</TableHead>
                <TableHead>{t("sellingPriceHeader")}</TableHead> {/* Narx ustuni nomi o'zgardi */}
                <TableHead>{t("capacity")}</TableHead>         {/* YANGI: Hajmi */}
                <TableHead>{t("region")}</TableHead>           {/* YANGI: Seriyasi/Region */}
                <TableHead className="text-right">{t("actions")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell>
                        {product.type === 'smartphone' ? t('android') : t('iphone')}
                    </TableCell>
                    <TableCell>
                      {/* Narxni ko'rsatish */}
                      {product.type === 'smartphone' && product.price
                        ? `${formatPrice(product.price.uzs)} ${t('uzs')}` // Android UZS narxi
                        : product.type === 'iphone' && product.sellingPrice
                        ? `$${formatPrice(product.sellingPrice)}` // iPhone sotish narxi ($)
                        : '-'}
                    </TableCell>
                    <TableCell>
                        {/* Hajmini ko'rsatish */}
                        {product.capacity || '-'}
                    </TableCell>
                    <TableCell>
                        {/* Region/Seriyani ko'rsatish (asosan iPhone uchun) */}
                        {(product.type === 'iphone' && product.region) || '-'}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" className="mr-2" onClick={() => console.log("Edit", product.id)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive" onClick={() => console.log("Delete", product.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  {/* colSpan yangi ustunlar soniga moslandi (6) */}
                  <TableCell colSpan={6} className="text-center py-10">
                    <p className="text-muted-foreground">
                      {search ? t("noProductsFound") : t("no_data")}
                    </p>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <AddProductDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onAddProduct={handleAddProduct}
      />
    </div>
  );
}