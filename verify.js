export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { tiktok, cashtag } = req.body;

  try {
    // TikTok check
    const ttRes = await fetch(`https://www.tiktok.com/@${tiktok}`, {
      headers: { "User-Agent": "Mozilla/5.0" }
    });

    // Cash App check
    const caRes = await fetch(`https://cash.app/${cashtag}`, {
      headers: { "User-Agent": "Mozilla/5.0" }
    });

    res.status(200).json({
      tiktok: ttRes.status === 200,
      cashtag: caRes.status === 200
    });

  } catch (err) {
    res.status(500).json({ error: "Verification failed" });
  }
}
