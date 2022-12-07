import { createContext, ReactNode, useEffect, useState } from "react";
import {
  collection,
  deleteDoc,
  deleteField,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { auth, database } from "../services/firebase";
import { useAuth } from "../hook/useAuth";
import { calculate_shipping } from "../utils/calculateFrete";

export type Product = {
  name: string;
  category: string;
  product_image: string;
  price: number;
  quantity: number;
  total_quantity: number;
  description: any[];
  id: string;
  weight: number;
  buyed_at?: string;
  status: string;
  orderID: string;
  uid: string;
};

type ProductContextType = {
  getProductsByCategory: (category: string | undefined) => Promise<Product[]>;
  getAllProducts: () => Promise<Product[]>;
  product: Product;
  totalCartValue: number;
  frete: number;
  recentItems: Product[];
  addItemsToRecents: (item: Product) => void;
  setProduct: React.Dispatch<React.SetStateAction<Product>>;
  cart: Product[];
  setCartToStorage: (product: Product) => void;
  decreaseItemCartQuantity: (product: Product) => void;
  increaseItemCartQuantity: (product: Product) => void;
  deleteItem: (id: string) => void;
  removeItemFromCart: (product: Product) => void;
  getProduct: (id: string) => Promise<Product>;
  setTotalCartValue: React.Dispatch<React.SetStateAction<number>>;
  updateProduct: (
    id: string,
    name?: string,
    category?: string,
    price?: number,
    quantity?: number,
    description?: any[]
  ) => Promise<boolean>;
  freteDate: string;
  finishCheckout: (created_at: string, orderID: string) => Promise<boolean>;
};

type ProductContextProviderProps = {
  children: ReactNode;
};

export const ProductContext = createContext({} as ProductContextType);

export function ProductContextProvider(props: ProductContextProviderProps) {
  const { user } = useAuth();
  const [product, setProduct] = useState<Product>({} as Product);
  const [recentItems, setRecentItems] = useState<Product[]>([] as Product[]);
  const [totalCartValue, setTotalCartValue] = useState(0);
  const [frete, setFrete] = useState(0);
  const [freteDate, setFreteDate] = useState("");

  const [cart, setCart] = useState<Product[]>([]);
  const [change, setChange] = useState(false);
  const cartStorageKey = `cart-${user?.id}`;
  const freteStorageKey = `frete-${user?.id}`;
  const freteDateStorageKey = `freteDate-${user?.id}`;
  const recentStorageKey = `recent-${user?.id}`;

  useEffect(() => {
    const cartStorage = localStorage.getItem(cartStorageKey);
    const freteStorage = localStorage.getItem(freteStorageKey);
    const freteStorageDate = localStorage.getItem(freteDateStorageKey);

    if (cartStorage) {
      const c: Product[] = JSON.parse(cartStorage ?? "[]");
      let total = 0;
      c.map((item) => (total += item.price * item.quantity));
      setCart(c);
      const f = JSON.parse(freteStorage ?? "0");
      const fd = JSON.parse(freteStorageDate ?? "0");
      setFrete(f);
      setTotalCartValue(total);
      setFreteDate(fd);
    }
  }, [cartStorageKey, freteDateStorageKey, freteStorageKey]);

  useEffect(() => {
    let total = 0;
    cart.map((item) => (total += item.price * item.quantity));

    setTotalCartValue(total);
    localStorage.setItem(cartStorageKey, JSON.stringify(cart));
  }, [cart, cartStorageKey, change]);

  useEffect(() => {
    const recentStorage = localStorage.getItem(recentStorageKey);

    if (recentStorage) {
      const c: Product[] = JSON.parse(recentStorage ?? "[]");
      setRecentItems(c);
    }
  }, [recentStorageKey]);

  function addItemsToRecents(product: Product) {
    const products = recentItems;
    const containID = products.findIndex((item) => item.name === product.name);

    if (containID === -1) {
      if (products.length >= 3) {
        products.pop();
      }
      products.unshift(product);
      localStorage.setItem(recentStorageKey, JSON.stringify(products));

      setRecentItems(products);
    }
  }

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
        cartCopy = cartCopy.filter(
          (item) => item.name !== cartCopy[containID].name
        );
      }
      setCart(cartCopy);
      setChange((state) => !state);
    }
  }
  function increaseItemCartQuantity(product: Product) {
    const containID = cart.findIndex((item) => item.name === product.name);

    if (containID !== -1) {
      if (product.quantity < product.total_quantity) {
        const cartCopy = cart;
        cartCopy[containID].quantity++;
        setCart(cartCopy);
        setChange((state) => !state);
      }
    }
  }

  function randomDate() {
    const now = new Date();
    const other = new Date();

    other.setDate(other.getDate() + 2 * 7);

    return new Date(
      now.getTime() + Math.random() * (other.getTime() - now.getTime())
    );
  }

  function setCartToStorage(product: Product) {
    const containID = cart.findIndex((item) => item.name === product.name);

    if (containID !== -1) {
      const cartCopy = cart;
      if (cartCopy[containID].quantity < product.quantity) {
        cartCopy[containID].quantity++;

        setCart(cartCopy);
        setChange((state) => !state);
      }
    } else {
      setCart((state) => {
        const { cost } = calculate_shipping(
          Math.floor(Math.random() * 10) + 5,
          Math.floor(Math.random() * 5)
        );

        if (!localStorage.getItem(freteStorageKey)) {
          setFrete(Number(cost));
          localStorage.setItem(freteStorageKey, JSON.stringify(Number(cost)));
        }

        if (!localStorage.getItem(freteDateStorageKey)) {
          const partida = randomDate().toLocaleDateString();
          setFreteDate(partida);
          localStorage.setItem(freteDateStorageKey, JSON.stringify(partida));
        }

        return [
          ...state,
          { ...product, quantity: 1, total_quantity: product.quantity },
        ];
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
  async function getAllProducts() {
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

    return array;
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

  async function getProduct(id: string) {
    const docRef = doc(database, "products", id);
    const docSnap = await getDoc(docRef);
    let data: any = docSnap.data();

    if (docSnap.exists()) {
      return data;
    } else {
      console.log("No such document!");
    }
  }

  async function updateProduct(
    id: string,
    name?: string,
    category?: string,
    price?: number,
    quantity?: number,
    description?: any[]
  ) {
    try {
      await setDoc(
        doc(database, "products", id),
        {
          name,
          category,
          price,
          quantity,
          description,
        },
        { merge: true }
      );
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  async function finishCheckout(buyed_at: string, orderID: string) {
    const u = auth.currentUser as any;

    try {
      const docRef = doc(database, "orders", u.uid);
      const docSnap: any = await getDoc(docRef);
      const DBCART: Product[] = docSnap.data()?.cart;
      let cartCopy: any = cart;
      cartCopy = cartCopy.map((item: any) => {
        return {
          ...item,
          buyed_at,
          orderID,
          status: "Pedido pago",
          uid: u.uid,
        };
      });

      if (DBCART) {
        await setDoc(
          doc(database, "orders", u.uid),
          {
            cart: DBCART.concat(cartCopy),
          },
          { merge: true }
        );
      } else {
        await setDoc(
          doc(database, "orders", u.uid),
          {
            cart: cartCopy,
          },
          { merge: true }
        );
      }

      const querySnapshot = await getDocs(collection(database, "products"));

      querySnapshot.forEach(async (item: any) => {
        const index = cart.findIndex((r) => r.name === item.data().name);

        if (index > -1) {
          await setDoc(
            doc(database, "products", item.id),
            {
              quantity: item.data().quantity - cart[index].quantity,
            },
            { merge: true }
          );
        }
      });

      setCart([]);
      return true;
    } catch (err) {
      console.log(err);
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
        getProduct,
        updateProduct,
        getAllProducts,
        recentItems,
        addItemsToRecents,
        freteDate,
        finishCheckout,
      }}
    >
      {props.children}
    </ProductContext.Provider>
  );
}
