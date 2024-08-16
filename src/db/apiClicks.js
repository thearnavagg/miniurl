import supabase from "./supabase";

export async function getClicks(url_id) {
    const { data, error } = await supabase.from("urls").select("*").in("url_id", url_id);

    if (error) {
        console.log(error.message);
        throw new Error("Unable to load Clicks");
    }

    return data;
}