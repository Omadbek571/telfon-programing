import React, { createContext, useContext } from 'react';
// Loyihangizdagi haqiqiy yo'llarni ishlating:
import { Language } from '@/types';
import { useApp } from '@/context/AppContext';

/*
// Agar importlarda muammo bo'lsa, test uchun vaqtinchalik:
type Language = "uz_latin" | "uz_cyrillic" | "ru" | "en";
const useApp = () => ({ language: "uz_latin" as Language });
*/

// Translations object
const translations = {
  // Login page
  login: {
    uz_latin: "Tizimga kirish",
    uz_cyrillic: "Тизимга кириш",
    ru: "Вход в систему",
    en: "Login"
  },
  username: {
    uz_latin: "Foydalanuvchi nomi",
    uz_cyrillic: "Фойдаланувчи номи",
    ru: "Имя пользователя",
    en: "Username"
  },
  password: {
    uz_latin: "Parol",
    uz_cyrillic: "Парол",
    ru: "Пароль",
    en: "Password"
  },
  forgotPassword: {
    uz_latin: "Parolni unutdingizmi?",
    uz_cyrillic: "Паролни унутдингизми?",
    ru: "Забыли пароль?",
    en: "Forgot password?"
  },
  signIn: {
    uz_latin: "Kirish",
    uz_cyrillic: "Кириш",
    ru: "Войти",
    en: "Sign in"
  },
  // Dashboard
  dashboard: {
    uz_latin: "Boshqaruv paneli",
    uz_cyrillic: "Бошқарув панели",
    ru: "Панель управления",
    en: "Dashboard"
  },
  dailySales: {
    uz_latin: "Kunlik sotuvlar",
    uz_cyrillic: "Кунлик сотувлар",
    ru: "Ежедневные продажи",
    en: "Daily Sales"
  },
  monthlySales: {
    uz_latin: "Oylik sotuvlar",
    uz_cyrillic: "Ойлик сотувлар",
    ru: "Ежемесячные продажи",
    en: "Monthly Sales"
  },
  registerBalance: {
    uz_latin: "Kassa balansi",
    uz_cyrillic: "Касса баланси",
    ru: "Баланс кассы",
    en: "Register Balance"
  },
  lowStock: {
    uz_latin: "Kam qoldiq",
    uz_cyrillic: "Кам қолдиқ",
    ru: "Малый остаток",
    en: "Low Stock"
  },
  // Navigation
  pos: {
    uz_latin: "Sotuv",
    uz_cyrillic: "Сотув",
    ru: "Продажа",
    en: "POS"
  },
  products: {
    uz_latin: "Mahsulotlar",
    uz_cyrillic: "Маҳсулотлар",
    ru: "Товары",
    en: "Products"
  },
  type: { // Jadval ustuni: Turi
    uz_latin: "Turi",
    uz_cyrillic: "Тури",
    ru: "Тип",
    en: "Type"
  },
  priceSellUzs: { // Jadval ustuni: Narxi (Sotish/UZS)
    uz_latin: "Narxi (Sotish/UZS)",
    uz_cyrillic: "Нархи (Сотиш/СЎМ)",
    ru: "Цена (Продажа/UZS)",
    en: "Price (Sell/UZS)"
  },
   stockInfo: { // Jadval ustuni: Ombor/Info
    uz_latin: "Ombor/Info",
    uz_cyrillic: "Омбор/Инфо",
    ru: "Склад/Инфо",
    en: "Stock/Info"
  },
  android: { // Mahsulot turi: Android
      uz_latin: "Android",
      uz_cyrillic: "Android",
      ru: "Android",
      en: "Android"
  },
  iphone: { // Mahsulot turi: iPhone
      uz_latin: "iPhone",
      uz_cyrillic: "iPhone",
      ru: "iPhone",
      en: "iPhone"
  },
  inventory: {
    uz_latin: "Ombor",
    uz_cyrillic: "Омбор",
    ru: "Склад",
    en: "Inventory"
  },
  reports: {
    uz_latin: "Hisobotlar",
    uz_cyrillic: "Ҳисоботлар",
    ru: "Отчеты",
    en: "Reports"
  },
  installments: {
    uz_latin: "Muddatli to'lovlar",
    uz_cyrillic: "Муддатли тўловлар",
    ru: "Рассрочки",
    en: "Installments"
  },
  settings: {
    uz_latin: "Sozlamalar",
    uz_cyrillic: "Созламалар",
    ru: "Настройки",
    en: "Settings"
  },
  logout: {
    uz_latin: "Chiqish",
    uz_cyrillic: "Чиқиш",
    ru: "Выход",
    en: "Logout"
  },
  // POS
  cart: {
    uz_latin: "Savat",
    uz_cyrillic: "Сават",
    ru: "Корзина",
    en: "Cart"
  },
  scanBarcode: {
    uz_latin: "Shtrix kodni skanerlang",
    uz_cyrillic: "Штрих кодни сканерланг",
    ru: "Отсканируйте штрих-код",
    en: "Scan barcode"
  },
  product: {
    uz_latin: "Mahsulot",
    uz_cyrillic: "Маҳсулот",
    ru: "Товар",
    en: "Product"
  },
  price: {
    uz_latin: "Narxi",
    uz_cyrillic: "Нархи",
    ru: "Цена",
    en: "Price"
  },
  quantity: {
    uz_latin: "Soni",
    uz_cyrillic: "Сони",
    ru: "Количество",
    en: "Quantity"
  },
  total: {
    uz_latin: "Jami",
    uz_cyrillic: "Жами",
    ru: "Итого",
    en: "Total"
  },
  paymentMethod: {
    uz_latin: "To'lov usuli",
    uz_cyrillic: "Тўлов усули",
    ru: "Способ оплаты",
    en: "Payment method"
  },
  cash: {
    uz_latin: "Naqd",
    uz_cyrillic: "Нақд",
    ru: "Наличные",
    en: "Cash"
  },
  card: {
    uz_latin: "Plastik",
    uz_cyrillic: "Пластик",
    ru: "Карта",
    en: "Card"
  },
  mixed: {
    uz_latin: "Aralash",
    uz_cyrillic: "Аралаш",
    ru: "Смешанный",
    en: "Mixed"
  },
  credit: {
    uz_latin: "Nasiya",
    uz_cyrillic: "Насия",
    ru: "Кредит",
    en: "Credit"
  },
  installment: {
    uz_latin: "Muddatli to'lov",
    uz_cyrillic: "Муддатли тўлов",
    ru: "Рассрочка",
    en: "Installment"
  },
  // General
  cancel: {
    uz_latin: "Bekor qilish",
    uz_cyrillic: "Бекор қилиш",
    ru: "Отменить",
    en: "Cancel"
  },
  save: {
    uz_latin: "Saqlash",
    uz_cyrillic: "Сақлаш",
    ru: "Сохранить",
    en: "Save"
  },
  create: {
    uz_latin: "Yaratish",
    uz_cyrillic: "Яратиш",
    ru: "Создать",
    en: "Create"
  },
  edit: {
    uz_latin: "Tahrirlash",
    uz_cyrillic: "Таҳрирлаш",
    ru: "Редактировать",
    en: "Edit"
  },
  delete: {
    uz_latin: "O'chirish",
    uz_cyrillic: "Ўчириш",
    ru: "Удалить",
    en: "Delete"
  },
  search: {
    uz_latin: "Qidirish",
    uz_cyrillic: "Қидириш",
    ru: "Поиск",
    en: "Search"
  },
  uzs: {
    uz_latin: "so'm",
    uz_cyrillic: "сўм",
    ru: "сум",
    en: "UZS"
  },
  sales: {
    uz_latin: "sotuvlar",
    uz_cyrillic: "сотувлар",
    ru: "продажи",
    en: "sales"
  },
  day: {
    uz_latin: "kun",
    uz_cyrillic: "кун",
    ru: "день",
    en: "day"
  },
  available: {
    uz_latin: "mavjud",
    uz_cyrillic: "мавжуд",
    ru: "доступно",
    en: "available"
  },
  addToCart: {
    uz_latin: "Savatga qo'shish",
    uz_cyrillic: "Саватга қўшиш",
    ru: "Добавить в корзину",
    en: "Add to cart"
  },
  noProductsFound: {
    uz_latin: "Mahsulotlar topilmadi",
    uz_cyrillic: "Маҳсулотлар топилмади",
    ru: "Товары не найдены",
    en: "No products found"
  },
  cartEmpty: {
    uz_latin: "Savat bo'sh",
    uz_cyrillic: "Сават бўш",
    ru: "Корзина пуста",
    en: "Cart is empty"
  },
  employees: {
    uz_latin: "Hodimlar",
    uz_cyrillic: "Ҳодимлар",
    ru: "Сотрудники",
    en: "Employees"
  },
  checkout: {
    uz_latin: "Buyurtma berish",
    uz_cyrillic: "Буюртма бериш",
    ru: "Оформить заказ",
    en: "Checkout"
  },
  // Superadmin translations
  superadmin: {
    uz_latin: "Bosh admin",
    uz_cyrillic: "Бош админ",
    ru: "Суперадмин",
    en: "Superadmin"
  },
  stores: {
    uz_latin: "Do'konlar",
    uz_cyrillic: "Дўконлар",
    ru: "Магазины",
    en: "Stores"
  },
  subscriptions: {
    uz_latin: "Obunalar",
    uz_cyrillic: "Обуналар",
    ru: "Подписки",
    en: "Subscriptions"
  },
  payments: {
    uz_latin: "To'lovlar",
    uz_cyrillic: "Тўловлар",
    ru: "Платежи",
    en: "Payments"
  },
  storeOwner: {
    uz_latin: "Do'kon egasi",
    uz_cyrillic: "Дўкон эгаси",
    ru: "Владелец магазина",
    en: "Store Owner"
  },
  status: {
    uz_latin: "Holati",
    uz_cyrillic: "Ҳолати",
    ru: "Статус",
    en: "Status"
  },
  active: {
    uz_latin: "Faol",
    uz_cyrillic: "Фаол",
    ru: "Активный",
    en: "Active"
  },
  expired: {
    uz_latin: "Muddati tugagan",
    uz_cyrillic: "Муддати тугаган",
    ru: "Истек срок",
    en: "Expired"
  },
  blocked: {
    uz_latin: "Bloklangan",
    uz_cyrillic: "Блокланган",
    ru: "Заблокирован",
    en: "Blocked"
  },
  subscriptionType: {
    uz_latin: "Obuna turi",
    uz_cyrillic: "Обуна тури",
    ru: "Тип подписки",
    en: "Subscription Type"
  },
  validUntil: {
    uz_latin: "Amal qilish muddati",
    uz_cyrillic: "Амал қилиш муддати",
    ru: "Действителен до",
    en: "Valid Until"
  },
  createStore: {
    uz_latin: "Do'kon yaratish",
    uz_cyrillic: "Дўкон яратиш",
    ru: "Создать магазин",
    en: "Create Store"
  },
  storeName: {
    uz_latin: "Do'kon nomi",
    uz_cyrillic: "Дўкон номи",
    ru: "Название магазина",
    en: "Store Name"
  },
  ownerName: {
    uz_latin: "Egasining ismi",
    uz_cyrillic: "Эгасининг исми",
    ru: "Имя владельца",
    en: "Owner Name"
  },
  ownerPhone: {
    uz_latin: "Telefon raqami",
    uz_cyrillic: "Телефон рақами",
    ru: "Номер телефона",
    en: "Phone Number"
  },
  features: {
    uz_latin: "Imkoniyatlar",
    uz_cyrillic: "Имкониятлар",
    ru: "Возможности",
    en: "Features"
  },
  extend: {
    uz_latin: "Muddatni uzaytirish",
    uz_cyrillic: "Муддатни узайтириш",
    ru: "Продлить",
    en: "Extend"
  },
  block: {
    uz_latin: "Bloklash",
    uz_cyrillic: "Блоклаш",
    ru: "Блокировать",
    en: "Block"
  },
  unblock: {
    uz_latin: "Blokdan chiqarish",
    uz_cyrillic: "Блокдан чиқариш",
    ru: "Разблокировать",
    en: "Unblock"
  },
  paymentStatus: {
    uz_latin: "To'lov holati",
    uz_cyrillic: "Тўлов ҳолати",
    ru: "Статус платежа",
    en: "Payment Status"
  },
  pending: {
    uz_latin: "Kutilmoqda",
    uz_cyrillic: "Кутилмоқда",
    ru: "В ожидании",
    en: "Pending"
  },
  approved: {
    uz_latin: "Tasdiqlangan",
    uz_cyrillic: "Тасдиқланган",
    ru: "Подтвержден",
    en: "Approved"
  },
  rejected: {
    uz_latin: "Rad etilgan",
    uz_cyrillic: "Рад этилган",
    ru: "Отклонен",
    en: "Rejected"
  },
  amount: {
    uz_latin: "Summa",
    uz_cyrillic: "Сумма",
    ru: "Сумма",
    en: "Amount"
  },
  paymentDate: {
    uz_latin: "To'lov sanasi",
    uz_cyrillic: "Тўлов санаси",
    ru: "Дата платежа",
    en: "Payment Date"
  },
  receipt: {
    uz_latin: "Chek",
    uz_cyrillic: "Чек",
    ru: "Чек",
    en: "Receipt"
  },
  viewImage: {
    uz_latin: "Rasmni ko'rish",
    uz_cyrillic: "Расмни кўриш",
    ru: "Посмотреть изображение",
    en: "View Image"
  },
  approve: {
    uz_latin: "Tasdiqlash",
    uz_cyrillic: "Тасдиқлаш",
    ru: "Подтвердить",
    en: "Approve"
  },
  reject: {
    uz_latin: "Rad etish",
    uz_cyrillic: "Рад этиш",
    ru: "Отклонить",
    en: "Reject"
  },
  actions: {
    uz_latin: "Amallar",
    uz_cyrillic: "Амаллар",
    ru: "Действия",
    en: "Actions"
  },
  users: {
    uz_latin: "Foydalanuvchilar",
    uz_cyrillic: "Фойдаланувчилар",
    ru: "Пользователи",
    en: "Users"
  },
  list: {
    uz_latin: "Ro'yxat",
    uz_cyrillic: "Рўйхат",
    ru: "Список",
    en: "List"
  },
  current_stock: { // Bu kalit ombordagi joriy qoldiq uchun ishlatilishi mumkin
    uz_latin: "Joriy zaxira",
    uz_cyrillic: "Жорий захира",
    ru: "Текущий запас",
    en: "Current Stock"
  },
  // min_stock kalitining dublikati olib tashlandi
  remaining: {
    uz_latin: "Qolgan",
    uz_cyrillic: "Қолган",
    ru: "Осталось",
    en: "Remaining"
  },
  store_information: {
    uz_latin: "Do'kon ma'lumotlari",
    uz_cyrillic: "Дўкон маълумотлари",
    ru: "Информация о магазине",
    en: "Store Information"
  },
  sales_report: {
    uz_latin: "Sotuvlar hisoboti",
    uz_cyrillic: "Сотувлар ҳисоботи",
    ru: "Отчет по продажам",
    en: "Sales Report"
  },
  inventory_report: {
    uz_latin: "Ombor hisoboti",
    uz_cyrillic: "Омбор ҳисоботи",
    ru: "Отчет по складу",
    en: "Inventory Report"
  },
  inventory_status: {
    uz_latin: "Ombor holati",
    uz_cyrillic: "Омбор ҳолати",
    ru: "Статус склада",
    en: "Inventory Status"
  },
  report: {
    uz_latin: "hisobot",
    uz_cyrillic: "ҳисобот",
    ru: "отчет",
    en: "report"
  },
  no_data: {
    uz_latin: "Ma'lumot yo'q",
    uz_cyrillic: "Маълумот йўқ",
    ru: "Нет данных",
    en: "No data"
  },
  customer: {
    uz_latin: "Mijoz",
    uz_cyrillic: "Мижоз",
    ru: "Клиент",
    en: "Customer"
  },
  add: {
    uz_latin: "Qo'shish",
    uz_cyrillic: "Қўшиш",
    ru: "Добавить",
    en: "Add"
  },
  name: {
    uz_latin: "Nomi",
    uz_cyrillic: "Номи",
    ru: "Название",
    en: "Name"
  },
  // stock kalitining dublikati olib tashlandi
  date: {
    uz_latin: "Sana",
    uz_cyrillic: "Сана",
    ru: "Дата",
    en: "Date"
  },
  payment_method: { // Bu kalit mavjud paymentMethod bilan bir xil, lekin _ bilan. Bittasini tanlang.
    uz_latin: "To'lov usuli",
    uz_cyrillic: "Тўлов усули",
    ru: "Способ оплаты",
    en: "Payment method"
  },
  store: {
    uz_latin: "Do'kon",
    uz_cyrillic: "Дўкон",
    ru: "Магазин",
    en: "Store"
  },
  information: {
    uz_latin: "Ma'lumot",
    uz_cyrillic: "Маълумот",
    ru: "Информация",
    en: "Information"
  },
  subscription: {
    uz_latin: "Obuna",
    uz_cyrillic: "Обуна",
    ru: "Подписка",
    en: "Subscription"
  },

  // --- AddProductDialog uchun qo'shilgan va yangilangan tarjimalar ---
  addProduct: { // Umumiy sarlavha (agar kerak bo'lsa)
    uz_latin: "Mahsulot qo'shish",
    uz_cyrillic: "Маҳсулот қўшиш",
    ru: "Добавить товар",
    en: "Add Product"
  },
  addProductDescription: { // Umumiy tavsif (agar kerak bo'lsa)
    uz_latin: "Yangi mahsulot qo'shish uchun ma'lumotlarni to'ldiring",
    uz_cyrillic: "Янги маҳсулот қўшиш учун маълумотларни тўлдиринг",
    ru: "Заполните информацию для добавления нового товара",
    en: "Fill in the information to add a new product"
  },
  barcode: {
    uz_latin: "Shtrix kod",
    uz_cyrillic: "Штрих код",
    ru: "Штрих-код",
    en: "Barcode"
  },
  category: { // Bu Android uchun olib tashlangan bo'lsa-da, qoldirilgan
    uz_latin: "Kategoriya",
    uz_cyrillic: "Категория",
    ru: "Категория",
    en: "Category"
  },
  priceUzs: { // Android uchun
    uz_latin: "Narxi (so'm)",
    uz_cyrillic: "Нархи (сўм)",
    ru: "Цена (сум)",
    en: "Price (UZS)"
  },
  priceUsd: { // Android uchun
    uz_latin: "Narxi (dollar)",
    uz_cyrillic: "Нархи (доллар)",
    ru: "Цена (доллар)",
    en: "Price (USD)"
  },
  addAndroid: { // Android qo'shish tugmasi va sarlavhasi
    uz_latin: "Android qo'shish",
    uz_cyrillic: "Android қўшиш",
    ru: "Добавить Android",
    en: "Add Android"
  },
  addAndroidDescription: { // Android uchun tavsif
    uz_latin: "Yangi Android qurilma qo'shish uchun ma'lumotlarni to'ldiring",
    uz_cyrillic: "Янги Android қурилма қўшиш учун маълумотларни тўлдиринг",
    ru: "Заполните информацию для добавления нового Android устройства",
    en: "Fill in the information to add a new Android device"
  },
  androidAdded: { // Android qo'shilgandagi xabar
    uz_latin: "Android qurilma muvaffaqiyatli qo'shildi",
    uz_cyrillic: "Android қурилма муваффақиятли қўшилди",
    ru: "Android устройство успешно добавлено",
    en: "Android device added successfully"
  },
  addIPhone: { // iPhone qo'shish tugmasi va sarlavhasi
    uz_latin: "iPhone qo'shish",
    uz_cyrillic: "iPhone қўшиш",
    ru: "Добавить iPhone",
    en: "Add iPhone"
  },
  addIPhoneDescription: { // iPhone qo'shish tavsifi
    uz_latin: "Yangi iPhone qo'shish uchun ma'lumotlarni to'ldiring",
    uz_cyrillic: "Янги iPhone қўшиш учун маълумотларни тўлдиринг",
    ru: "Заполните информацию для добавления нового iPhone",
    en: "Fill in the information to add a new iPhone"
  },
  purchasePrice: { // iPhone olingan narxi
    uz_latin: "Olingan narxi ",
    uz_cyrillic: "Олинган нархи ",
    ru: "Цена покупки ",
    en: "Purchase Price "
  },
  sellingPriceHeader: { // Narx ustuni uchun umumiy nom
    uz_latin: "Sotish Narxi",
    uz_cyrillic: "Сотиш Нархи",
    ru: "Цена продажи",
    en: "Selling Price"
  },
  capacity: { // Hajmi ustuni va dialogdagi label uchun
    uz_latin: "Hajmi", // Yoki Sig'imi
    uz_cyrillic: "Ҳажми", // Yoki Сиғими
    ru: "Емкость",
    en: "Capacity"
  },
  region: { // Seriya/Region ustuni va dialogdagi label uchun
    uz_latin: "Seriyasi/Region",
    uz_cyrillic: "Серияси/Регион",
    ru: "Регион/Серия",
    en: "Region/Variant"
  },
  capacityAndroidLabel: { // Android uchun sig'im labeli
    uz_latin: "Sig'imi",
    uz_cyrillic: "Сиғими",
    ru: "Емкость",
    en: "Capacity"
  },
  capacityValueLabel: { // iPhone sig'im (raqam) labeli
    uz_latin: "Sig'imi",
    uz_cyrillic: "Сиғими",
    ru: "Емкость",
    en: "Capacity"
  },
  capacityUnitLabel: { // iPhone yomkost (birlik) labeli
    uz_latin: "Yomkost", // Yoki Birligi
    uz_cyrillic: "Ёмкость", // Yoki Бирлиги
    ru: "Ед. изм.", // Единица измерения
    en: "Unit"
  },
  sellingPrice: { // iPhone sotiladigan narxi
    uz_latin: "Sotiladigan narxi ",
    uz_cyrillic: "Сотиладиган нархи ",
    ru: "Цена продажи ",
    en: "Selling Price "
  },
  color: { // iPhone rangi
    uz_latin: "Rangi",
    uz_cyrillic: "Ранги",
    ru: "Цвет",
    en: "Color"
  },
   capacity: { // iPhone Yomkost (Sig'im)
    uz_latin: "Sig'imi (Yomkost)",
    uz_cyrillic: "Сиғими (Ёмкость)",
    ru: "Емкость",
    en: "Capacity"
  },
  region: { // iPhone Seriyasi (Region)
    uz_latin: "Seriyasi (Region)",
    uz_cyrillic: "Серияси (Регион)",
    ru: "Регион (Серия)",
    en: "Region/Variant"
  },
  iPhoneAdded: { // iPhone qo'shilgandagi xabar
    uz_latin: "iPhone muvaffaqiyatli qo'shildi",
    uz_cyrillic: "iPhone муваффақиятли қўшилди",
    ru: "iPhone успешно добавлен",
    en: "iPhone added successfully"
  },
  "e.g.": { // Input placeholderlarida misol uchun
    uz_latin: "Masalan:",
    uz_cyrillic: "Масалан:",
    ru: "Например:",
    en: "e.g.,"
  },
  batteryHealthLabel: { // iPhone batareya sog'lig'i uchun label
    uz_latin: "Batareya holati (%)",
    uz_cyrillic: "Батарея ҳолати (%)",
    ru: "Состояние батареи (%)",
    en: "Battery Health (%)"
  },
  // --- AddProductDialog uchun tarjimalar tugadi ---

  // Qolgan mavjud tarjimalar
  totalAmount: {
    uz_latin: "Umumiy summa",
    uz_cyrillic: "Умумий сумма",
    ru: "Общая сумма",
    en: "Total amount"
  },
  remainingAmount: {
    uz_latin: "Qolgan summa",
    uz_cyrillic: "Қолган сумма",
    ru: "Оставшаяся сумма",
    en: "Remaining amount"
  },
  nextPayment: {
    uz_latin: "Keyingi to'lov",
    uz_cyrillic: "Кейинги тўлов",
    ru: "Следующий платеж",
    en: "Next payment"
  },
  view: {
    uz_latin: "Ko'rish",
    uz_cyrillic: "Кўриш",
    ru: "Просмотр",
    en: "View"
  },
  completed: {
    uz_latin: "Tugallangan",
    uz_cyrillic: "Тугалланган",
    ru: "Завершено",
    en: "Completed"
  },
  overdue: {
    uz_latin: "Muddati o'tgan",
    uz_cyrillic: "Муддати ўтган",
    ru: "Просрочено",
    en: "Overdue"
  },
  purchaseDateLabel: { // Olingan sana maydoni uchun Label
    uz_latin: "Olingan sana",
    uz_cyrillic: "Олинган сана",
    ru: "Дата покупки",
    en: "Purchase Date"
  },

}; // translations obyekti tugadi

// ========================================================================
//  QUYIDAGI QISM O'ZGARMASDAN, TO'LIQLIGICHA QOLADI
// ========================================================================

type TranslationKeys = keyof typeof translations;

interface LanguageContextType {
  t: (key: TranslationKeys) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Bu yerda `useApp` ni to'g'ri import qilinganiga ishonch hosil qiling
  const { language } = useApp();

  const t = (key: TranslationKeys): string => {
    // Kalit mavjudligini tekshirish
    if (!translations[key]) {
      console.warn(`Translation key "${key}" not found`);
      return key; // Agar kalit topilmasa, kalitning o'zini qaytarish
    }

    // Til uchun tarjima mavjudligini tekshirish
    if (!translations[key][language]) {
      // Agar joriy til uchun tarjima topilmasa, boshqa tilga (masalan, 'uz_latin') qaytish
      const fallbackLanguage: Language = 'uz_latin'; // Standart tilni belgilang
      console.warn(`Translation for key "${key}" in language "${language}" not found. Falling back to '${fallbackLanguage}'.`);
      // Standart til uchun ham tarjima bo'lmasa, kalitni qaytarish
      return translations[key][fallbackLanguage] || key;
    }

    // Joriy til uchun tarjimani qaytarish
    return translations[key][language];
  };

  return <LanguageContext.Provider value={{ t }}>{children}</LanguageContext.Provider>;
};

export const useTranslation = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  return context;
};