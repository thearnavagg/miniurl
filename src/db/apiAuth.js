import supabase, { supabaseUrl } from "./supabase";
export async function signin({ email, password }) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
    }
    );
    if (error) throw new Error(error.message);

    return data
};

export async function signup({ name, email, password, profile_pic }) {
    const fileName = `dp-${name.split(" ").join("-")}-${Math.random()}`;

    const { error: storageError } = await supabase.storage
        .from("profile-pic")
        .upload(fileName, profile_pic);

    if (storageError) throw new Error(storageError.message);

    const { data: publicUrlData } = supabase
        .storage
        .from("profile-pic")
        .getPublicUrl(fileName);

    const profilePicUrl = publicUrlData.publicUrl;

    const { data, error } = await supabase.auth.signUp({
        name,
        email,
        password,
        options: {
            data: {
                name,
                profile_pic: profilePicUrl,
            },
        },
    });

    if (error) throw new Error(error.message);

    return data;}
export async function getCurrentUser() {
    const { data: session, error } = await supabase.auth.getSession();
    if (!session.session) return null;
    if (error) throw new Error(error.message);
    return session.session?.user;
}