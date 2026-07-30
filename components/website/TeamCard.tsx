import React from 'react';
import type { TeamMember } from '@/types';
import { Mail } from 'lucide-react';

interface TeamCardProps {
  member: TeamMember;
}

export function TeamCard({ member }: TeamCardProps) {
  return (
    <div className="bg-white rounded-lg border border-border overflow-hidden group hover:shadow-lg transition-shadow">
      <div className="relative aspect-[3/4] bg-surface overflow-hidden">
        <img
          src={member.image || '/images/placeholder.jpg'}
          alt={member.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
          {member.email && (
            <a 
              href={`mailto:${member.email}`}
              className="flex items-center gap-2 text-white hover:text-secondary transition-colors"
            >
              <Mail size={18} />
              <span className="text-sm">{member.email}</span>
            </a>
          )}
        </div>
      </div>
      <div className="p-6 text-center">
        <h3 className="text-xl font-bold text-text-dark mb-1">{member.name}</h3>
        <p className="text-secondary font-medium mb-3">{member.designation}</p>
        {member.bio && (
          <p className="text-text-medium text-sm line-clamp-3">{member.bio}</p>
        )}
      </div>
    </div>
  );
}
