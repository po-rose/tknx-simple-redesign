
import React from 'react';
import { 
  ArrowUpRight, AreaChart, Clock, Blocks, 
  CircleDollarSign, Users, ShieldCheck
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string;
  change?: string;
  icon: React.ReactNode;
  positive?: boolean;
  className?: string;
}

const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  change,
  icon,
  positive = true,
  className
}) => {
  return (
    <div className={cn(
      "bg-tknx-cardBg rounded-xl p-4 shadow-lg hover:shadow-xl transition-all border border-tknx-darkBlue/30",
      className
    )}>
      <div className="flex justify-between items-start">
        <div>
          <p className="text-gray-400 text-sm">{title}</p>
          <h3 className="text-xl font-semibold mt-1">{value}</h3>
          {change && (
            <div className="flex items-center mt-1">
              <span className={`text-xs ${positive ? 'text-tknx-success' : 'text-tknx-error'}`}>
                {change}
              </span>
              <ArrowUpRight 
                className={`h-3 w-3 ml-1 ${positive ? 'text-tknx-success' : 'text-tknx-error'}`} 
              />
            </div>
          )}
        </div>
        <div className="bg-tknx-darkBlue/50 p-2 rounded-md">
          {icon}
        </div>
      </div>
    </div>
  );
};

const Stats: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      <StatCard
        title="Network Market Cap"
        value="$4.8B"
        change="+2.4% (24h)"
        positive={true}
        icon={<CircleDollarSign className="text-tknx-lightBlue h-5 w-5" />}
      />
      <StatCard
        title="Current Price"
        value="$1.29"
        change="+5.3% (24h)"
        positive={true}
        icon={<AreaChart className="text-tknx-purple h-5 w-5" />}
      />
      <StatCard
        title="Transactions (24h)"
        value="12.4M"
        change="+8.2% (24h)"
        positive={true}
        icon={<ArrowUpRight className="text-tknx-success h-5 w-5" />}
      />
      <StatCard
        title="Average Block Time"
        value="30 sec"
        change="-1.2% (24h)"
        positive={false}
        icon={<Clock className="text-tknx-info h-5 w-5" />}
      />
      <StatCard
        title="Active Validators"
        value="432"
        change="+2 (24h)"
        positive={true}
        icon={<ShieldCheck className="text-tknx-purple h-5 w-5" />}
      />
      <StatCard
        title="Latest Block"
        value="#16,942,035"
        icon={<Blocks className="text-tknx-lightBlue h-5 w-5" />}
      />
      <StatCard
        title="Active Users (24h)"
        value="308,725"
        change="+5.7% (24h)"
        positive={true}
        icon={<Users className="text-tknx-warning h-5 w-5" />}
      />
    </div>
  );
};

export default Stats;
