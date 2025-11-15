import { Star } from 'lucide-react';

interface RatingDistributionProps {
  ratings: number[];
}

export function RatingDistribution({ ratings }: RatingDistributionProps) {
  // Count ratings 1-5
  const distribution = [0, 0, 0, 0, 0];
  ratings.forEach(rating => {
    if (rating >= 1 && rating <= 5) {
      distribution[rating - 1]++;
    }
  });

  const total = ratings.length;
  const maxCount = Math.max(...distribution);

  return (
    <div className="space-y-2">
      {[5, 4, 3, 2, 1].map(stars => {
        const count = distribution[stars - 1];
        const percentage = total > 0 ? (count / total) * 100 : 0;
        const barWidth = maxCount > 0 ? (count / maxCount) * 100 : 0;

        return (
          <div key={stars} className="flex items-center gap-3">
            <div className="flex items-center gap-1 w-16">
              <span className="text-sm font-medium text-gray-700 w-3">{stars}</span>
              <Star size={14} className="text-yellow-400 fill-yellow-400" />
            </div>

            <div className="flex-1 h-4 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-yellow-400 to-yellow-500 transition-all duration-500 rounded-full"
                style={{ width: `${barWidth}%` }}
              />
            </div>

            <div className="text-sm text-gray-600 w-16 text-right">
              {count > 0 && (
                <span>
                  {count} <span className="text-xs text-gray-400">({percentage.toFixed(0)}%)</span>
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
