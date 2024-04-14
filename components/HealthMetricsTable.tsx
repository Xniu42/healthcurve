'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from '@/components/ui/table';
import EditModal from './EditModal';
import Pagination from './Pagination';
import FormattedDate from './FormattedDate';
import DelConfirmDialog from './DelConfirmDialog';


interface HealthMetricsTableProps {
  data: {
    id: string;
    metric_date: string;
    metric_type: string;
    metric_value: number;
    created_at: string;
  }[];
  totalPages: number;
  currentPage: number;
}

interface Metric {
  id: string;
  user_id: string;
  metric_date: string;
  metric_type: string;
  metric_value: number;
  created_at: string;
}

const HealthMetricsTable: React.FC<HealthMetricsTableProps> = ({ data, totalPages, currentPage }) => {
  const [editingMetric, setEditingMetric] = useState<Metric | null>(null);
  
  const handleEdit = (metric: Metric) => {
    setEditingMetric(metric);
  };

  const handleCloseEdit = () => {
    setEditingMetric(null);
  };

  const [deletingMetric, setDeletingMetric] = useState<Metric | null>(null);

  const handleDelete = (metric: Metric) => {
    setDeletingMetric(metric);
  };

  const handleCancelDelete = () => {
    setDeletingMetric(null);
  };

  const handleConfirmDelete = async () => {
    if (!deletingMetric) return;
    
    console.log('Deleting metric:', deletingMetric);
  
    const response = await fetch('/api/delete', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: deletingMetric.id }),
    });
  
    if (response.ok) {
      // 删除成功,关闭对话框并重新加载页面数据
      setDeletingMetric(null);
      window.location.reload();
    } else {
      // 删除失败,显示错误消息
      alert('Failed to delete metric. Please try again.');
    }
  }


  

  return (
    <div className="flex flex-col gap-4 p-4 border border-gray-200 rounded-lg w-full dark:border-gray-800">
      <div className="flex items-center gap-4">
        <h1 className="text-2xl font-semibold">Health Metrics</h1>
        <Link href="/insertdata">
          <Button size="sm">New</Button>
        </Link>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Metric Date</TableHead>
            <TableHead>Metric Type</TableHead>
            <TableHead>Metric Value</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead className="w-[120px] text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((metric, index) => (
            <TableRow key={index}>
              <TableCell>{metric.metric_date}</TableCell>
              <TableCell>{metric.metric_type}</TableCell>
              <TableCell>{metric.metric_value}</TableCell>
              <TableCell><FormattedDate date={metric.created_at} /></TableCell>
              <TableCell className="text-right">
              <div className="flex items-center justify-end space-x-1">
              <Button variant="outline" size="sm" onClick={() => handleEdit(metric as Metric)} aria-label="Edit metric">
                Edit
              </Button>
              <Button variant="outline" size="sm" className="bg-red-500 text-white hover:bg-red-600" onClick={() => handleDelete(metric as Metric)} aria-label="Delete metric">
                Delete
              </Button>
              </div>
            </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination currentPage={currentPage} totalPages={totalPages} />
      {editingMetric && (
        <EditModal
          metric={editingMetric}
          open={!!editingMetric}
          onClose={handleCloseEdit}
        />
      )}
      <DelConfirmDialog
        open={!!deletingMetric}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </div>
  );
};

export default HealthMetricsTable;