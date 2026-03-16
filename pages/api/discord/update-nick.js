export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send();
  
  const { uid, newNick } = JSON.parse(req.body);
  const botToken = process.env.DISCORD_BOT_TOKEN;
  const guildId = process.env.GUILD_ID;

  const response = await fetch(`https://discord.com/api/v10/guilds/${guildId}/members/${uid}`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bot ${botToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ nick: newNick }),
  });

  if (response.ok) res.status(200).json({ success: true });
  else res.status(400).json({ error: "Gagal ganti nick. Cek posisi role Bot!" });
}
