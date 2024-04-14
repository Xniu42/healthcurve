// hm/app/metrics/page.tsx
import HealthMetricsTable from '@/components/HealthMetricsTable';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';

export default async function DataPage({ searchParams }: { searchParams: {page?:string} }) {
  const supabase = createClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const PAGE_SIZE = 10; // 每页显示的数据条数

  // 获取当前页数
  const page = searchParams.page || '1';
  const currentPage = parseInt(page, 10);

  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE - 1;

  const { data: metrics, error, count } = await supabase
    .from('metric')
    .select('*', { count: 'exact' })
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .range(startIndex, endIndex);

  if (error) {
    console.error('Error fetching data:', error);
    redirect('/error');
  }

  const totalPages = count ? Math.ceil(count / PAGE_SIZE) : 0;

  return (
    <div>
      <div className="flex-1 w-full flex flex-col gap-20 items-center">
        <NavBar />
      </div>
      <HealthMetricsTable 
        data={metrics.map(metric => ({
          id: metric.id, 
          metric_date: metric.metric_date,
          metric_type: metric.metric_type,
          metric_value: metric.metric_value,
          created_at: metric.created_at
        }))} 
        totalPages={totalPages} 
        currentPage={currentPage} 
      />
      <Footer />
    </div>
  );
}