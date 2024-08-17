import supabase from "./supabase";

export async function getClicksForAllUrls(urlIds) {
    const { data, error } = await supabase.from("clicks").select("*").in("url_id", urlIds);

    if (error) {
        console.log(error.message);
        return null;
    }

    return data;
}