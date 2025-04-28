
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import OrderStatistics from './OrderStatistics';
import DailyReportChart from './DailyReportChart';
import WeeklyReportChart from './WeeklyReportChart';
import MonthlyReportChart from './MonthlyReportChart';

type PeriodType = 'daily' | 'weekly' | 'monthly';

const OrderStatisticsWithToggle = () => {
  const [activePeriod, setActivePeriod] = useState<PeriodType>('weekly');

  return (
    <div className="space-y-4">
      <div className="flex justify-center gap-2 mb-4">
        <Button
          variant={activePeriod === 'daily' ? 'default' : 'outline'}
          onClick={() => setActivePeriod('daily')}
          className={activePeriod === 'daily' ? 'bg-[#5B8C32] hover:bg-[#4A7129]' : ''}
        >
          Daily
        </Button>
        <Button
          variant={activePeriod === 'weekly' ? 'default' : 'outline'}
          onClick={() => setActivePeriod('weekly')}
          className={activePeriod === 'weekly' ? 'bg-[#5B8C32] hover:bg-[#4A7129]' : ''}
        >
          Weekly
        </Button>
        <Button
          variant={activePeriod === 'monthly' ? 'default' : 'outline'}
          onClick={() => setActivePeriod('monthly')}
          className={activePeriod === 'monthly' ? 'bg-[#5B8C32] hover:bg-[#4A7129]' : ''}
        >
          Monthly
        </Button>
      </div>
      
      {activePeriod === 'daily' && <DailyReportChart />}
      {activePeriod === 'weekly' && <OrderStatistics />}
      {activePeriod === 'monthly' && <MonthlyReportChart />}
    </div>
  );
};

export default OrderStatisticsWithToggle;
