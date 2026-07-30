import React, { useState } from 'react';
import { Edit, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { ConfirmModal } from '@/components/ui/ConfirmModal';

interface Column {
  key: string;
  label: string;
  render?: (row: any) => React.ReactNode;
}

interface DataTableProps {
  columns: Column[];
  data: any[];
  onDelete?: (id: string) => void;
  getEditLink?: (id: string) => string;
}

export function DataTable({ columns, data, onDelete, getEditLink }: DataTableProps) {
  const [deleteId, setDeleteId] = useState<string | null>(null);

  if (!data || data.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-border p-8 text-center text-text-light">
        No records found.
      </div>
    );
  }

  return (
    <>
      <div className="bg-white rounded-lg border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface border-b border-border text-sm font-semibold text-text-medium">
                {columns.map((col) => (
                  <th key={col.key} className="px-6 py-4">
                    {col.label}
                  </th>
                ))}
                {(onDelete || getEditLink) && (
                  <th className="px-6 py-4 text-right">Actions</th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {data.map((row) => (
                <tr key={row.id} className="hover:bg-surface/50 transition-colors">
                  {columns.map((col) => (
                    <td key={col.key} className="px-6 py-4 text-sm text-text-dark">
                      {col.render ? col.render(row) : row[col.key]}
                    </td>
                  ))}
                  
                  {(onDelete || getEditLink) && (
                    <td className="px-6 py-4 text-right flex justify-end gap-3">
                      {getEditLink && (
                        <Link 
                          href={getEditLink(row.id)}
                          className="p-2 text-text-medium hover:text-primary transition-colors rounded-md hover:bg-primary/10"
                        >
                          <Edit size={16} />
                        </Link>
                      )}
                      {onDelete && (
                        <button
                          onClick={() => setDeleteId(row.id)}
                          className="p-2 text-text-medium hover:text-red-600 transition-colors rounded-md hover:bg-red-50"
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ConfirmModal 
        isOpen={deleteId !== null}
        onClose={() => setDeleteId(null)}
        onConfirm={() => {
          if (deleteId && onDelete) {
            onDelete(deleteId);
          }
        }}
      />
    </>
  );
}