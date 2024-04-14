// hm/components/EditForm.tsx
'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import Input from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import { METRIC_TYPE_OPTIONS } from '@/constants/constants';

interface EditFormProps {
    metric: {
        id: string;
        created_at: string;
        metric_type: string;
        metric_value: number;
        metric_date: string;
        user_id: string;
    };
    onClose: () => void;
}

const EditForm: React.FC<EditFormProps> = ({ metric, onClose }) => {
    const [metricType, setMetricType] = useState(metric.metric_type);
    const [metricValue, setMetricValue] = useState(metric.metric_value.toString());
    const [metricDay, setMetricDay] = useState(metric.metric_date);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        console.log('Editing metric:', metric);  // 添加这一行代码，用于排错

        const supabase = createClient();

        const response = await fetch('/api/edit', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: metric.id,
                metric_type: metricType,
                metric_value: Number(metricValue),
                metric_date: metricDay,
            }),
        });

        if (!response.ok) {
            console.error('Error updating metric');
        } else {
            onClose();
            router.refresh();
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mt-4">
            <div className="mb-4">
                <label htmlFor="metricType" className="block mb-2">
                    Metric Type
                </label>
                <select
                    id="metricType"
                    value={metricType}
                    onChange={(e) => setMetricType(e.target.value)}
                    className="border border-gray-300 rounded-md px-3 py-2 w-full"
                    required
                    >
                    {METRIC_TYPE_OPTIONS.map(({ value, label }) => (
                        <option key={value} value={value}>
                        {label}
                        </option>
                    ))}
                </select>
            </div>
            <div className="mb-4">
                <label htmlFor="metricValue" className="block mb-2">
                    Metric Value
                </label>
                <Input
                    type="number"
                    id="metricValue"
                    value={metricValue}
                    onChange={(e) => setMetricValue(e.target.value)}
                    required
                />
            </div>
            <div className="mb-4">
                <label htmlFor="metricDay" className="block mb-2">
                    Metric Day
                </label>
                <Input
                    type="date"
                    id="metricDate"
                    value={metricDay}
                    onChange={(e) => setMetricDay(e.target.value)}
                    required
                />
            </div>
            <div className="flex justify-end">
                <Button type="button" variant="outline" onClick={onClose} className="mr-2">
                    Cancel
                </Button>
                <Button type="submit">Update</Button>
            </div>
        </form>
    );
};

export default EditForm;