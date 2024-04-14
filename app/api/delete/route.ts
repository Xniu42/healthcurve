// hm/app/api/delete/route.ts
import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function DELETE(request: Request) {
  const supabase = createClient();

  const { id } = await request.json();

  const { data, error } = await supabase.from('metric').delete().eq('id', id).single();

  if (error) {
    console.error('删除健康指标数据失败:', error);
    return NextResponse.json({ error: '删除健康指标数据失败' }, { status: 500 });
  }

  return NextResponse.json({ data });
}