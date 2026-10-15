import { kv } from '@vercel/kv';
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  const KEY = 'v01_rol_datos_final';
  try {
    if (req.method === 'POST') {
      await kv.set(KEY, req.body);
      return res.status(200).json({ ok: true });
    } else {
      const data = await kv.get(KEY);
      return res.status(200).json(data || {});
    }
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}
