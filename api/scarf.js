// Secure Vercel function scaffold for YouCam AI Scarf Virtual Try-On.
// Keep YOUCAM_API_KEY in Vercel Environment Variables only.
const API = 'https://yce-api-01.makeupar.com/s2s/v2.0';
module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  const key = process.env.YOUCAM_API_KEY;
  if (!key) return res.status(503).json({ error: 'AI try-on is not configured. Add YOUCAM_API_KEY in Vercel Environment Variables.' });
  if (req.method === 'GET') {
    const id = (req.query && req.query.task_id) || '';
    if (!/^[A-Za-z0-9_-]{8,200}$/.test(id)) return res.status(400).json({ error: 'A valid task_id is required.' });
    try {
      const r = await fetch(`${API}/task/scarf/${encodeURIComponent(id)}`, { headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' } });
      const j = await r.json().catch(() => ({}));
      if (!r.ok) return res.status(r.status).json({ error: j.error || j.message || 'YouCam task check failed.' });
      const d = j.data || j;
      return res.status(200).json({ task_status: d.task_status || d.status || null, url: (d.results && d.results.url) || null, error: d.error || j.error || null });
    } catch (_) { return res.status(502).json({ error: 'Could not reach YouCam task API.' }); }
  }
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed.' });
  // Intentionally fail clearly until a secure upload flow is added. The browser
  // photo is multipart data; do not pretend it is already a public src_file_url.
  return res.status(501).json({ error: 'The interface is ready, but secure photo upload to YouCam is not configured yet. No API units were spent.' });
};
