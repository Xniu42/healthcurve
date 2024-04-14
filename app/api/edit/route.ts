// hm/app/api/edit/route.ts
import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function PUT(request: Request) {
    const supabase = createClient();

    const { id, ...updatedFields } = await request.json();

    const { data, error } = await supabase.from('metric').update(updatedFields).eq('id', id).single();

    if (error) {
        console.error('Error updating metric:', error);
        return NextResponse.json({ error: 'Failed to update metric' }, { status: 500 });
    }

    return NextResponse.json({ data });
}