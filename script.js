    const SUPABASE_URL = "https://xzimpyqvgvtcbesgvpgu.supabase.co/";
    const SUPABASE_KEY = "sb_publishable_EP374gh7_0cAXQOL31VUBw_zrS-7VCQ";

    const supabaseClient = window.supabase.createClient(
        SUPABASE_URL,
        SUPABASE_KEY
    );

    console.log("OK");

async function loadCounter() {
    const { data, error } = await supabaseClient
        .from('site_stats')
        .select('total_downloads')
        .eq('id', 1)
        .single();

    if (error) {
    console.error("NE OK Supabase:", error);
    alert("NE OK " + error.message);
    return;
}

console.log("Данные Supabase:", data);

    document.getElementById('totalDownloads').textContent =
        data.total_downloads;
}

loadCounter();

document.querySelectorAll('.download-mod').forEach(link => {
    link.addEventListener('click', async () => {
        const { error } = await supabaseClient.rpc('increment_downloads');
        if (error) {
            console.error('NE OK', error);
        } else {
            console.log('OKK');
            loadCounter();
        }
    });
});
