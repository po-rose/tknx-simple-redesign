
import React from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from '@/components/ui/badge';
import { ArrowRightIcon, CheckCircle2, Clock, DollarSign } from 'lucide-react';

// Mock transaction data
const recentTransactions = [
  {
    id: 'tx1',
    hash: '0x3a8c1d3r2e5g7h8j9k1l3m5n7p9q1s3u5v7w9y1z3a5',
    from: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045',
    to: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
    value: '1,234.56',
    timestamp: '30 sec ago',
    status: 'confirmed',
    type: 'transfer',
  },
  {
    id: 'tx2',
    hash: '0x4b9d2e4f6g8h0j2k4l6m8n0p2q4s6u8v0w2y4z6b8',
    from: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
    to: '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D',
    value: '802.32',
    timestamp: '2 min ago',
    status: 'confirmed',
    type: 'swap',
  },
  {
    id: 'tx3',
    hash: '0x5c0e3f1g2h3j4k5l6m7n8p9q0s1u2v3w4y5z6a7b8',
    from: '0x85615B076615317C80F14cBad6501eec031cD51C',
    to: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
    value: '15.78',
    timestamp: '5 min ago',
    status: 'confirmed',
    type: 'mint',
  },
  {
    id: 'tx4',
    hash: '0x6d1f2g3h4j5k6l7m8n9p0q1s2u3v4w5y6z7a8b9c0',
    from: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
    to: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
    value: '500.00',
    timestamp: '8 min ago',
    status: 'pending',
    type: 'transfer',
  },
  {
    id: 'tx5',
    hash: '0x7e2f3g4h5j6k7l8m9n0p1q2s3u4v5w6y7z8a9b0c1',
    from: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
    to: '0x3845badAde8e6dFF049820680d1F14bD3903a5d0',
    value: '2,563.41',
    timestamp: '12 min ago',
    status: 'confirmed',
    type: 'swap',
  },
];

const formatAddress = (address: string) => {
  return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
};

const getTransactionTypeColor = (type: string) => {
  switch (type) {
    case 'transfer':
      return 'bg-tknx-blue text-white';
    case 'swap':
      return 'bg-tknx-purple text-white';
    case 'mint':
      return 'bg-tknx-success text-white';
    default:
      return 'bg-tknx-gray text-white';
  }
};

const TransactionList: React.FC = () => {
  return (
    <Card className="border-tknx-darkBlue/30 bg-tknx-cardBg shadow-lg">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold text-white">Latest Transactions</h3>
          <a href="/transactions" className="text-tknx-blue text-sm hover:underline">View All</a>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs defaultValue="all">
          <TabsList className="grid grid-cols-4 mb-4 bg-tknx-background/50 mx-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="transfers">Transfers</TabsTrigger>
            <TabsTrigger value="swaps">Swaps</TabsTrigger>
            <TabsTrigger value="mints">Mints</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="m-0">
            <div className="p-2 overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-tknx-darkBlue/30 text-left text-gray-400 text-sm">
                    <th className="px-4 py-2">Tx Hash</th>
                    <th className="px-4 py-2">Type</th>
                    <th className="px-4 py-2">From</th>
                    <th className="px-4 py-2"></th>
                    <th className="px-4 py-2">To</th>
                    <th className="px-4 py-2">Value</th>
                    <th className="px-4 py-2">Time</th>
                    <th className="px-4 py-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentTransactions.map((tx) => (
                    <tr key={tx.id} className="border-b border-tknx-darkBlue/10 hover:bg-tknx-darkBlue/10 transition-colors">
                      <td className="px-4 py-3">
                        <a href={`/tx/${tx.hash}`} className="text-tknx-blue hover:underline">
                          {formatAddress(tx.hash)}
                        </a>
                      </td>
                      <td className="px-4 py-3">
                        <Badge className={`${getTransactionTypeColor(tx.type)}`}>
                          {tx.type.charAt(0).toUpperCase() + tx.type.slice(1)}
                        </Badge>
                      </td>
                      <td className="px-4 py-3">
                        <a href={`/address/${tx.from}`} className="text-white hover:text-tknx-blue">
                          {formatAddress(tx.from)}
                        </a>
                      </td>
                      <td className="px-0 py-3">
                        <ArrowRightIcon className="h-4 w-4 text-tknx-gray" />
                      </td>
                      <td className="px-4 py-3">
                        <a href={`/address/${tx.to}`} className="text-white hover:text-tknx-blue">
                          {formatAddress(tx.to)}
                        </a>
                      </td>
                      <td className="px-4 py-3 font-medium">
                        <div className="flex items-center">
                          <DollarSign className="h-3 w-3 mr-1 text-gray-400" />
                          {tx.value}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-gray-400">
                        <div className="flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {tx.timestamp}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        {tx.status === 'confirmed' ? (
                          <div className="flex items-center text-tknx-success">
                            <CheckCircle2 className="h-4 w-4 mr-1" />
                            <span>Success</span>
                          </div>
                        ) : (
                          <div className="flex items-center text-tknx-warning">
                            <Clock className="h-4 w-4 mr-1" />
                            <span>Pending</span>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>
          
          <TabsContent value="transfers" className="m-0">
            <div className="flex justify-center items-center p-8 text-gray-400">
              Filtered transactions by transfers will appear here
            </div>
          </TabsContent>
          
          <TabsContent value="swaps" className="m-0">
            <div className="flex justify-center items-center p-8 text-gray-400">
              Filtered transactions by swaps will appear here
            </div>
          </TabsContent>
          
          <TabsContent value="mints" className="m-0">
            <div className="flex justify-center items-center p-8 text-gray-400">
              Filtered transactions by mints will appear here
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default TransactionList;
