import { collection, getDocs } from "firebase/firestore";
import { createContext, ReactNode } from "react";
import { database } from "../services/firebase";

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
      }
    | undefined
  >;
};

type AdminContextProviderProps = {
  children: ReactNode;
};

export const AdminContext = createContext({} as AdminContextType);

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

      allOrders.map((item: any) =>
        item.cart.map((i: any) => {
          yearTotal += i.price;
          if (String(actualMonth) == i.buyed_at.split("-")[1]) {
            monthTotal += i.price;
            monthTotalCount++;
          }
          if (String(actualYear) == i.buyed_at.split("-")[0]) {
            yearTotalCount++;
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

      return { yearTotal, monthTotal, data, yearTotalCount, monthTotalCount };
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <AdminContext.Provider value={{ getMothValues }}>
      {props.children}
    </AdminContext.Provider>
  );
}
