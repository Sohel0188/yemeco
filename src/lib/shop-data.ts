import banana from "@/assets/p-banana.png";
import broccoli from "@/assets/p-broccoli.png";
import biscuits from "@/assets/p-biscuits.png";
import medicine from "@/assets/p-medicine.png";
import honey from "@/assets/p-honey.png";
import mango from "@/assets/p-mango.png";
import tomato from "@/assets/p-tomato.png";
import cookies from "@/assets/p-cookies.png";
import farmer1 from "@/assets/farmer-1.jpg";
import farmer2 from "@/assets/farmer-2.jpg";
import farmer3 from "@/assets/farmer-3.jpg";
import farmer4 from "@/assets/farmer-4.jpg";
import nutri1 from "@/assets/nutri-1.jpg";
import nutri2 from "@/assets/nutri-2.jpg";

export type CategoryId = "fruit" | "vegetable" | "biscuit" | "medicine" | "other";

export const CATEGORIES: { id: CategoryId; label: string; blurb: string; count: number }[] = [
  { id: "fruit", label: "Fruits", blurb: "Seasonal & orchard fresh", count: 1240 },
  { id: "vegetable", label: "Vegetables", blurb: "Picked this morning", count: 2180 },
  { id: "biscuit", label: "Biscuits", blurb: "Bakery & snacks", count: 860 },
  { id: "medicine", label: "Medicine", blurb: "Licensed pharmacies", count: 3400 },
  { id: "other", label: "Others", blurb: "Honey, spices & more", count: 1720 },
];

/** Each product type gets its own colour theme class on the card. */
export function categoryClass(id: CategoryId) {
  return `cat-${id}`;
}

export function categoryLabel(id: CategoryId) {
  return CATEGORIES.find((c) => c.id === id)?.label ?? "Others";
}

export type Person = { id: string; name: string; photo: string; place: string; role: string };

export const VENDORS = {
  rahim: { id: "rahim", name: "Abdur Rahim", photo: farmer1, place: "Savar, Dhaka", role: "Farmer" },
  shirin: { id: "shirin", name: "Shirin Akter", photo: farmer2, place: "Bogura", role: "Farmer" },
  karim: { id: "karim", name: "Haji Abdul Karim", photo: farmer3, place: "Rajshahi", role: "Farmer" },
  nusrat: { id: "nusrat", name: "Nusrat Jahan", photo: farmer4, place: "Dhanmondi, Dhaka", role: "Pharmacist" },
} satisfies Record<string, Person>;
export type VendorId = keyof typeof VENDORS;

export type Nutritionist = {
  id: string;
  name: string;
  photo: string;
  title: string;
  credentials: string[];
  experience: number;
  reviews: number;
  hospital: string;
  bio: string;
  specialties: string[];
};

export const NUTRITIONISTS = {
  farzana: {
    id: "farzana",
    name: "Dr. Farzana Haque",
    photo: nutri1,
    title: "Senior Clinical Nutritionist",
    credentials: ["MSc Food & Nutrition (DU)", "Registered Dietitian"],
    experience: 11,
    reviews: 2140,
    hospital: "Formerly at Square Hospital, Dhaka",
    bio: "Farzana checks every fruit and vegetable batch for freshness, nutrient value and safe handling before it earns a rating. She focuses on family nutrition and diabetes-friendly eating, and believes good food should be affordable for every home.",
    specialties: ["Family nutrition", "Diabetes diet", "Child growth", "Fresh produce"],
  },
  tanvir: {
    id: "tanvir",
    name: "Dr. Tanvir Ahmed",
    photo: nutri2,
    title: "Nutrition & Pharmacology Consultant",
    credentials: ["MPH Nutrition (BSMMU)", "B.Pharm"],
    experience: 8,
    reviews: 1580,
    hospital: "Consultant, Labaid Specialized Hospital",
    bio: "Tanvir reviews packaged foods, supplements and medicines on our marketplace. He reads every label, checks ingredients against BSTI standards and rates products on how they fit into a balanced daily diet.",
    specialties: ["Supplements", "Packaged foods", "Sports nutrition", "Label review"],
  },
} satisfies Record<string, Nutritionist>;
export type NutritionistId = keyof typeof NUTRITIONISTS;

export type Nutrients = {
  cal: string;
  protein: string;
  carbs: string;
  fat: string;
  fiber: string;
  vitamin: { label: string; value: string };
};

export type Product = {
  id: string;
  name: string;
  category: CategoryId;
  image: string;
  minOrder: string;
  serial: string;
  rating: number;
  nutritionistId: NutritionistId;
  note: string;
  vendorId: VendorId;
  organic: boolean;
  date: string;
  dateLabel: string;
  from: string;
  /** Listed product price, in taka. */
  price: number;
  /** Current selling price, in taka. */
  sellPrice: number;
  nutrients: Nutrients;
};

export const PRODUCTS: Product[] = [
  {
    id: "banana",
    name: "Banana",
    category: "fruit",
    image: banana,
    minOrder: "4 pcs",
    serial: "00019",
    rating: 4.5,
    nutritionistId: "farzana",
    note: "Naturally ripened, no carbide. A great potassium source for kids and seniors.",
    vendorId: "rahim",
    organic: true,
    date: "2024-06-03",
    dateLabel: "Collected",
    from: "Dhaka",
    price: 120,
    sellPrice: 90,
    nutrients: { cal: "89", protein: "1.1g", carbs: "22.8g", fat: "0.3g", fiber: "3.3g", vitamin: { label: "Vitamin C", value: "10mg" } },
  },
  {
    id: "broccoli",
    name: "Green Veg Mix",
    category: "vegetable",
    image: broccoli,
    minOrder: "1 kg",
    serial: "00042",
    rating: 4.8,
    nutritionistId: "farzana",
    note: "Broccoli, carrot and spinach — fibre-rich and full of vitamin A. Steam lightly.",
    vendorId: "shirin",
    organic: true,
    date: "2024-06-04",
    dateLabel: "Collected",
    from: "Bogura",
    price: 180,
    sellPrice: 145,
    nutrients: { cal: "34", protein: "2.8g", carbs: "6.6g", fat: "0.4g", fiber: "2.6g", vitamin: { label: "Vitamin A", value: "835µg" } },
  },
  {
    id: "mango",
    name: "Himsagar Mango",
    category: "fruit",
    image: mango,
    minOrder: "2 kg",
    serial: "00057",
    rating: 4.7,
    nutritionistId: "farzana",
    note: "Sweet and fibrous. Best enjoyed in moderation by people watching sugar levels.",
    vendorId: "karim",
    organic: true,
    date: "2024-06-02",
    dateLabel: "Collected",
    from: "Rajshahi",
    price: 320,
    sellPrice: 260,
    nutrients: { cal: "60", protein: "0.8g", carbs: "15g", fat: "0.4g", fiber: "1.6g", vitamin: { label: "Vitamin C", value: "36mg" } },
  },
  {
    id: "tomato",
    name: "Vine Tomato",
    category: "vegetable",
    image: tomato,
    minOrder: "500 g",
    serial: "00063",
    rating: 4.3,
    nutritionistId: "farzana",
    note: "Rich in lycopene. Pesticide residue test passed for this batch.",
    vendorId: "shirin",
    organic: false,
    date: "2024-06-04",
    dateLabel: "Collected",
    from: "Jessore",
    price: 70,
    sellPrice: 55,
    nutrients: { cal: "18", protein: "0.9g", carbs: "3.9g", fat: "0.2g", fiber: "1.2g", vitamin: { label: "Vitamin C", value: "14mg" } },
  },
  {
    id: "digestive",
    name: "Digestive Biscuit",
    category: "biscuit",
    image: biscuits,
    minOrder: "2 packs",
    serial: "00108",
    rating: 4.0,
    nutritionistId: "tanvir",
    note: "Whole wheat base with moderate sugar. Two biscuits make a sensible tea-time snack.",
    vendorId: "karim",
    organic: false,
    date: "2024-05-20",
    dateLabel: "Made",
    from: "Gazipur",
    price: 110,
    sellPrice: 85,
    nutrients: { cal: "471", protein: "7.2g", carbs: "62g", fat: "21g", fiber: "3.6g", vitamin: { label: "Iron", value: "2.1mg" } },
  },
  {
    id: "oat-cookies",
    name: "Oat Cookies",
    category: "biscuit",
    image: cookies,
    minOrder: "1 box",
    serial: "00114",
    rating: 3.9,
    nutritionistId: "tanvir",
    note: "Oats add fibre, but chocolate chips add sugar. A treat, not a meal replacement.",
    vendorId: "rahim",
    organic: false,
    date: "2024-05-28",
    dateLabel: "Made",
    from: "Narayanganj",
    price: 150,
    sellPrice: 120,
    nutrients: { cal: "450", protein: "6.5g", carbs: "65g", fat: "18g", fiber: "4.1g", vitamin: { label: "Iron", value: "2.6mg" } },
  },
  {
    id: "vitamin-c",
    name: "Vitamin C 500",
    category: "medicine",
    image: medicine,
    minOrder: "1 bottle",
    serial: "00231",
    rating: 4.6,
    nutritionistId: "tanvir",
    note: "DGDA approved. One tablet a day after meals; not a substitute for fresh fruit.",
    vendorId: "nusrat",
    organic: false,
    date: "2024-04-15",
    dateLabel: "Mfg",
    from: "Dhaka",
    price: 480,
    sellPrice: 399,
    nutrients: { cal: "4", protein: "0g", carbs: "1.1g", fat: "0g", fiber: "0g", vitamin: { label: "Vitamin C", value: "500mg" } },
  },
  {
    id: "honey",
    name: "Sundarbans Honey",
    category: "other",
    image: honey,
    minOrder: "500 g",
    serial: "00305",
    rating: 4.9,
    nutritionistId: "farzana",
    note: "Raw, unheated and lab-tested for purity. A spoon in warm water soothes the throat.",
    vendorId: "karim",
    organic: true,
    date: "2024-05-30",
    dateLabel: "Collected",
    from: "Khulna",
    price: 750,
    sellPrice: 620,
    nutrients: { cal: "304", protein: "0.3g", carbs: "82g", fat: "0g", fiber: "0.2g", vitamin: { label: "Potassium", value: "52mg" } },
  },
];
