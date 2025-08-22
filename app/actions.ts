'use server'
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export async function createNote(formData: FormData) {
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;

    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();

    // If no user is logged in, redirect to login page
    if (!user) {
        redirect('/login');
    }
    // create a new note in the database
    const { error } = await supabase.from('notes').insert({
        title,
        content,
        user_id: user.id
    });
    if (error) {
        console.error("Error creating note:", error);
        throw new Error("Failed to create note");
    }
}