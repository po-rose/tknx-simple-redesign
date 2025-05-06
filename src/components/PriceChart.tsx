
import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid
} from 'recharts';

// Mock price data
const generateData = (days: number, startPrice: number, volatility: number) => {
  const data = [];
  let price = startPrice;
  
  for (let i = 0; i < days; i++) {
    const change = (Math.random() - 0.5) * volatility;
    price = Math.max(0.1, price + change);
    
    data.push({
      date: new Date(Date.now() - (days - i) * 24 * 60 * 60 * 1000).toLocaleDateString(),
      price: parseFloat(price.toFixed(2)),
    });
  }
  
  return data;
};

const dayData = generateData(24, 1.2, 0.05);
const weekData = generateData(7, 1.1, 0.1);
const monthData = generateData(30, 0.9, 0.2);
const yearData = generateData(365, 0.5, 0.3);

interface ChartProps {
  data: { date: string; price: number }[];
  dataKey: string;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-tknx-darkBlue p-2 rounded border border-tknx-blue/30 shadow-lg">
        <p className="text-gray-300 text-xs">{label}</p>
        <p className="text-white font-semibold">${payload[0].value.toFixed(2)}</p>
      </div>
    );
  }
  return null;
};

const ChartComponent: React.FC<ChartProps> = ({ data, dataKey }) => {
  const minValue = Math.min(...data.map(item => item.price)) * 0.95;
  const maxValue = Math.max(...data.map(item => item.price)) * 1.05;
  
  const startPrice = data[0].price;
  const endPrice = data[data.length - 1].price;
  const priceChange = endPrice - startPrice;
  const priceChangePercentage = (priceChange / startPrice) * 100;
  const isPriceUp = priceChange >= 0;
  
  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <h3 className="text-xl font-semibold">${endPrice.toFixed(2)}</h3>
        <span className={`text-sm ${isPriceUp ? 'text-tknx-success' : 'text-tknx-error'}`}>
          {isPriceUp ? '+' : ''}{priceChange.toFixed(2)} ({priceChangePercentage.toFixed(2)}%)
        </span>
      </div>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={isPriceUp ? '#7367F0' : '#EA5455'} stopOpacity={0.3} />
                <stop offset="95%" stopColor={isPriceUp ? '#7367F0' : '#EA5455'} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#162046" />
            <XAxis 
              dataKey="date" 
              tick={{ fill: '#8E97A9' }} 
              tickLine={{ stroke: '#8E97A9' }}
              axisLine={{ stroke: '#162046' }}
              minTickGap={30}
            />
            <YAxis 
              domain={[minValue, maxValue]}
              tick={{ fill: '#8E97A9' }}
              tickLine={{ stroke: '#8E97A9' }}
              axisLine={{ stroke: '#162046' }}
              tickFormatter={(value) => `$${value.toFixed(2)}`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area 
              type="monotone" 
              dataKey={dataKey} 
              stroke={isPriceUp ? '#7367F0' : '#EA5455'} 
              fillOpacity={1}
              fill="url(#colorPrice)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const PriceChart: React.FC = () => {
  return (
    <Card className="border-tknx-darkBlue/30 bg-tknx-cardBg shadow-lg">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold text-white">Price Chart</h3>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="day">
          <TabsList className="grid grid-cols-4 mb-4 bg-tknx-background/50">
            <TabsTrigger value="day">24H</TabsTrigger>
            <TabsTrigger value="week">Week</TabsTrigger>
            <TabsTrigger value="month">Month</TabsTrigger>
            <TabsTrigger value="year">Year</TabsTrigger>
          </TabsList>
          
          <TabsContent value="day" className="m-0 mt-4">
            <ChartComponent data={dayData} dataKey="price" />
          </TabsContent>
          
          <TabsContent value="week" className="m-0 mt-4">
            <ChartComponent data={weekData} dataKey="price" />
          </TabsContent>
          
          <TabsContent value="month" className="m-0 mt-4">
            <ChartComponent data={monthData} dataKey="price" />
          </TabsContent>
          
          <TabsContent value="year" className="m-0 mt-4">
            <ChartComponent data={yearData} dataKey="price" />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default PriceChart;
