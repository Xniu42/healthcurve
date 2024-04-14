'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { METRIC_TYPE_OPTIONS } from '@/constants/constants';

interface MetricRow {
  metricType: string;
  metricValue: number;
  metricDate: string;
}

const InsertDataPage = () => {
  const [rows, setRows] = useState<MetricRow[]>([{ metricType: '', metricValue: 0, metricDate: '' }]);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleAddRow = () => {
    setRows([...rows, { metricType: '', metricValue: 0, metricDate: '' }]);
  };

  const handleDeleteRow = (index: number) => {
    const newRows = [...rows];
    newRows.splice(index, 1);
    setRows(newRows);
  };

  const handleChange = (index: number, field: keyof MetricRow, value: string | number) => {
    const newRows = [...rows];
    
    if (field === 'metricType') {
      newRows[index][field] = value as string;
    } else if (field === 'metricValue') {
      newRows[index][field] = value as number;
    } else {
      newRows[index][field] = value as string;
    }
    
    setRows(newRows);
  };
  // const handleChange = (index: number, field: keyof MetricRow, value: string | number) => {
  //   const newRows = [...rows];
  //   newRows[index][field] = value;
  //   setRows(newRows);
  // };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('/api/insertMetric', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(rows),
    });

    const { error } = await res.json();

    if (error) {
      setError(error);
    } else {
      router.push('/data');
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 text-center">Insert Health Metrics</h1>
    {error && <p style={{color: 'red'}}>{error}</p>}
      {error && <p style={{color: 'red'}}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <table>
          <thead>
            <tr>
              <th>Metric Type</th>
              <th>Metric Value</th>
              <th>Metric Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={index}>
                <td>
                  <select 
                    value={row.metricType} 
                    onChange={(e) => handleChange(index, 'metricType', e.target.value)}
                  >
                    {METRIC_TYPE_OPTIONS.map(({ value, label }) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <input 
                    type="number" 
                    value={row.metricValue} 
                    onChange={(e) => handleChange(index, 'metricValue', Number(e.target.value))} 
                  />
                </td>
                <td>
                  <input 
                    type="date" 
                    value={row.metricDate} 
                    onChange={(e) => handleChange(index, 'metricDate', e.target.value)} 
                  />
                </td>
                <td>
                  <button
                    type="button"
                    onClick={() => handleDeleteRow(index)}
                    style={{ marginRight: '10px', padding: '5px 10px', backgroundColor: '#ff0000', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ marginTop: '20px' }}>
          <button
            type="button"
            onClick={handleAddRow}
            style={{ marginRight: '10px', padding: '5px 10px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
          >
            Add Row
          </button>
          <button
            type="submit"
            style={{ padding: '5px 10px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default InsertDataPage;