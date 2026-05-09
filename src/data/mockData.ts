export interface Customer {
  id: string;
  name: string;
  loyaltyTier: 'Bronze' | 'Silver' | 'Gold' | 'Platinum';
  joinDate: string;
  favoriteItem: string;
  totalSpent: number;
}

export interface Order {
  id: string;
  customerId: string;
  date: string;
  amount: number;
  items: string[];
  appliedPromotion: string | null;
}

const classicNames = [
  'James', 'Mary', 'John', 'Patricia', 'Robert', 'Jennifer', 'Michael', 'Linda', 'William', 'Elizabeth',
  'David', 'Barbara', 'Richard', 'Susan', 'Joseph', 'Jessica', 'Thomas', 'Sarah', 'Charles', 'Karen',
  'Christopher', 'Nancy', 'Daniel', 'Lisa', 'Matthew', 'Betty', 'Anthony', 'Margaret', 'Mark', 'Sandra',
  'Donald', 'Ashley', 'Steven', 'Kimberly', 'Paul', 'Emily', 'Andrew', 'Donna', 'Joshua', 'Michelle',
  'Kenneth', 'Dorothy', 'Kevin', 'Carol', 'Brian', 'Amanda', 'George', 'Melissa', 'Edward', 'Deborah'
];

const menuItems = [
  'Classic Cheeseburger', 'Double Diner Burger', 'Bacon Smashburger',
  'Vanilla Milkshake', 'Chocolate Malt', 'Strawberry Shake',
  'Chili Cheese Fries', 'Onion Rings', 'Curly Fries',
  'Cherry Pie', 'Apple Pie', 'Banana Split',
  'Route 66 Hot Dog', 'Pancakes Stack', 'Eggs Bacon Hash'
];

const promotions = [
  null, null, null, // higher chance of no promo
  'Summer Shake Sale',
  'Burger Mania',
  'Midnight Diner Special',
  'Weekend Family Combo',
  'Route 66 Anniversary'
];

const tiers = ['Bronze', 'Silver', 'Gold', 'Platinum'];

// Deterministic PRNG to prevent hydration errors between server and client
let seed = 42;
function random() {
  const x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
}

const NOW = new Date('2024-05-01T12:00:00Z').getTime();

export const customers: Customer[] = classicNames.map((name, index) => {
  const joinDate = new Date(NOW - Math.floor(random() * 1000 * 60 * 60 * 24 * 365 * 3));
  return {
    id: `CUST-${(index + 1).toString().padStart(4, '0')}`,
    name,
    loyaltyTier: tiers[Math.floor(random() * tiers.length)] as Customer['loyaltyTier'],
    joinDate: joinDate.toISOString().split('T')[0],
    favoriteItem: menuItems[Math.floor(random() * menuItems.length)],
    totalSpent: parseFloat((random() * 500 + 50).toFixed(2)),
  };
});

export const orders: Order[] = Array.from({ length: 1000 }).map((_, index) => {
  const customer = customers[Math.floor(random() * customers.length)];
  const customerJoinTime = new Date(customer.joinDate).getTime();
  const orderDate = new Date(customerJoinTime + random() * (NOW - customerJoinTime));
  const numItems = Math.floor(random() * 4) + 1;
  const items = Array.from({ length: numItems }).map(() => menuItems[Math.floor(random() * menuItems.length)]);
  
  return {
    id: `ORD-${(index + 1).toString().padStart(5, '0')}`,
    customerId: customer.id,
    date: orderDate.toISOString().split('T')[0],
    amount: parseFloat((random() * 40 + 10).toFixed(2)),
    items,
    appliedPromotion: promotions[Math.floor(random() * promotions.length)]
  };
});
