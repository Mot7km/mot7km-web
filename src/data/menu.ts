// src/data/menu.ts

export interface Review {
  reviewer: string;
  date: string;
  rating: number; // 1–5
  comment: string;
}

export interface CustomizationChoice {
  label: string;
  extraPrice: number; // e.g., 0.50 (in dollars)
}

export interface CustomizationOption {
  name: string;
  choices: CustomizationChoice[];
  defaultChoice?: string; // label of the default choice
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: string; // base price as string (e.g., "$8.50")
  rating: string;
  image: string;
  featured?: boolean;
  category?: string;
  ingredients?: string[];
  customizationOptions?: CustomizationOption[];
  reviews?: Review[];
}

export const allProducts: Product[] = [
  {
    id: 'featured-1',
    name: 'Avocado Green Smoothie',
    description: 'A refreshing blend of ripe avocados, spinach, green apple, and a hint of lime. Packed with vitamins and antioxidants.',
    price: '$9.50',
    rating: '4.9',
    image: 'https://picsum.photos/seed/avocado-smoothie/350/192',
    featured: true,
    category: 'Smoothies',
    ingredients: ['Avocado', 'Spinach', 'Green Apple', 'Lime', 'Coconut Water'],
    customizationOptions: [
      {
        name: 'Sweetness',
        choices: [
          { label: 'Regular', extraPrice: 0 },
          { label: 'Less Sweet', extraPrice: 0 },
          { label: 'Extra Sweet', extraPrice: 0.50 },
        ],
        defaultChoice: 'Regular',
      },
      {
        name: 'Add Protein',
        choices: [
          { label: 'No', extraPrice: 2 },
          { label: 'Scoop of Plant Protein', extraPrice: 2.00 },
        ],
        defaultChoice: 'No',
      },
      {
        name: 'Ketchup',
        choices: [
          { label: 'Yes', extraPrice: 5 },
          { label: 'No', extraPrice: 3 },
        ],
        defaultChoice: 'Yes',
      },
      {
        name: 'Sugar',
        choices: [
          { label: 'Yes', extraPrice: 0 },
          { label: 'No', extraPrice: 0 },
        ],
        defaultChoice: 'Yes',
      },
    ],
    reviews: [
      { reviewer: 'Emma W.', date: '2025-03-10', rating: 5, comment: 'Absolutely delicious! Perfect post-workout drink.' },
      { reviewer: 'James L.', date: '2025-03-05', rating: 4, comment: 'Great taste, but a bit too sweet for me.' },
    ],
  },
  {
    id: '1',
    name: 'Classic Cheeseburger',
    description: 'Juicy 100% Angus beef patty with cheddar, lettuce, tomato, and our secret sauce.',
    price: '$8.50',
    rating: '4.9',
    image: 'https://picsum.photos/seed/burger-classic/169/127',
    category: 'Burgers',
    ingredients: ['Angus Beef Patty', 'Cheddar Cheese', 'Lettuce', 'Tomato', 'Secret Sauce', 'Brioche Bun'],
    customizationOptions: [
      {
        name: 'Ketchup',
        choices: [
          { label: 'Yes', extraPrice: 0 },
          { label: 'No', extraPrice: 0 },
        ],
        defaultChoice: 'Yes',
      },
      {
        name: 'Mustard',
        choices: [
          { label: 'Yes', extraPrice: 0 },
          { label: 'No', extraPrice: 0 },
        ],
        defaultChoice: 'No',
      },
      {
        name: 'Pickles',
        choices: [
          { label: 'Yes', extraPrice: 0 },
          { label: 'No', extraPrice: 0 },
        ],
        defaultChoice: 'Yes',
      },
      {
        name: 'Onions',
        choices: [
          { label: 'Raw', extraPrice: 0 },
          { label: 'Caramelized', extraPrice: 0.50 },
          { label: 'None', extraPrice: 0 },
        ],
        defaultChoice: 'Raw',
      },
    ],
    reviews: [
      { reviewer: 'Sophie R.', date: '2025-03-12', rating: 5, comment: 'Best burger in town! The sauce is incredible.' },
      { reviewer: 'Mike T.', date: '2025-03-08', rating: 4, comment: 'Great burger, but I asked for no onions and they forgot.' },
    ],
  },
  {
    id: '2',
    name: 'Berry Fusion Smoothie',
    description: 'A vibrant mix of blueberries, strawberries, raspberries, and banana – naturally sweet.',
    price: '$7.20',
    rating: '4.8',
    featured: true,
    image: 'https://picsum.photos/seed/berry-fusion/169/127',
    category: 'Smoothies',
    ingredients: ['Blueberries', 'Strawberries', 'Raspberries', 'Banana', 'Almond Milk'],
    customizationOptions: [
      {
        name: 'Sweetness',
        choices: [
          { label: 'Regular', extraPrice: 0 },
          { label: 'Less Sweet', extraPrice: 0 },
          { label: 'Extra Sweet', extraPrice: 0.50 },
        ],
        defaultChoice: 'Regular',
      },
      {
        name: 'Add Chia Seeds',
        choices: [
          { label: 'Yes', extraPrice: 0.75 },
          { label: 'No', extraPrice: 0 },
        ],
        defaultChoice: 'No',
      },
    ],
    reviews: [
      { reviewer: 'Lena K.', date: '2025-03-11', rating: 5, comment: 'Perfect refreshing drink on a hot day.' },
    ],
  },
  {
    id: '3',
    name: 'Tropical Mango Blast',
    description: 'Mango, pineapple, coconut milk, and a squeeze of lime – a taste of the islands.',
    price: '$8.00',
    rating: '4.7',
    image: 'https://picsum.photos/seed/mango-blast/169/127',
    category: 'Smoothies',
    ingredients: ['Mango', 'Pineapple', 'Coconut Milk', 'Lime'],
    customizationOptions: [
      {
        name: 'Add Ginger',
        choices: [
          { label: 'Yes', extraPrice: 0.30 },
          { label: 'No', extraPrice: 0 },
        ],
        defaultChoice: 'No',
      },
      {
        name: 'Extra Coconut Milk',
        choices: [
          { label: 'Regular', extraPrice: 0 },
          { label: 'Extra Creamy', extraPrice: 0.60 },
        ],
        defaultChoice: 'Regular',
      },
    ],
    reviews: [
      { reviewer: 'Carlos M.', date: '2025-03-09', rating: 4, comment: 'Very tasty, but a bit too sweet for my taste.' },
      { reviewer: 'Anna S.', date: '2025-03-04', rating: 5, comment: 'Tastes like a tropical vacation!' },
    ],
  },
  {
    id: '4',
    name: 'Double Bacon Burger',
    description: 'Two beef patties, crispy bacon, pepper jack cheese, caramelized onions, and BBQ sauce.',
    price: '$11.90',
    rating: '4.8',
    image: 'https://picsum.photos/seed/bacon-burger/169/127',
    category: 'Burgers',
    ingredients: ['Two Beef Patties', 'Bacon', 'Pepper Jack Cheese', 'Caramelized Onions', 'BBQ Sauce', 'Brioche Bun'],
    customizationOptions: [
      {
        name: 'Ketchup',
        choices: [
          { label: 'Yes', extraPrice: 0 },
          { label: 'No', extraPrice: 0 },
        ],
        defaultChoice: 'Yes',
      },
      {
        name: 'Extra Bacon',
        choices: [
          { label: 'Yes', extraPrice: 1.50 },
          { label: 'No', extraPrice: 0 },
        ],
        defaultChoice: 'No',
      },
    ],
    reviews: [
      { reviewer: 'Dave H.', date: '2025-03-13', rating: 5, comment: 'Everything I want in a burger – bacon and cheese!' },
      { reviewer: 'Laura B.', date: '2025-03-07', rating: 4, comment: 'Delicious but a bit messy to eat.' },
    ],
  },
  {
    id: '5',
    name: 'Green Detox Juice',
    description: 'Kale, cucumber, celery, green apple, and ginger – a cleansing powerhouse.',
    price: '$6.50',
    rating: '4.6',
    image: 'https://picsum.photos/seed/detox-juice/169/127',
    category: 'Juices',
    ingredients: ['Kale', 'Cucumber', 'Celery', 'Green Apple', 'Ginger'],
    customizationOptions: [
      {
        name: 'Add Lemon',
        choices: [
          { label: 'Yes', extraPrice: 0 },
          { label: 'No', extraPrice: 0 },
        ],
        defaultChoice: 'Yes',
      },
      {
        name: 'Spicy',
        choices: [
          { label: 'Regular', extraPrice: 0 },
          { label: 'Add Cayenne', extraPrice: 0.20 },
        ],
        defaultChoice: 'Regular',
      },
    ],
    reviews: [
      { reviewer: 'Rachel G.', date: '2025-03-06', rating: 5, comment: 'Really wakes you up! Perfect for a morning cleanse.' },
    ],
  },
  {
    id: '6',
    name: 'Veggie Delight Burger',
    description: 'A plant-based patty with roasted peppers, avocado, sprouts, and tahini dressing.',
    price: '$10.20',
    rating: '4.7',
    image: 'https://picsum.photos/seed/veggie-burger/169/127',
    category: 'Burgers',
    ingredients: ['Plant-Based Patty', 'Roasted Peppers', 'Avocado', 'Sprouts', 'Tahini Dressing', 'Whole Wheat Bun'],
    customizationOptions: [
      {
        name: 'Ketchup',
        choices: [
          { label: 'Yes', extraPrice: 0 },
          { label: 'No', extraPrice: 0 },
        ],
        defaultChoice: 'No',
      },
      {
        name: 'Add Cheese (Vegan)',
        choices: [
          { label: 'Yes', extraPrice: 1.00 },
          { label: 'No', extraPrice: 0 },
        ],
        defaultChoice: 'Yes',
      },
    ],
    reviews: [
      { reviewer: 'Priya N.', date: '2025-03-10', rating: 5, comment: 'Best veggie burger I’ve ever had! The tahini is genius.' },
    ],
  },
  {
    id: '7',
    name: 'Strawberry Lemonade',
    description: 'Fresh strawberries, lemon juice, sparkling water, and a touch of honey.',
    price: '$5.90',
    rating: '4.5',
    image: 'https://picsum.photos/seed/strawberry-lemonade/169/127',
    category: 'Drinks',
    ingredients: ['Strawberries', 'Lemon Juice', 'Sparkling Water', 'Honey'],
    customizationOptions: [
      {
        name: 'Sweetness',
        choices: [
          { label: 'Regular', extraPrice: 0 },
          { label: 'Less Sweet', extraPrice: 0 },
          { label: 'Extra Sweet', extraPrice: 0.50 },
        ],
        defaultChoice: 'Regular',
      },
      {
        name: 'Add Mint',
        choices: [
          { label: 'Yes', extraPrice: 0 },
          { label: 'No', extraPrice: 0 },
        ],
        defaultChoice: 'Yes',
      },
    ],
    reviews: [
      { reviewer: 'Oliver P.', date: '2025-03-05', rating: 4, comment: 'Very refreshing, but a bit too sweet for me.' },
    ],
  },
  {
    id: '8',
    name: 'Spicy Chicken Burger',
    description: 'Crispy chicken breast, spicy mayo, jalapeños, pepper jack, and coleslaw.',
    price: '$9.80',
    rating: '4.6',
    image: 'https://picsum.photos/seed/chicken-burger/169/127',
    category: 'Burgers',
    ingredients: ['Crispy Chicken Breast', 'Spicy Mayo', 'Jalapeños', 'Pepper Jack Cheese', 'Coleslaw', 'Brioche Bun'],
    customizationOptions: [
      {
        name: 'Ketchup',
        choices: [
          { label: 'Yes', extraPrice: 0 },
          { label: 'No', extraPrice: 0 },
        ],
        defaultChoice: 'No',
      },
      {
        name: 'Extra Spicy',
        choices: [
          { label: 'Regular', extraPrice: 0 },
          { label: 'Extra Hot', extraPrice: 0.50 },
        ],
        defaultChoice: 'Regular',
      },
    ],
    reviews: [
      { reviewer: 'Sam K.', date: '2025-03-08', rating: 5, comment: 'Great kick! Exactly what I wanted.' },
    ],
  },
  {
    id: '9',
    name: 'Peach Iced Tea',
    description: 'Brewed black tea, peach puree, and a hint of mint – refreshing and light.',
    price: '$4.50',
    rating: '4.4',
    image: 'https://picsum.photos/seed/peach-tea/169/127',
    category: 'Drinks',
    ingredients: ['Black Tea', 'Peach Puree', 'Mint'],
    customizationOptions: [
      {
        name: 'Sweetness',
        choices: [
          { label: 'Unsweetened', extraPrice: 0 },
          { label: 'Regular', extraPrice: 0 },
          { label: 'Extra Sweet', extraPrice: 0.30 },
        ],
        defaultChoice: 'Regular',
      },
    ],
    reviews: [],
  },
  {
    id: '10',
    name: 'Crispy Chicken Tenders',
    description: 'Hand-breaded chicken tenders, served with honey mustard or BBQ sauce.',
    price: '$7.50',
    rating: '4.5',
    image: 'https://picsum.photos/seed/chicken-tenders/169/127',
    category: 'Snacks',
    ingredients: ['Chicken Breast', 'Breading', 'Honey Mustard Sauce', 'BBQ Sauce'],
    customizationOptions: [
      {
        name: 'Sauce',
        choices: [
          { label: 'Honey Mustard', extraPrice: 0 },
          { label: 'BBQ', extraPrice: 0 },
          { label: 'Both', extraPrice: 0.75 },
        ],
        defaultChoice: 'Both',
      },
      {
        name: 'Extra Crispy',
        choices: [
          { label: 'Regular', extraPrice: 0 },
          { label: 'Extra Fried', extraPrice: 0.40 },
        ],
        defaultChoice: 'Regular',
      },
    ],
    reviews: [
      { reviewer: 'Tina R.', date: '2025-03-09', rating: 4, comment: 'Crispy and juicy! Sauce is tasty.' },
    ],
  },
  {
    id: '11',
    name: 'Avocado Toast',
    description: 'Smashed avocado on sourdough, topped with cherry tomatoes, radish, and sea salt.',
    price: '$6.80',
    rating: '4.7',
    image: 'https://picsum.photos/seed/avocado-toast/169/127',
    category: 'Snacks',
    ingredients: ['Sourdough Bread', 'Avocado', 'Cherry Tomatoes', 'Radish', 'Sea Salt'],
    customizationOptions: [
      {
        name: 'Add Egg',
        choices: [
          { label: 'None', extraPrice: 0 },
          { label: 'Poached', extraPrice: 1.50 },
          { label: 'Scrambled', extraPrice: 1.20 },
        ],
        defaultChoice: 'None',
      },
      {
        name: 'Add Chili Flakes',
        choices: [
          { label: 'Yes', extraPrice: 0 },
          { label: 'No', extraPrice: 0 },
        ],
        defaultChoice: 'No',
      },
    ],
    reviews: [
      { reviewer: 'Lucy M.', date: '2025-03-11', rating: 5, comment: 'Perfect brunch treat! The radish adds a nice crunch.' },
    ],
  },
  {
    id: '12',
    name: 'Caramel Latte',
    description: 'Smooth espresso, steamed milk, and house-made caramel syrup – a cozy treat.',
    price: '$5.20',
    rating: '4.6',
    image: 'https://picsum.photos/seed/caramel-latte/169/127',
    category: 'Drinks',
    ingredients: ['Espresso', 'Steamed Milk', 'Caramel Syrup'],
    customizationOptions: [
      {
        name: 'Milk Type',
        choices: [
          { label: 'Whole', extraPrice: 0 },
          { label: 'Oat', extraPrice: 0.50 },
          { label: 'Almond', extraPrice: 0.50 },
          { label: 'Soy', extraPrice: 0.50 },
        ],
        defaultChoice: 'Whole',
      },
      {
        name: 'Extra Caramel',
        choices: [
          { label: 'Yes', extraPrice: 0.40 },
          { label: 'No', extraPrice: 0 },
        ],
        defaultChoice: 'No',
      },
    ],
    reviews: [
      { reviewer: 'Nora S.', date: '2025-03-07', rating: 5, comment: 'Better than any coffee shop! Rich and smooth.' },
    ],
  },
  {
    id: '13',
    name: 'Sweet Potato Fries',
    description: 'Crispy sweet potato fries with chipotle aioli dipping sauce.',
    price: '$4.90',
    rating: '4.3',
    image: 'https://picsum.photos/seed/sweet-potato-fries/169/127',
    category: 'Snacks',
    ingredients: ['Sweet Potatoes', 'Oil', 'Salt', 'Chipotle Aioli'],
    customizationOptions: [
      {
        name: 'Seasoning',
        choices: [
          { label: 'Regular Salt', extraPrice: 0 },
          { label: 'Cajun', extraPrice: 0.20 },
          { label: 'Garlic Herb', extraPrice: 0.20 },
        ],
        defaultChoice: 'Regular Salt',
      },
      {
        name: 'Extra Crispy',
        choices: [
          { label: 'Regular', extraPrice: 0 },
          { label: 'Extra Fried', extraPrice: 0.40 },
        ],
        defaultChoice: 'Regular',
      },
    ],
    reviews: [
      { reviewer: 'Mark D.', date: '2025-03-04', rating: 4, comment: 'Nice and crispy, but a bit oily.' },
    ],
  },
  {
    id: '14',
    name: 'Mushroom Swiss Burger',
    description: 'Grilled mushrooms, Swiss cheese, and truffle aioli on a brioche bun.',
    price: '$10.50',
    rating: '4.8',
    image: 'https://picsum.photos/seed/mushroom-swiss/169/127',
    category: 'Burgers',
    ingredients: ['Beef Patty', 'Mushrooms', 'Swiss Cheese', 'Truffle Aioli', 'Brioche Bun'],
    customizationOptions: [
      {
        name: 'Ketchup',
        choices: [
          { label: 'Yes', extraPrice: 0 },
          { label: 'No', extraPrice: 0 },
        ],
        defaultChoice: 'No',
      },
      {
        name: 'Add Bacon',
        choices: [
          { label: 'Yes', extraPrice: 1.50 },
          { label: 'No', extraPrice: 0 },
        ],
        defaultChoice: 'No',
      },
    ],
    reviews: [
      { reviewer: 'Emily C.', date: '2025-03-12', rating: 5, comment: 'The truffle aioli is divine! Perfect burger.' },
    ],
  },
  {
    id: '15',
    name: 'Watermelon Cooler',
    description: 'Fresh watermelon, mint, and a splash of lime – perfect for hot days.',
    price: '$6.00',
    rating: '4.6',
    image: 'https://picsum.photos/seed/watermelon-cooler/169/127',
    category: 'Drinks',
    ingredients: ['Watermelon', 'Mint', 'Lime'],
    customizationOptions: [
      {
        name: 'Add Sparkling',
        choices: [
          { label: 'Still', extraPrice: 0 },
          { label: 'Sparkling', extraPrice: 0 },
        ],
        defaultChoice: 'Sparkling',
      },
      {
        name: 'Sweetness',
        choices: [
          { label: 'Regular', extraPrice: 0 },
          { label: 'Less Sweet', extraPrice: 0 },
        ],
        defaultChoice: 'Regular',
      },
    ],
    reviews: [],
  },
  {
    id: '16',
    name: 'Chocolate Peanut Butter Shake',
    description: 'Creamy chocolate and peanut butter blended with ice cream and milk.',
    price: '$7.80',
    rating: '4.9',
    image: 'https://picsum.photos/seed/chocolate-peanut/169/127',
    category: 'Smoothies',
    ingredients: ['Chocolate Ice Cream', 'Peanut Butter', 'Milk', 'Chocolate Syrup'],
    customizationOptions: [
      {
        name: 'Add Whipped Cream',
        choices: [
          { label: 'Yes', extraPrice: 0.50 },
          { label: 'No', extraPrice: 0 },
        ],
        defaultChoice: 'Yes',
      },
      {
        name: 'Extra Peanut Butter',
        choices: [
          { label: 'Regular', extraPrice: 0 },
          { label: 'Extra', extraPrice: 0.70 },
        ],
        defaultChoice: 'Regular',
      },
    ],
    reviews: [
      { reviewer: 'Derek J.', date: '2025-03-14', rating: 5, comment: 'Heaven in a glass! Rich and creamy.' },
    ],
  },
  {
    id: '17',
    name: 'Onion Rings',
    description: 'Thick-cut onion rings, battered and fried until golden, with ranch dip.',
    price: '$5.50',
    rating: '4.4',
    image: 'https://picsum.photos/seed/onion-rings/169/127',
    category: 'Snacks',
    ingredients: ['Onions', 'Batter', 'Ranch Dip'],
    customizationOptions: [
      {
        name: 'Dip',
        choices: [
          { label: 'Ranch', extraPrice: 0 },
          { label: 'BBQ', extraPrice: 0 },
          { label: 'Honey Mustard', extraPrice: 0 },
        ],
        defaultChoice: 'Ranch',
      },
      {
        name: 'Extra Crispy',
        choices: [
          { label: 'Regular', extraPrice: 0 },
          { label: 'Extra Fried', extraPrice: 0.40 },
        ],
        defaultChoice: 'Regular',
      },
    ],
    reviews: [
      { reviewer: 'Alex F.', date: '2025-03-03', rating: 4, comment: 'Very crispy, but the batter could be more seasoned.' },
    ],
  },
  {
    id: '18',
    name: 'Vegan Burrito Bowl',
    description: 'Brown rice, black beans, corn salsa, guacamole, and spicy tofu.',
    price: '$9.20',
    rating: '4.5',
    image: 'https://picsum.photos/seed/burrito-bowl/169/127',
    category: 'Bowls',
    ingredients: ['Brown Rice', 'Black Beans', 'Corn Salsa', 'Guacamole', 'Spicy Tofu'],
    customizationOptions: [
      {
        name: 'Extra Guac',
        choices: [
          { label: 'Regular', extraPrice: 0 },
          { label: 'Extra', extraPrice: 1.00 },
        ],
        defaultChoice: 'Regular',
      },
      {
        name: 'Add Sour Cream (Vegan)',
        choices: [
          { label: 'Yes', extraPrice: 0.70 },
          { label: 'No', extraPrice: 0 },
        ],
        defaultChoice: 'Yes',
      },
    ],
    reviews: [
      { reviewer: 'Maya H.', date: '2025-03-06', rating: 5, comment: 'So fresh and filling! Love the tofu spice.' },
    ],
  },
  {
    id: '19',
    name: 'Pineapple Coconut Smoothie',
    description: 'Pineapple, coconut cream, and a hint of vanilla – like a tropical getaway.',
    price: '$7.00',
    rating: '4.7',
    image: 'https://picsum.photos/seed/pineapple-coconut/169/127',
    category: 'Smoothies',
    ingredients: ['Pineapple', 'Coconut Cream', 'Vanilla Extract', 'Coconut Water'],
    customizationOptions: [
      {
        name: 'Add Banana',
        choices: [
          { label: 'Yes', extraPrice: 0.50 },
          { label: 'No', extraPrice: 0 },
        ],
        defaultChoice: 'Yes',
      },
      {
        name: 'Sweetness',
        choices: [
          { label: 'Regular', extraPrice: 0 },
          { label: 'Less Sweet', extraPrice: 0 },
        ],
        defaultChoice: 'Regular',
      },
    ],
    reviews: [
      { reviewer: 'Julia N.', date: '2025-03-08', rating: 4, comment: 'Delicious, but a bit too thick.' },
    ],
  },
];

// Helper: get the first featured product
export const getFeaturedProduct = (): Product | undefined => {
  return allProducts.find((p) => p.featured);
};

// Helper: get all non‑featured products
export const getGridProducts = (): Product[] => {
  return allProducts.filter((p) => !p.featured);
};

export const computeTotalPrice = (
  product: Product,
  selections: Record<string, string>
): string => {
  const basePrice = parseFloat(product.price.replace('$', ''));
  let extraTotal = 0;

  if (product.customizationOptions) {
    for (const option of product.customizationOptions) {
      const selectedLabel = selections[option.name];
      if (selectedLabel) {
        const found = option.choices.find((c) => c.label === selectedLabel);
        if (found) extraTotal += found.extraPrice;
      }
    }
  }

  return `$${(basePrice + extraTotal).toFixed(2)}`;
};