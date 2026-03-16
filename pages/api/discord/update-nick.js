export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });

  const { uid, newNick } = JSON.parse(req.body);
  const guildId = process.env.GUILD_ID;
  const botToken = process.env.DISCORD_BOT_TOKEN;

  try {
    const response = await fetch(`https://discord.com/api/v10/guilds/${guildId}/members/${uid}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bot ${botToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nick: newNick }),
    });

    if (response.ok) {
      return res.status(200).json({ success: true });
    } else {
      const error = await response.json();
      return res.status(400).json(error);
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
