import { createContext, ReactNode, useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
  DocumentData,
} from "firebase/firestore";
import { database } from "../services/firebase";

export type Product = {
  name: String;
  category: string;
  product_image: string;
  price: string;
  quantity: number;
  description: string;
  id: string;
};

type ProductContextType = {
  getProductsByCategory: (category: string | undefined) => Promise<Product[]>;
};

type ProductContextProviderProps = {
  children: ReactNode;
};

export const ProductContext = createContext({} as ProductContextType);

export function ProductContextProvider(props: ProductContextProviderProps) {
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
  return (
    <ProductContext.Provider value={{ getProductsByCategory }}>
      {props.children}
    </ProductContext.Provider>
  );
}
