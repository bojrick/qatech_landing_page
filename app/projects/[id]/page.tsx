import React from 'react';
import { notFound } from 'next/navigation';
import { projects, industries } from '@/lib/projectData';

export default function ProjectPage({ params }: { params: { id: string } }) {
  const project = projects.find(p => p.id === parseInt(params.id));
  
  if (!project) {
    notFound();
  }

  const industry = industries.find(i => i.id === project.industry_id);

  return (
    <div className="container mx-auto px-4 pt-24 pb-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">{project.name}</h1>
        <div className="flex items-center mb-6">
          <span className={`mr-2 h-6 w-6 bg-gradient-to-br ${industry?.color}`}></span>
          <span className="text-lg font-semibold">{industry?.name}</span>
        </div>
        <p className="text-xl mb-8">{project.description}</p>
        {/* Add more project details here */}
      </div>
    </div>
  );
}