'use server'
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

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
    revalidatePath('/');
}

export async function fetchUserNotes(userId: string) {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from('notes')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

    if (error) {
        console.error("Error fetching notes:", error);
        throw new Error("Failed to fetch notes");
    }
    return data;
}

export async function updateNote(id: string, formData: FormData) {
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;

    const supabase = await createClient();

    // Update the note in the database
    const { error } = await supabase.from('notes').update({
        title,
        content
    }).eq('id', id);

    if (error) {
        console.error("Error updating note:", error);
        throw new Error("Failed to update note");
    }
}

export async function deleteNote(id: string) {
    const supabase = await createClient();

    // Delete the note from the database
    const { error } = await supabase.from('notes').delete().eq('id', id);

    if (error) {
        console.error("Error deleting note:", error);
        throw new Error("Failed to delete note");
    }
    revalidatePath('/');
}