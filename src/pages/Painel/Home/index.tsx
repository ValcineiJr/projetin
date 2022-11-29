import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hook/useAuth";
import { FaBars } from "react-icons/fa";
import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
} from "recharts";

import { Container } from "./styles";
import { useAdmin } from "../../../hook/useAdmin";
import { formatter } from "../../../utils/CurrencyFormatter";
import { Product } from "../../../contexts/ProductContext";

const Painel: React.FC = () => {
  const { user } = useAuth();
  const [visible, setVisible] = useState(false);
  const [infoToshow, setInfoToshow] = useState({
    total: 0,
    value: 0,
    labelTotal: "Total",
    labelValue: "Total",
  });

  const [yearTotal, setYearTotal] = useState(0);
  const [yearTotalCount, setYearTotalCount] = useState(0);

  const [monthTotal, setMonthTotal] = useState(0);
  const [monthTotalCount, setMonthTotalCount] = useState(0);

  const [yesterdayTotal, setYesterdayTotal] = useState(0);
  const [yesterdayTotalCount, setYesterdayTotalCount] = useState(0);

  const [todayTotal, setTodayTotal] = useState(0);
  const [todayTotalCount, setTodayTotalCount] = useState(0);

  const [last5Total, setLast5Total] = useState(0);
  const [last5TotalCount, setLast5TotalCount] = useState(0);

  const [total, setTotal] = useState(0);
  const [count, setCount] = useState(0);

  const [period, setPeriod] = useState("");
  const { getMothValues } = useAdmin();
  const [graphKey, setgraphKey] = useState("0");

  const [data, setData] = useState<any>([]);

  const [date1, setDate1] = useState("2022/01/01");
  const [date2, setDate2] = useState("2022/12/31");

  const [rawData, setRawData] = useState<Product[]>([]);

  function dateInRange(initial: string, middle: string, final: string) {
    const date = new Date(middle);
    const start = new Date(initial);
    const end = new Date(final);

    if (date.getTime() >= start.getTime() && date.getTime() <= end.getTime()) {
      return true;
    } else {
      return false;
    }
  }

  function formatDate(date?: string) {
    return date!.replace(/-/g, "/");
  }

  const COLORS = ["#0088FE", "#28a745", "#dc3545"];

  const RADIAN = Math.PI / 180;

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const navigate = useNavigate();

  useEffect(() => {
    async function getData() {
      const response = await getMothValues();
      setRawData(response!.rawData);

      // rawData.map((item) => {
      //   if (dateInRange(date1, formatDate(item.buyed_at), date2)) {
      //     setTotal((state) => (state += item.price));
      //     setCount((state) => state++);
      //   }
      // });
      // setData(response!.data);
      setYearTotal(response!.yearTotal);
      setYearTotalCount(response!.yearTotalCount);
      // setMonthTotal(response!.monthTotal);
      // setMonthTotalCount(response!.monthTotalCount);
      // setYesterdayTotalCount(response!.yesterdayCount);
      // setYesterdayTotal(response!.yesterdayTotal);
      // setTodayTotal(response!.todayTotal);
      // setTodayTotalCount(response!.todayCount);
      // setLast5Total(response!.last5Total);
      // setLast5TotalCount(response!.last5Count);
    }
    getData();
  }, []);

  useEffect(() => {
    if (!user || (user.level !== "admin" && user.level !== "employee")) {
      navigate("/painel/login");
    }
  }, [user]);

  useEffect(() => {
    // if (period === "Ontem") {
    //   setInfoToshow({
    //     total: yesterdayTotalCount,
    //     value: yesterdayTotal,
    //     labelTotal: "Total de vendas ontem",
    //     labelValue: "Faturamento de ontem",
    //   });
    // }
    // if (period === "Hoje") {
    //   setInfoToshow({
    //     total: todayTotalCount,
    //     value: todayTotal,
    //     labelTotal: "Total de vendas hoje",
    //     labelValue: "Faturamento de hoje",
    //   });
    // }
    // if (period === "Five") {
    //   setInfoToshow({
    //     total: last5TotalCount,
    //     value: last5Total,
    //     labelTotal: "Total de vendas nos últimos 5 dias",
    //     labelValue: "Faturamento nos últimos 5 dias",
    //   });
    // }
    // if (period === "Month") {
    //   setInfoToshow({
    //     total: monthTotalCount,
    //     value: monthTotal,
    //     labelTotal: "Total de vendas nesse mês",
    //     labelValue: "Faturamento nesse mês",
    //   });
    // }
    let t = 0;
    let c = 0;
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
    rawData.map((i) => {
      if (
        dateInRange(
          formatDate(date1),
          formatDate(i.buyed_at),
          formatDate(date2)
        )
      ) {
        t += i.price;
        c++;
        if (i.buyed_at?.split("-")[1] === "1")
          JanValue["Vendas mensais"] += i.price;
        if (i.buyed_at?.split("-")[1] === "2")
          FevValue["Vendas mensais"] += i.price;
        if (i.buyed_at?.split("-")[1] === "3")
          MarValue["Vendas mensais"] += i.price;
        if (i.buyed_at?.split("-")[1] === "4")
          AbrValue["Vendas mensais"] += i.price;
        if (i.buyed_at?.split("-")[1] === "5")
          MaiValue["Vendas mensais"] += i.price;
        if (i.buyed_at?.split("-")[1] === "6")
          JunValue["Vendas mensais"] += i.price;
        if (i.buyed_at?.split("-")[1] === "7")
          JulValue["Vendas mensais"] += i.price;
        if (i.buyed_at?.split("-")[1] === "8")
          AgoValue["Vendas mensais"] += i.price;
        if (i.buyed_at?.split("-")[1] === "9")
          SetValue["Vendas mensais"] += i.price;
        if (i.buyed_at?.split("-")[1] === "10")
          OutValue["Vendas mensais"] += i.price;
        if (i.buyed_at?.split("-")[1] === "11")
          NovValue["Vendas mensais"] += i.price;
        if (i.buyed_at?.split("-")[1] === "12")
          DezValue["Vendas mensais"] += i.price;
      }
    });
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
    setData(data);
    setgraphKey((state) => (state += "1"));
    setTotal(t);
    setCount(c);
  }, [date1, date2]);

  function toggleMenu() {
    const t = data;

    if (t) t[0]["Vendas mensais"] = t[0]["Vendas mensais"] + 20;

    setgraphKey((state) => (state += "1"));
    setData(t);

    // setVisible((state) => !state);
  }

  return (
    <Container visible={visible}>
      <div className="menu">
        <button onClick={toggleMenu}>
          <FaBars />
        </button>
        <nav></nav>
      </div>
      <div className="content">
        <header>
          <div className="total">
            <p>Total de vendas no ano</p>
            <span>{yearTotalCount}</span>
          </div>
          <div className="total">
            <p>Total de vendas no período</p>
            <span>{count}</span>
          </div>
          {/* <div className="total">
            <p>Total de vendas canceladas</p>
            <span>0</span>
          </div> */}
        </header>

        <div className="graphs">
          <div className="header">
            <div className="total">
              <p>Faturamento anual</p>
              <span>{formatter.format(yearTotal)}</span>
            </div>
            <div className="total">
              <p>Faturamento no período</p>
              <span>{formatter.format(total)}</span>
            </div>
            {/* <div className="total">
              <p>Produto mais cancelado</p>
              <span>Kibe de suco de laranja</span>
            </div> */}
          </div>
          <div className="graph">
            {/* <div className="label">
              <div className="info">
                <div className="color"></div>
                <span className="name">label</span>
              </div>
              <div className="info">
                <div className="color"></div>
                <span className="name">label</span>
              </div>
              <div className="info">
                <div className="color"></div>
                <span className="name">label</span>
              </div>
            </div> */}
            {/* <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={data}
                  labelLine={false}
                  label={renderCustomizedLabel}
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer> */}
            <div className="select">
              <div>
                <label htmlFor="inicio">Inicio</label>
                <input
                  type="date"
                  name="inicio"
                  onChange={(e) => setDate1(e.target.value)}
                  id="inicio"
                />
              </div>
              <div>
                <label htmlFor="fim">Fim</label>
                <input
                  type="date"
                  name="Fim"
                  onChange={(e) => setDate2(e.target.value)}
                  id="fim"
                />
              </div>
            </div>
            <ResponsiveContainer>
              <BarChart
                key={graphKey}
                width={500}
                height={300}
                data={data}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: 14 }} />
                <Bar dataKey="Vendas mensais" fill="#0e0eb8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      {/* <button onClick={handleSignOut}>Sair</button> */}
    </Container>
  );
};

export default Painel;
