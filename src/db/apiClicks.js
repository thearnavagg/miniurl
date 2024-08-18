import supabase from "./supabase";
import { UAParser } from "ua-parser-js";

export async function getClicksForAllUrls(urlIds) {
    const { data, error } = await supabase.from("clicks").select("*").in("url_id", urlIds);

    if (error) {
        console.log(error.message);
        return null;
    }

    return data;
}

export const storeClicks = async ({ id, original_url }) => {
    const parser = new UAParser();
    try {
        const res = parser.getResult();
        const device = res.type || "desktop";

        const response = await fetch("https://ipapi.co/json");
        const { city, country_name } = await response.json();

        await supabase.from("clicks").insert({
            url_id: id,
            city: city,
            country: country_name,
            device: device,
        });

        window.location.href = original_url;
    } catch (error) {
        console.error("Error recording clicks: ", error);
    }
}