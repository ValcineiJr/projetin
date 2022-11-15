import { createContext, ReactNode, useEffect, useState } from "react";
import {
  collection,
  deleteDoc,
  deleteField,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { database } from "../services/firebase";
import { useAuth } from "../hook/useAuth";
import { calculate_shipping } from "../utils/calculateFrete";

export type Product = {
  name: string;
  category: string;
  product_image: string;
  price: number;
  quantity: number;
  description: any[];
  id: string;
  weight: number;
};

type ProductContextType = {
  getProductsByCategory: (category: string | undefined) => Promise<Product[]>;
  product: Product;
  totalCartValue: number;
  frete: number;
  setProduct: React.Dispatch<React.SetStateAction<Product>>;
  cart: Product[];
  setCartToStorage: (product: Product) => void;
  decreaseItemCartQuantity: (product: Product) => void;
  increaseItemCartQuantity: (product: Product) => void;
  deleteItem: (id: string) => void;
  removeItemFromCart: (product: Product) => void;
  setTotalCartValue: React.Dispatch<React.SetStateAction<number>>;
};

type ProductContextProviderProps = {
  children: ReactNode;
};

export const ProductContext = createContext({} as ProductContextType);

export function ProductContextProvider(props: ProductContextProviderProps) {
  const { user } = useAuth();
  const [product, setProduct] = useState<Product>({} as Product);
  const [totalCartValue, setTotalCartValue] = useState(0);
  const [frete, setFrete] = useState(0);

  const [cart, setCart] = useState<Product[]>([]);
  const [change, setChange] = useState(false);
  const cartStorageKey = `cart-${user?.id}`;
  const freteStorageKey = `frete-${user?.id}`;

  useEffect(() => {
    const cartStorage = localStorage.getItem(cartStorageKey);
    const freteStorage = localStorage.getItem(freteStorageKey);

    if (cartStorage) {
      const c: Product[] = JSON.parse(cartStorage ?? "[]");
      let total = 0;
      c.map((item) => (total += item.price * item.quantity));
      setCart(c);
      const f = JSON.parse(freteStorage ?? "0");
      setFrete(f);
      setTotalCartValue(total);
    }
  }, [cartStorageKey, freteStorageKey, user]);

  useEffect(() => {
    let total = 0;
    cart.map((item) => (total += item.price * item.quantity));

    setTotalCartValue(total);
    localStorage.setItem(cartStorageKey, JSON.stringify(cart));
  }, [cart, cartStorageKey, change]);

  function removeItemFromCart(product: Product) {
    const containID = cart.findIndex((item) => item.name === product.name);

    if (containID !== -1) {
      let cartCopy = cart;

      cartCopy.splice(containID, 1);

      setCart(cartCopy);
      setChange((state) => !state);
    }
  }

  function decreaseItemCartQuantity(product: Product) {
    const containID = cart.findIndex((item) => item.name === product.name);

    if (containID !== -1) {
      let cartCopy = cart;
      cartCopy[containID].quantity--;

      if (cartCopy[containID].quantity === 0) {
        cartCopy = [];
      }
      setCart(cartCopy);
      setChange((state) => !state);
    }
  }
  function increaseItemCartQuantity(product: Product) {
    const containID = cart.findIndex((item) => item.name === product.name);

    if (containID !== -1) {
      const cartCopy = cart;
      cartCopy[containID].quantity++;
      setCart(cartCopy);
      setChange((state) => !state);
    }
  }

  function setCartToStorage(product: Product) {
    const containID = cart.findIndex((item) => item.name === product.name);

    if (containID !== -1) {
      const cartCopy = cart;

      cartCopy[containID].quantity++;

      setCart(cartCopy);
    } else {
      product.quantity = 1;
      setCart((state) => {
        const { cost } = calculate_shipping(
          Math.floor(Math.random() * 32) + 5,
          Math.floor(Math.random() * 5)
        );
        localStorage.setItem(freteStorageKey, JSON.stringify(Number(cost)));
        setFrete(Number(cost));
        return [...state, product];
      });
    }
  }

  async function getProductsByCategory(category: string | undefined) {
    const querySnapshot = await getDocs(collection(database, "products"));
    const array: Product[] = [];
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots

      const data: any = doc.data();

      array.push(data);

      //   Object.keys(data).forEach(function (key, index) {
      //     console.log(data[key]);
      //   });
    });
    const productsFilter = array.filter((item) => item.category == category);

    return productsFilter;
  }

  async function deleteItem(id: string) {
    const Ref = doc(database, "products", id);

    try {
      await deleteDoc(Ref);
      return true;
    } catch (error) {
      return false;
    }
  }

  return (
    <ProductContext.Provider
      value={{
        getProductsByCategory,
        product,
        setProduct,
        cart,
        setCartToStorage,
        decreaseItemCartQuantity,
        increaseItemCartQuantity,
        removeItemFromCart,
        totalCartValue,
        setTotalCartValue,
        frete,
        deleteItem,
      }}
    >
      {props.children}
    </ProductContext.Provider>
  );
}
