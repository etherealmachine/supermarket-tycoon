import React from 'react';
import { produce } from 'immer';

let undoStack = [] as string[];

function modify(options?: { undoable: boolean }) {
  return function (
    state: State,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const modifierFn = descriptor.value;
    descriptor.value = function () {
      const args = Array.from(arguments);
      (this as any).setState(produce(this, (newState: State) => {
        const prev = JSON.stringify(newState);
        modifierFn.bind(newState)(...args);
        const curr = JSON.stringify(newState);
        if (options && options.undoable && (undoStack.length === 0 || undoStack[undoStack.length - 1] !== prev) && curr !== prev) {
          undoStack.push(prev);
          if (undoStack.length > 100) undoStack.splice(0, undoStack.length - 100);
        }
        if (newState.hasOwnProperty('notifyChange')) {
          newState.notifyChange();
        }
      }));
    };
  };
}

export interface CartItem {
  dept: string
  price: number
  coupon: boolean
  sale: boolean
}

export interface Customer {
  name: string
  coupons: number
  bonus?: number
  penalty: number
  cartSize: number
  impulseBuy?: CartItem
  cart: CartItem[]
  demand: { [key: string]: number[] }
  visible?: boolean
  shopping?: boolean
  roll?: number
}

const initialCustomers: () => Customer[] = () => [
  {
    name: 'Regina',
    coupons: 1,
    penalty: 4,
    cartSize: 3,
    cart: [],
    demand: {
      frozen: [2, 3, 4],
      dairy: [5, 6],
      produce: [7],
      bakery: [8, 9],
      dryGoods: [10, 11, 12],
    },
  },
  {
    name: 'Ryan',
    coupons: 1,
    penalty: 2,
    cartSize: 2,
    cart: [],
    demand: {
      frozen: [6, 7, 8],
      dairy: [4, 5],
      produce: [2, 3],
      bakery: [11, 12],
      dryGoods: [9, 10],
    },
  },
  {
    name: 'Rory',
    coupons: 0,
    penalty: 4,
    cartSize: 1,
    cart: [],
    demand: {
      frozen: [],
      dairy: [6, 7, 8],
      produce: [9, 10, 11, 12],
      bakery: [],
      dryGoods: [2, 3, 4, 5],
    },
  },
  {
    name: 'Dave',
    coupons: 2,
    bonus: 8,
    penalty: 12,
    cartSize: 4,
    cart: [],
    demand: {
      frozen: [11, 12],
      dairy: [7],
      produce: [2, 3, 4],
      bakery: [5, 6],
      dryGoods: [8, 9, 10],
    },
  },
  {
    name: 'Lesley',
    coupons: 0,
    penalty: 5,
    cartSize: 3,
    cart: [],
    demand: {
      frozen: [12],
      dairy: [3, 4, 5],
      produce: [6, 7, 8],
      bakery: [9, 10, 11],
      dryGoods: [2],
    },
  },
  {
    name: 'Mo',
    coupons: 0,
    penalty: 3,
    cartSize: 1,
    cart: [],
    demand: {
      frozen: [],
      dairy: [2, 3],
      produce: [4, 5, 6, 7],
      bakery: [8, 9, 10],
      dryGoods: [11, 12],
    },
  },
  {
    name: 'Amanda',
    coupons: 0,
    penalty: 5,
    cartSize: 3,
    cart: [],
    demand: {
      frozen: [4, 5, 6],
      dairy: [],
      produce: [2, 3],
      bakery: [10, 11, 12],
      dryGoods: [7, 8, 9],
    },
  },
  {
    name: 'Scott',
    coupons: 0,
    penalty: 6,
    cartSize: 2,
    cart: [],
    demand: {
      frozen: [],
      dairy: [7, 8, 9, 10, 11],
      produce: [3, 4, 5, 6],
      bakery: [2],
      dryGoods: [12],
    },
  },
  {
    name: 'Wendell',
    coupons: 0,
    penalty: 5,
    cartSize: 1,
    cart: [],
    demand: {
      frozen: [2, 3, 4, 5],
      dairy: [9, 10, 11, 12],
      produce: [8],
      bakery: [7],
      dryGoods: [6],
    },
  },
  {
    name: 'Diane',
    coupons: 0,
    penalty: 7,
    cartSize: 4,
    cart: [],
    demand: {
      frozen: [11, 12],
      dairy: [2, 3],
      produce: [],
      bakery: [4, 5, 6, 7, 8, 9, 10],
      dryGoods: [],
    },
  },
  {
    name: 'Gary',
    coupons: 2,
    penalty: 7,
    cartSize: 4,
    cart: [],
    demand: {
      frozen: [11, 2],
      dairy: [5, 6],
      produce: [7, 8],
      bakery: [9, 10],
      dryGoods: [2, 3, 4],
    },
  },
  {
    name: 'Margaret',
    coupons: 0,
    penalty: 3,
    cartSize: 2,
    cart: [],
    demand: {
      frozen: [2, 3, 4],
      dairy: [7, 8],
      produce: [5, 6],
      bakery: [9, 10],
      dryGoods: [11, 12],
    },
  },
  {
    name: 'Amy',
    coupons: 0,
    bonus: 10,
    penalty: 15,
    cartSize: 5,
    cart: [],
    demand: {
      frozen: [2, 3, 4],
      dairy: [12],
      produce: [7, 8],
      bakery: [9, 10, 11],
      dryGoods: [5, 6],
    },
  },
  {
    name: 'Tiffany',
    coupons: 1,
    penalty: 3,
    cartSize: 2,
    cart: [],
    demand: {
      frozen: [9, 10, 11, 12],
      dairy: [8],
      produce: [7],
      bakery: [5, 6],
      dryGoods: [2, 3, 4],
    },
  },
  {
    name: 'Chris',
    coupons: 1,
    penalty: 9,
    cartSize: 4,
    cart: [],
    demand: {
      frozen: [11, 12],
      dairy: [2],
      produce: [3, 4, 5, 6],
      bakery: [10],
      dryGoods: [7, 8, 9],
    },
  },
  {
    name: 'George',
    coupons: 1,
    penalty: 8,
    cartSize: 4,
    cart: [],
    demand: {
      frozen: [8, 9, 10, 11, 12],
      dairy: [],
      produce: [],
      bakery: [2, 3, 4, 5, 6, 7],
      dryGoods: [],
    },
  },
  {
    name: 'Mikolaj',
    coupons: 1,
    penalty: 4,
    cartSize: 2,
    cart: [],
    demand: {
      frozen: [10, 11, 12],
      dairy: [2, 3, 4],
      produce: [],
      bakery: [7],
      dryGoods: [5, 6],
    },
  },
  {
    name: 'Rose',
    coupons: 1,
    penalty: 6,
    cartSize: 3,
    cart: [],
    demand: {
      frozen: [6, 7],
      dairy: [5],
      produce: [2, 3, 4],
      bakery: [11, 12],
      dryGoods: [8, 9, 10],
    },
  },
  {
    name: 'Stu',
    coupons: 0,
    penalty: 8,
    cartSize: 2,
    cart: [],
    demand: {
      frozen: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      dairy: [],
      produce: [],
      bakery: [],
      dryGoods: [],
    },
  },
  {
    name: 'Melanie',
    coupons: 0,
    penalty: 5,
    cartSize: 1,
    cart: [],
    demand: {
      frozen: [2, 3],
      dairy: [8, 9, 10],
      produce: [11, 12],
      bakery: [4],
      dryGoods: [5, 6, 7],
    },
  },
  {
    name: 'Phil',
    coupons: 2,
    penalty: 10,
    cartSize: 4,
    cart: [],
    demand: {
      frozen: [],
      dairy: [7, 8, 9],
      produce: [4, 5, 6],
      bakery: [10, 11, 12],
      dryGoods: [2, 3],
    },
  },
  {
    name: 'Zoë',
    coupons: 1,
    bonus: 9,
    penalty: 13,
    cartSize: 5,
    cart: [],
    demand: {
      frozen: [2, 3, 4],
      dairy: [9, 10],
      produce: [11, 12],
      bakery: [5, 6, 7],
      dryGoods: [8],
    },
  },
  {
    name: 'Chad',
    coupons: 1,
    penalty: 6,
    cartSize: 3,
    cart: [],
    demand: {
      frozen: [9],
      dairy: [2, 3],
      produce: [7, 8],
      bakery: [4, 5, 6],
      dryGoods: [10, 11, 12],
    },
  },
  {
    name: 'Albert',
    coupons: 1,
    penalty: 5,
    cartSize: 3,
    cart: [],
    demand: {
      frozen: [11, 12],
      dairy: [8, 9, 10],
      produce: [5, 6],
      bakery: [7],
      dryGoods: [2, 3, 4],
    },
  },
  {
    name: 'Jordan',
    coupons: 0,
    penalty: 8,
    cartSize: 3,
    cart: [],
    demand: {
      frozen: [9],
      dairy: [2, 3, 4],
      produce: [5],
      bakery: [6, 7, 8],
      dryGoods: [10, 11, 12],
    },
  },
  {
    name: 'Martha',
    coupons: 1,
    penalty: 6,
    cartSize: 2,
    cart: [],
    demand: {
      frozen: [10, 11, 12],
      dairy: [8, 9],
      produce: [6, 7],
      bakery: [2, 3, 4, 5],
      dryGoods: [],
    },
  },
  {
    name: 'Jackie',
    coupons: 2,
    penalty: 9,
    cartSize: 4,
    cart: [],
    demand: {
      frozen: [11, 12],
      dairy: [7],
      produce: [4, 5, 6],
      bakery: [2, 3],
      dryGoods: [8, 9, 10],
    },
  },
  {
    name: 'Donna',
    coupons: 0,
    penalty: 8,
    cartSize: 1,
    cart: [],
    demand: {
      frozen: [10, 11, 12],
      dairy: [8, 9],
      produce: [5],
      bakery: [6, 7],
      dryGoods: [2, 3, 4],
    },
  },
  {
    name: 'Clara',
    coupons: 1,
    penalty: 7,
    cartSize: 3,
    cart: [],
    demand: {
      frozen: [8],
      dairy: [5, 6],
      produce: [9, 10, 11, 12],
      bakery: [7],
      dryGoods: [2, 3, 4],
    },
  },
  {
    name: 'Jacob',
    coupons: 1,
    penalty: 8,
    cartSize: 4,
    cart: [],
    demand: {
      frozen: [6, 7],
      dairy: [10, 11, 12],
      produce: [2, 3, 4],
      bakery: [5],
      dryGoods: [8, 9],
    },
  },
];

const initialCosts = () => [
  {
    bakery: 3,
    dairy: 1,
    dryGoods: 3,
    frozen: 3,
    produce: 2,
  },
  {
    bakery: 3,
    dairy: 2,
    dryGoods: 5,
    frozen: 3,
    produce: 1,
  },
  {
    bakery: 1,
    dairy: 2,
    dryGoods: 5,
    frozen: 3,
    produce: 3,
  },
  {
    bakery: 2,
    dairy: 3,
    dryGoods: 3,
    frozen: 4,
    produce: 1,
  },
  {
    bakery: 2,
    dairy: 3,
    dryGoods: 4,
    frozen: 5,
    produce: 1,
  },
  {
    produce: 1,
    bakery: 2,
    dairy: 2,
    dryGoods: 6,
    frozen: 4,
  },
];

export type Stock = { [key: string]: number }

export interface Department {
  price: number
  salePrice: number
  sale: boolean
  stock: Stock
}

const initialDepartments: () => { [key: string]: Department } = () => ({
  bakery: {
    price: 4,
    salePrice: 3,
    sale: false,
    stock: {
      2: 3,
      3: 0,
      4: 0,
      5: 0,
      6: 0,
      never: 0,
    },
  },
  dairy: {
    price: 4,
    salePrice: 2,
    sale: false,
    stock: {
      3: 3,
      4: 0,
      5: 0,
      6: 0,
      never: 0,
    },
  },
  dryGoods: {
    price: 10,
    salePrice: 7,
    sale: false,
    stock: {
      4: 3,
      5: 0,
      6: 0,
      never: 0,
    },
  },
  frozen: {
    price: 7,
    salePrice: 5,
    sale: false,
    stock: {
      never: 3,
    },
  },
  produce: {
    price: 3,
    salePrice: 2,
    sale: false,
    stock: {
      every: 3,
    },
  },
})

export const DeptName: { [key: string]: string } = {
  bakery: 'Bakery',
  dairy: 'Dairy',
  dryGoods: 'Dry Goods',
  frozen: 'Frozen Foods',
  produce: 'Produce',
}

export const Expirations = ['every', '2', '3', '4', '5', '6', 'never'];

function shuffle<T>(array: Array<T>) {
  let i = array.length;
  while (0 !== i) {
    const j = Math.floor(Math.random() * i);
    i -= 1;
    const tmp = array[i];
    array[i] = array[j];
    array[j] = tmp;
  }
}

const probabilities: { [key: string]: number } = {
  2: 2.78,
  3: 5.56,
  4: 8.33,
  5: 11.11,
  6: 13.89,
  7: 16.67,
  8: 13.89,
  9: 11.11,
  10: 8.33,
  11: 5.56,
  12: 2.78,
}

export function probability(demandCurve: number[]) {
  return demandCurve.reduce((sum, roll) => sum + probabilities[roll], 0);
}

const couponOptions: { [key: string]: number[] } = {
  2: [6, 7],
  3: [4, 10],
  4: [5, 9],
  5: [2, 10],
  6: [4, 12],
  7: [3, 8],
  8: [7, 12],
  9: [5, 11],
  10: [6, 11],
  11: [2, 9],
  12: [3, 9],
}

export type DeptKey = keyof ReturnType<typeof initialDepartments>;

export class State {
  setState = (state: any) => { }
  notifyChange = () => { }

  cash: number = 0
  round: number = 0
  phase?: 'purchasing' | 'stocking' | 'shopping1' | 'restocking' | 'shopping2' | 'cleanup' = 'purchasing'
  departments = initialDepartments()
  stockRoom: { [key: string]: Stock } = {}
  customers = initialCustomers()
  costs = initialCosts()
  currentCustomers: Customer[] = []
  currentCustomerIndex?: number
  currentCosts: Stock = {
    bakery: 0,
    dairy: 0,
    dryGoods: 0,
    frozen: 0,
    produce: 0,
  }

  constructor() {
    if (this.cash === 0 && this.round === 0) {
      this.setup();
    }
  }

  @modify()
  setup() {
    this.cash = 15;
    this.round = 0;
    this.phase = 'purchasing';
    this.departments = initialDepartments();
    this.stockRoom = {};
    Object.keys(DeptName).forEach(key => {
      this.stockRoom[key] = {
        every: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        6: 0,
        never: 0,
      };
    });
    this.customers = initialCustomers();
    this.costs = initialCosts();
    shuffle(this.customers);
    shuffle(this.costs);
    this.currentCustomers = [];
    this.currentCosts = {
      bakery: 0,
      dairy: 0,
      dryGoods: 0,
      frozen: 0,
      produce: 0,
    };
    this.currentCustomerIndex = undefined;
    this.prepare();
  }

  @modify()
  prepare() {
    this.round++;
    for (let i = 0; i < 5; i++) {
      const nextCustomer = this.customers.pop();
      if (!nextCustomer) throw new Error('ran out of customers');
      if (i < 2) nextCustomer.visible = true;
      this.currentCustomers.push(nextCustomer);
    }
    const nextCosts = this.costs.pop();
    if (!nextCosts) throw new Error('ran out of costs');
    this.currentCosts = nextCosts;
    this.currentCustomerIndex = undefined;
  }

  @modify({ undoable: true })
  startRestocking(customerIndex: number) {
    this.phase = 'restocking';
    if (this.currentCustomerIndex === undefined) {
      this.currentCustomers.slice(customerIndex, 1);
    } else if (this.currentCustomerIndex === customerIndex) {
      const customer = this.currentCustomers[this.currentCustomerIndex];
      this.cash -= customer.penalty;
      customer.roll = undefined;
      this.currentCustomers[this.currentCustomerIndex].shopping = false;
      this.currentCustomers.splice(this.currentCustomerIndex, 1);
      this.currentCustomerIndex = undefined;
    }
  }

  @modify()
  startCleanup() {
    this.currentCustomers = [];
    this.currentCustomerIndex = undefined;
    Object.values(this.departments).forEach(dept => {
      if (this.round in dept.stock) {
        this.cash -= dept.stock[this.round];
        dept.stock[this.round] = 0;
      }
      if ('every' in dept.stock) {
        this.cash -= dept.stock['every'];
        dept.stock['every'] = 0;
      }
    });
    Object.values(this.stockRoom).forEach(stock => {
      if (this.round in stock) {
        this.cash -= stock[this.round];
        stock[this.round] = 0;
      }
      if ('every' in stock) {
        this.cash -= stock['every'];
        stock['every'] = 0;
      }
    });
  }

  @modify({ undoable: true })
  nextPhase() {
    if (this.phase === undefined) {
      this.phase = 'purchasing';
      this.prepare();
      return;
    } else if (this.phase === 'purchasing') {
      this.phase = 'stocking';
      return;
    } else if (this.phase === 'stocking') {
      this.phase = 'shopping1';
      return;
    } else if (this.phase === 'shopping1' || this.phase === 'shopping2') {
      this.phase = 'cleanup';
      this.startCleanup();
      return;
    } else if (this.phase === 'restocking') {
      this.phase = 'shopping2';
      return;
    } else if (this.phase === 'cleanup') {
      if (this.round === 6) {
        this.phase = undefined;
        return;
      }
      this.phase = 'purchasing';
      this.prepare();
      return;
    }
  }

  @modify({ undoable: true })
  startSale(department: DeptKey) {
    this.departments[department].sale = true;
  }

  @modify({ undoable: true })
  startCustomer(i: number) {
    this.currentCustomers[i].visible = true;
    this.currentCustomers[i].shopping = true;
    this.currentCustomerIndex = i;
    this.advanceCustomer();
  }

  @modify({ undoable: true })
  advanceCustomer() {
    if (this.currentCustomerIndex === undefined) throw new Error('no customer');
    this.currentCustomers[this.currentCustomerIndex].roll = (Math.floor(Math.random() * 6) + 1) + (Math.floor(Math.random() * 6) + 1);
  }

  @modify({ undoable: true })
  finishCustomer() {
    if (this.currentCustomerIndex === undefined) throw new Error('no customer');
    const customer = this.currentCustomers[this.currentCustomerIndex];
    if (customer.bonus) this.cash += customer.bonus;
    customer.shopping = false;
    this.currentCustomers.splice(this.currentCustomerIndex, 1);
    this.currentCustomerIndex = undefined;
  }

  @modify({ undoable: true })
  buyStock(dept: string) {
    this.cash -= this.currentCosts[dept];
    this.stockRoom[dept][this.expiration(dept)]++;
  }

  @modify({ undoable: true })
  moveStock(dept: string) {
    let moved: string | undefined;
    for (let i = 0; i < Expirations.length; i++) {
      const expiry = Expirations[i];
      const inStock = this.stockRoom[dept][expiry];
      if (inStock) {
        this.stockRoom[dept][expiry]--;
        moved = expiry;
        break;
      }
    }
    if (moved) {
      this.departments[dept].stock[moved]++;
    }
  }

  removeOldestItem(dept: string) {
    for (let i = 0; i < Expirations.length; i++) {
      const expiry = Expirations[i];
      const inStock = this.departments[dept].stock[expiry];
      if (inStock) {
        this.departments[dept].stock[expiry]--;
        return true;
      }
    }
    return false;
  }

  @modify({ undoable: true })
  purchase() {
    if (this.currentCustomerIndex === undefined) throw new Error('no customer');
    const customer = this.currentCustomers[this.currentCustomerIndex];
    const roll = customer.roll;
    if (roll === undefined) throw new Error('cannot purchase without roll');
    const inDemand = Object.keys(customer.demand).find(key => customer.demand[key].includes(roll));
    if (inDemand === undefined) throw new Error(`${roll} not found for ${customer.name}`);
    if (this.departments[inDemand].sale) {
      const options = couponOptions[roll];
      const opts = Object.keys(customer.demand).filter(d => options.find(option => customer.demand[d].includes(option)));
      opts.forEach(opt => this.removeOldestItem(opt));
      opts.forEach(opt => customer.cart.push({
        dept: opt,
        price: this.price(opt),
        coupon: false,
        sale: this.departments[opt].sale,
      }));
      opts.forEach(opt => this.cash += this.price(opt));
    }
    this.removeOldestItem(inDemand);
    customer.cart.push({
      dept: inDemand,
      price: this.price(inDemand),
      coupon: false,
      sale: this.departments[inDemand].sale,
    });
    this.cash += this.price(inDemand);
    customer.roll = undefined;
  }

  @modify({ undoable: true })
  purchaseWithCoupon() {
    if (this.currentCustomerIndex === undefined) throw new Error('no customer');
    const customer = this.currentCustomers[this.currentCustomerIndex];
    if (customer.roll === undefined) throw new Error('cannot purchase without roll');
    const options = couponOptions[customer.roll];
    const opts = Object.keys(customer.demand).filter(d => options.find(option => customer.demand[d].includes(option)));
    if (opts[1] === undefined) opts[1] = opts[0];
    opts.forEach(opt => this.removeOldestItem(opt));
    opts.forEach(opt => customer.cart.push({
      dept: opt,
      price: this.price(opt) - 1,
      coupon: true,
      sale: false,
    }));
    opts.forEach(opt => { this.cash += this.price(opt) - 1 });
    customer.coupons--;
    customer.roll = undefined;
  }

  @modify({ undoable: true })
  impulseBuy(dept: string) {
    if (this.currentCustomerIndex === undefined) throw new Error('no customer');
    const customer = this.currentCustomers[this.currentCustomerIndex];
    this.removeOldestItem(dept);
    this.cash += this.price(dept);
    customer.impulseBuy = {
      dept: dept,
      price: this.price(dept),
      coupon: false,
      sale: true,
    };
  }

  @modify({ undoable: true })
  failCustomer() {
    if (this.currentCustomerIndex === undefined) throw new Error('no customer');
    const customer = this.currentCustomers[this.currentCustomerIndex];
    customer.cart.forEach(item => {
      this.cash -= item.price;
    });
    this.cash -= customer.penalty;
    customer.cartSize = 0;
    customer.roll = undefined;
    this.currentCustomers[this.currentCustomerIndex].shopping = false;
    this.currentCustomers.splice(this.currentCustomerIndex, 1);
    this.currentCustomerIndex = undefined;
  }

  @modify()
  undo() {
    if (undoStack.length === 0) return;
    const prev = undoStack.pop();
    if (!prev) return;
    Object.assign(this, JSON.parse(prev));
  }

  canStartCustomer(customer: Customer) {
    return this.cash >= 0 && ['shopping1', 'shopping2'].includes(this.phase || '') && !customer.shopping && this.currentCustomerIndex === undefined;
  }

  canAdvanceCustomer(customer: Customer) {
    return customer.shopping && !customer.roll && customer.cart.length < customer.cartSize;
  }

  canFinishCustomer(customer: Customer) {
    return customer.shopping && !customer.roll && customer.cart.length >= customer.cartSize;
  }

  mustFailCustomer(customer: Customer) {
    return customer.shopping && customer.roll && this.cannotPurchase(customer);
  }

  cannotPurchase(customer: Customer) {
    return Object.keys(DeptName).find(dept => this.canPurchase(customer, dept)) === undefined;
  }

  canPurchase(customer: Customer, dept: string) {
    if (!customer.roll) return false;
    if (!customer.demand[dept].includes(customer.roll)) return false;
    if (!this.hasStock(dept)) return false;
    if (customer.cart.length >= customer.cartSize) return false;
    if (this.departments[dept].sale) {
      const options = couponOptions[customer.roll];
      const [opt1, opt2] = Object.keys(customer.demand).filter(d => options.find(option => customer.demand[d].includes(option)));
      return this.hasStock(opt1) && this.hasStock(opt2);
    }
    return true;
  }

  canPurchaseWithCoupon(customer: Customer, dept: string) {
    if (customer.roll === undefined) return false;
    if (customer.coupons === 0) return false;
    if (customer.cart.length + 2 > customer.cartSize) return false;
    const options = couponOptions[customer.roll];
    const [opt1, opt2] = Object.keys(customer.demand).filter(d => options.find(option => customer.demand[d].includes(option)));
    if (opt2 === undefined) return opt1 === dept && this.hasStock(opt1, 2);
    return (opt1 === dept || opt2 === dept) && this.hasStock(opt1) && this.hasStock(opt2);
  }

  canImpulseBuy(customer: Customer, dept: string) {
    if (!customer.shopping) return false;
    if (!this.departments[dept].sale) return false;
    if (customer.cart.length >= customer.cartSize) return false;
    if (!this.hasStock(dept)) return false;
    if (customer.cart.length > 0) return false;
    if (customer.roll !== undefined) return false;
    return customer.impulseBuy === undefined;
  }

  hasStock(dept: string, count: number = 1) {
    return Object.values(this.departments[dept].stock).reduce((sum, stock) => sum + stock, 0) >= count;
  }

  price(dept: string): number {
    return this.departments[dept].sale ? this.departments[dept].salePrice : this.departments[dept].price;
  }

  inStore(): number {
    return Object.values(this.departments).reduce(
      (sum, dept) => sum + Object.values(dept.stock).reduce(
        (sum, stock) => sum + stock, 0), 0);
  }

  inStockRoom(): number {
    return Object.values(this.stockRoom).reduce(
      (sum, dept) => sum + Object.values(dept).reduce(
        (sum, stock) => sum + stock, 0), 0);
  }

  canBuyStock(dept: string): boolean {
    return this.cash >= this.currentCosts[dept] && this.inStockRoom() < 20;
  }

  canMoveStock(dept: string): boolean {
    return Object.values(this.stockRoom[dept]).reduce((sum, stock) => sum + stock, 0) > 0 && this.inStore() < 15;
  }

  canStartRestocking() {
    return this.cash >= 0 && this.phase === 'shopping1' && (this.currentCustomerIndex === undefined || this.canAdvanceCustomer(this.currentCustomers[this.currentCustomerIndex]));
  }

  canAdvancePhase() {
    return !(['shopping1', 'shopping2'].includes(this.phase || '') && this.currentCustomers.length > 0);
  }

  canUndo() {
    return undoStack.length > 0;
  }

  expiration(type: string): string | number {
    switch (type) {
      case 'produce':
        return 'every';
      case 'bakery':
        return Math.min(6, this.round + 2);
      case 'dairy':
        return Math.min(6, this.round + 3);
      case 'dryGoods':
        return Math.min(6, this.round + 4);
      case 'frozen':
        return 'never';
    }
    return NaN;
  }
}

export const Context = React.createContext(new State());