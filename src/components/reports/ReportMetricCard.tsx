
import { Card, CardContent } from "@/components/ui/card";

interface ReportMetricCardProps {
  title: string;
  value: string;
  trend: string;
  trendDirection: 'up' | 'down';
}

const ReportMetricCard = ({ title, value, trend, trendDirection }: ReportMetricCardProps) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <p className="text-sm text-gray-500">{title}</p>
        <div className="flex items-center justify-between mt-2">
          <p className="text-2xl font-bold">{value}</p>
          <span className={`text-sm font-medium px-2 py-1 rounded-full ${
            trendDirection === 'up' 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            {trend}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReportMetricCard;
