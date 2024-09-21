import React from 'react';

export default function AboutUs() {
  return (
    <section className="py-12 md:py-16 lg:py-20 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6 text-center">About Us</h2>
        <p className="text-base md:text-lg lg:text-xl text-center max-w-3xl mx-auto">
          QA Tech Ventures stands at the confluence of analytics and business acumen. We transform complex data into clear, actionable strategies that resonate with the heartbeat of Indian SMEs.
        </p>
      </div>
    </section>
  );
}