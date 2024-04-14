// hm/app/api/insertMetric/route.ts
import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

interface MetricRow {
  metricType: string;
  metricValue: number;
  metricDate: string;
}

export async function POST(request: Request) {
  const rows: MetricRow[] = await request.json();

  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
  }

  const { data, error } = await supabase
    .from('metric')
    .insert(
      rows.map(row => ({
        user_id: user.id,
        metric_type: row.metricType,
        metric_value: row.metricValue,
        metric_date: row.metricDate
      }))
    );

  if (error) {
    return NextResponse.json({ error: 'Failed to insert data' }, { status: 500 });
  }

  return NextResponse.json({ data });
}