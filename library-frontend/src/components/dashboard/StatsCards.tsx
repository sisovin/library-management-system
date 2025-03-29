import React from 'react';
import Card from '../ui/card';

const StatsCards = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {stats.map((stat, index) => (
        <Card key={index} variant="default">
          <h2 className="text-xl font-semibold mb-2">{stat.title}</h2>
          <p className="text-3xl">{stat.value}</p>
        </Card>
      ))}
    </div>
  );
};

export default StatsCards;
