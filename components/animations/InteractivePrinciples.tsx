'use client'
import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import AnimatedDataFlow from '@/components/animations/AnimatedDataFlow';

export default function Hero() {
  return (
    <section className="py-20 bg-gradient-to-r from-green-400 to-blue-500">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        <div className="max-w-lg mb-10 md:mb-0">
          <h2 className="text-4xl font-bold mb-4">Transform Your Business Insights</h2>
          <p className="mb-6">Unlock the power of data-driven decision making for your SME</p>
          <Link href="/projects">
            <Button size="lg">Explore Our Work</Button>
          </Link>
        </div>
        <AnimatedDataFlow />
      </div>
    </section>
  );
}