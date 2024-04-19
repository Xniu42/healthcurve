// app/story/page.tsx
import Chat from '@/components/Chat';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

type Metric = {
  metric_type: string;
  metric_value: number;
  metric_date: string;
};

export default async function AnalysisPage() {
  const supabase = createClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const { data: metrics, error } = await supabase
    .from('metric')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching data:', error);
    redirect('/error');
  }

  const filteredMetrics: Metric[] = metrics.map(({ metric_type, metric_value, metric_date }) => ({
    metric_type,
    metric_value,
    metric_date,
  }));

  return (
    <div>
      <Chat metrics={filteredMetrics} />
    </div>
  );
}