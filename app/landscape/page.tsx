// app/landscape/page.tsx
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import MetricCharts from '@/components/MetricCharts';


export default async function LandscapePage() {
  const supabase = createClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const { data: metrics, error } = await supabase
    .from('metric')
    .select('metric_date, metric_type, metric_value')
    .eq('user_id', user.id)
    .order('metric_date', { ascending: true });

  if (error) {
    console.error('Error fetching metrics:', error);
    // TODO: 处理错误,例如显示错误信息或重定向到错误页面
  }

  return (
      <div className="container mx-auto mt-8">
        {metrics && <MetricCharts metrics={metrics} />}
      </div>
  );
}