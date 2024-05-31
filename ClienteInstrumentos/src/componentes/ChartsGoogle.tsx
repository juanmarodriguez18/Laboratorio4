import React, { useEffect, useState } from 'react';
import { Chart } from 'react-google-charts';
import { getOrdersByInstrument, getOrdersByMonth } from '../servicios/FuncionesInstrumento';


interface OrdersByMonth {
  monthYear: string;
  orderCount: number;
}

interface OrdersByInstrument {
  instrumentName: string;
  orderCount: number;
}

const ChartsGoogle: React.FC = () => {
  const [ordersByMonth, setOrdersByMonth] = useState<Array<Array<string | number>>>([]);
  const [ordersByInstrument, setOrdersByInstrument] = useState<Array<Array<string | number>>>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Obtener datos de pedidos por mes
    getOrdersByMonth()
      .then((orders) => {
        const chartData = [
          ['Month-Year', 'Orders'],
          ...orders.map((order: OrdersByMonth) => [order.monthYear, order.orderCount])
        ];
        setOrdersByMonth(chartData);
      })
      .catch((error) => {
        setError(`Error al obtener los datos de pedidos por mes: ${error.message}`);
      });

    // Obtener datos de pedidos por instrumento
    getOrdersByInstrument()
      .then((orders) => {
        const chartData = [
          ['Instrument', 'Orders'],
          ...orders.map((order: OrdersByInstrument) => [order.instrumentName, order.orderCount])
        ];
        setOrdersByInstrument(chartData);
      })
      .catch((error) => {
        setError(`Error al obtener los datos de pedidos por instrumento: ${error.message}`);
      });
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Gráficos de Pedidos</h1>

      <div style={{ marginBottom: '20px' }}>
        <Chart
          chartType="BarChart"
          width="100%"
          height="400px"
          data={ordersByMonth}
          options={{
            title: 'Cantidad de pedidos por mes y año',
            hAxis: { title: 'Mes-Año' },
            vAxis: { title: 'Cantidad de pedidos' },
          }}
        />
      </div>

      <Chart
        chartType="PieChart"
        width="100%"
        height="400px"
        data={ordersByInstrument}
        options={{
          title: 'Cantidad de pedidos por instrumento',
        }}
      />
    </div>
  );
};

export default ChartsGoogle;
