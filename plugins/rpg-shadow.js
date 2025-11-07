// un codigo bug creado x shadow.xyz jsjsjs 🌾

const handler = async (m, { conn, args, command }) => {
  const ownerNumber = global.owner;
  const senderNumber = m.sender.split('@')[0];
  global.tempAccess = global.tempAccess || {};

  if (command === 'temporal' || command === 'adds' || command === 'tempaccess') {
    if (senderNumber !== ownerNumber)
      return conn.reply(m.chat, '🚫 *Solo el dueño puede usar este comando.*', m);

    let target;
    if (m.quoted) {
      target = m.quoted.sender;
    } else if (m.mentionedJid && m.mentionedJid.length > 0) {
      target = m.mentionedJid[0];
    } else if (args[0]) {
      target = args[0].replace(/[^0-9]/g, '') + '@s.whatsapp.net';
    }

    if (!target) {
      return conn.reply(
        m.chat,
        '⚠️ *Menciona, responde o escribe el número del usuario que tendrá acceso temporal.*\n\nEjemplo:\n.adds al mensaje del usuario o\n.temporal @usuario',
        m
      );
    }

    const userName = await conn.getName(target);
    global.tempAccess[target.split('@')[0]] = true;

    await conn.reply(
      m.chat,
      `✅ *Acceso temporal concedido a:* ${userName}\n⏳ *Duración:* 5 segundos.`, //😏
      m
    );

    setTimeout(() => {
      delete global.tempAccess[target.split('@')[0]];
    }, 5000);

    return;
  }

  if (command === 'shadow') {
    if (senderNumber !== ownerNumber && !global.tempAccess[senderNumber]) {
      return conn.reply(
        m.chat,
        `🚫 *Acceso denegado*\n\nSolo *${ownerNumber}* puede usar este comando.`,
        m
      );
    }

    const user = global.db.data.users[m.sender];
    if (!user.lastclaim) user.lastclaim = 0;
    if (!user.coin) user.coin = 0;
    if (!user.exp) user.exp = 0;
    if (!user.joincount) user.joincount = 0;

    const oneMinuteInMillis = 60_000; // 1 minuto 😏
    const now = Date.now();
    const timeRemaining = user.lastclaim + oneMinuteInMillis - now;

    if (timeRemaining > 0) {
      return conn.reply(
        m.chat,
        `🕒 *Ya reclamaste tu recompensa🌸*\n\n⌛ Vuelve en: *${msToTime(timeRemaining)}*`,
        m
      );
    }

    const recompensa = 1_000_000_000; // cambie x la cantidad q kiera xD
    user.coin += recompensa;
    user.exp += recompensa;
    user.joincount += recompensa;
    user.lastclaim = now;

    const senderName = await conn.getName(m.sender);

    const texto = `
╭━━━〔 🎁 rᥱᥴ᥆m⍴ᥱᥒsᥲ 🎋 〕━━⬣
│
│ 💎 *ᥙsᥙᥲrі᥆:* @${senderNumber}
│ 🧸 *ᥒ᥆mᑲrᥱ:* ${senderName}
│
│ 🌸 *һᥲs rᥱᥴіᑲіძ᥆:*
│ 💵 *${recompensa.toLocaleString()} monedas*
│ 🧠 *${recompensa.toLocaleString()} XP*
│ 🪙 *${recompensa.toLocaleString()} tokens*
│
│ 🕒 ⍴r᥆́᥊іm᥆ rᥱᥴᥣᥲm᥆ ᥱᥒ 1 mіᥒᥙ𝗍᥆.
│
╰━━━〔 ᥒᥱzᥙk᥆-ᑲ᥆𝗍 mძ 🌷 〕━━⬣
`;

    await conn.sendMessage(
      m.chat,
      {
        text: texto,
        mentions: [m.sender],
        contextInfo: {
          externalAdReply: {
            title: '🎁 Recompensa de ᥒᥱzᥙk᥆-ᑲ᥆𝗍 🌸',
            body: 'Has sido recompensado generosamente!',
            thumbnailUrl: 'https://qu.ax/ALOZa.jpg',
            sourceUrl: 'https://github.com/Shadow-nex',
            mediaType: 1,
            renderLargerThumbnail: true
          }
        }
      },
      { quoted: m }
    );
  }
};

handler.help = ['shadow (Owner/user)', 'temporal (owner)'];
handler.tags = ['rpg', 'owner'];
handler.command = ['shadow', 'temporal', 'adds', 'tempaccess'];
handler.fail = null;
handler.premium = false;
export default handler;

function msToTime(duration) {
  let seconds = Math.floor((duration / 1000) % 60);
  let minutes = Math.floor((duration / (1000 * 60)) % 60);
  let hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
  let days = Math.floor(duration / (1000 * 60 * 60 * 24));
  return `${days > 0 ? days + 'd ' : ''}${hours > 0 ? hours + 'h ' : ''}${
    minutes > 0 ? minutes + 'm ' : ''
  }${seconds}s`;
}