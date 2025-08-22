'use server'
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export async function createNote(formData: FormData) {
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;

    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect('/login');
    }

    await supabase.from('notes').insert({
        title,
        content,
        user_id: user.id
    });
}