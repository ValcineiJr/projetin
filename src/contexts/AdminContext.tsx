import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { createContext, ReactNode } from "react";
import { database } from "../services/firebase";
import { Product } from "./ProductContext";

type AdminContextType = {
  getMothValues: () => Promise<
    | {
        yearTotal: number;
        monthTotal: number;
        data: {
          name: string;
          "Vendas mensais": number;
        }[];
        yearTotalCount: number;
        monthTotalCount: number;
        yesterdayTotal: number;
        yesterdayCount: number;
        todayTotal: number;
        todayCount: number;
        last5Total: number;
        last5Count: number;
        lastMonthTotal: number;
        lastMonthCount: number;
        rawData: Product[];
      }
    | undefined
  >;
  getOrders: () => Promise<Product[]>;
  updateOrders: (status: string, id: string) => Promise<boolean>;
};

type AdminContextProviderProps = {
  children: ReactNode;
};

export const AdminContext = createContext({} as AdminContextType);

function getPreviousDay(date = new Date()) {
  const previous = new Date(date.getTime());
  previous.setDate(date.getDate() - 1);

  return previous;
}

function isYesterday(date: string) {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  const myValue = new Date(date);

  if (yesterday.toDateString() === myValue.toDateString()) {
    return true;
  }

  return false;
}
function isToday(date: string) {
  const today = new Date();
  const myValue = new Date(date);

  if (today.toDateString() === myValue.toDateString()) {
    return true;
  }

  return false;
}

function dateInRange(days: number, date: string) {
  const d1 = new Date();
  d1.setDate(d1.getDate() - days);

  const d2 = new Date(date);

  const d3 = new Date();

  if (d3.getTime() <= d2.getTime() && d3.getTime() >= d1.getTime()) {
    return true;
  } else {
    return false;
  }
}

function formatDate(date: string) {
  return date.replace(/-/g, "/");
}

export function AdminContextProvider(props: AdminContextProviderProps) {
  async function getMothValues() {
    try {
      const allOrders: any = [];
      const querySnapshot = await getDocs(collection(database, "orders"));
      querySnapshot.forEach((doc) => {
        allOrders.push(doc.data());
      });

      const actualMonth = new Date().getMonth() + 1;
      const actualYear = new Date().getFullYear();

      let JanValue = { name: "Jan", "Vendas mensais": 0 };
      let FevValue = { name: "Fev", "Vendas mensais": 0 };
      let MarValue = { name: "Mai", "Vendas mensais": 0 };
      let AbrValue = { name: "Abr", "Vendas mensais": 0 };
      let MaiValue = { name: "Mai", "Vendas mensais": 0 };
      let JunValue = { name: "Jun", "Vendas mensais": 0 };
      let JulValue = { name: "Jul", "Vendas mensais": 0 };
      let AgoValue = { name: "Ago", "Vendas mensais": 0 };
      let SetValue = { name: "Set", "Vendas mensais": 0 };
      let OutValue = { name: "Out", "Vendas mensais": 0 };
      let NovValue = { name: "Nov", "Vendas mensais": 0 };
      let DezValue = { name: "Dez", "Vendas mensais": 0 };

      let yearTotal = 0;
      let monthTotal = 0;

      let yearTotalCount = 0;
      let monthTotalCount = 0;

      let yesterdayTotal = 0;
      let yesterdayCount = 0;

      let todayTotal = 0;
      let todayCount = 0;

      let last5Total = 0;
      let last5Count = 0;

      let lastMonthTotal = 0;
      let lastMonthCount = 0;

      let rawData: Product[] = [];

      allOrders.map((item: any) =>
        item.cart.map((i: any) => {
          rawData.push(i);
          yearTotal += i.price;
          if (String(actualMonth) == i.buyed_at.split("-")[1]) {
            monthTotal += i.price;
            monthTotalCount++;
          }
          if (String(actualYear) == i.buyed_at.split("-")[0]) {
            yearTotalCount++;
          }
          if (isYesterday(formatDate(i.buyed_at))) {
            yesterdayTotal += i.price;
            yesterdayCount++;
          }
          if (isToday(formatDate(i.buyed_at))) {
            todayTotal += i.price;
            todayCount++;
          }
          if (dateInRange(5, formatDate(i.buyed_at))) {
            last5Total += i.price;
            last5Count++;
          }
          if (dateInRange(31, formatDate(i.buyed_at))) {
            lastMonthTotal += i.price;
            lastMonthCount++;
          }

          if (i.buyed_at.split("-")[1] === "1")
            JanValue["Vendas mensais"] += i.price;
          if (i.buyed_at.split("-")[1] === "2")
            FevValue["Vendas mensais"] += i.price;
          if (i.buyed_at.split("-")[1] === "3")
            MarValue["Vendas mensais"] += i.price;
          if (i.buyed_at.split("-")[1] === "4")
            AbrValue["Vendas mensais"] += i.price;
          if (i.buyed_at.split("-")[1] === "5")
            MaiValue["Vendas mensais"] += i.price;
          if (i.buyed_at.split("-")[1] === "6")
            JunValue["Vendas mensais"] += i.price;
          if (i.buyed_at.split("-")[1] === "7")
            JulValue["Vendas mensais"] += i.price;
          if (i.buyed_at.split("-")[1] === "8")
            AgoValue["Vendas mensais"] += i.price;
          if (i.buyed_at.split("-")[1] === "9")
            SetValue["Vendas mensais"] += i.price;
          if (i.buyed_at.split("-")[1] === "10")
            OutValue["Vendas mensais"] += i.price;
          if (i.buyed_at.split("-")[1] === "11")
            NovValue["Vendas mensais"] += i.price;
          if (i.buyed_at.split("-")[1] === "12")
            DezValue["Vendas mensais"] += i.price;
        })
      );

      const data = [
        JanValue,
        FevValue,
        MarValue,
        AbrValue,
        MaiValue,
        JunValue,
        JulValue,
        AgoValue,
        SetValue,
        OutValue,
        NovValue,
        DezValue,
      ];

      return {
        yearTotal,
        yearTotalCount,
        monthTotal,
        monthTotalCount,
        yesterdayTotal,
        yesterdayCount,
        todayTotal,
        todayCount,
        last5Total,
        last5Count,
        lastMonthTotal,
        lastMonthCount,
        rawData,
        data,
      };
    } catch (error) {
      console.log(error);
    }
  }

  async function getOrders() {
    const allOrders: any = [];
    const finalData: Product[] = [];

    try {
      const querySnapshot = await getDocs(collection(database, "orders"));
      querySnapshot.forEach((doc) => {
        allOrders.push(doc.data());
      });

      allOrders.map((item: any) => {
        return item.cart.map((i: any) => {
          finalData.push(i);
        });
      });

      console.log(finalData);
      return finalData;
    } catch (error) {
      return finalData;
    }
  }

  async function updateOrders(status: string, id: string) {
    try {
      const rawItem: any = await getDoc(doc(database, "orders", id));
      const item: Product = rawItem.data();

      // item.status = status;

      console.log(item);

      // await setDoc(
      //   doc(database, "orders", id),
      //   {
      //     status,
      //   },
      //   { merge: true }
      // );
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }
  return (
    <AdminContext.Provider value={{ getMothValues, getOrders, updateOrders }}>
      {props.children}
    </AdminContext.Provider>
  );
}
