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

const Painel: React.FC = () => {
  const { user } = useAuth();
  const [visible, setVisible] = useState(false);
  const [yearTotal, setYearTotal] = useState(0);
  const [monthTotal, setMonthTotal] = useState(0);
  const [yearTotalCount, setYearTotalCount] = useState(0);
  const [monthTotalCount, setMonthTotalCount] = useState(0);
  const { getMothValues } = useAdmin();

  const [data, setData] = useState<
    | {
        name: string;
        "Vendas mensais": number;
      }[]
    | undefined
  >([]);

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
      setData(response!.data);
      setYearTotal(response!.yearTotal);
      setMonthTotal(response!.monthTotal);
      setMonthTotalCount(response!.monthTotalCount);
      setYearTotalCount(response!.yearTotalCount);
    }
    getData();
  }, []);

  useEffect(() => {
    if (!user || (user.level !== "admin" && user.level !== "employee")) {
      navigate("/painel/login");
    }
  }, [user]);

  function toggleMenu() {
    setVisible((state) => !state);
  }

  return (
    <Container visible={visible}>
      {/* <div className="menu">
        <button onClick={toggleMenu}>
          <FaBars />
        </button>
        <nav></nav>
      </div> */}
      <div className="content">
        <header>
          <div className="total">
            <p>Total de vendas no ano</p>
            <span>{yearTotalCount}</span>
          </div>
          <div className="total">
            <p>Total de vendas no mês</p>
            <span>{monthTotalCount}</span>
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
              <p>Faturamento mensal</p>
              <span>{formatter.format(monthTotal)}</span>
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
            <ResponsiveContainer>
              <BarChart
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
                <Bar dataKey="Vendas mensais" fill="#8884d8" />
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
