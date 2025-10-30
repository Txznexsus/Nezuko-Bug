import fetch from 'node-fetch'

let handler = async (m, { conn }) => {
  const namegrupo = 'Grupo Oficial'
  const gp1 = 'https://chat.whatsapp.com/DI8aRRIXmmRKC3cUn9R0Hv?mode=wwt'

  const namechannel = 'Canal del Bot'
  const channel = 'https://whatsapp.com/channel/0029Vb5l5w1CHDyjovjN8s2V'

  const dev = '🍃 ძᥱsᥲrr᥆ᥣᥣᥲძ᥆r: ᥒᥱ᥊zᥙs'
  const catalogo = 'https://qu.ax/TJRoN.jpg'
  const emojis = '📡'

  let grupos = `
╭─⟪ *🌐 GRUPOS OFICIALES* ⟫
│
│ 🦋 *${namegrupo}*
│ ${gp1}
│
│ 🧃 *${namechannel}*
│ ${channel}
│
│ ${dev}
╰─────────────────╯
`

  await conn.sendMessage(m.chat, {
    image: { url: catalogo },
    caption: grupos.trim()
  }, { quoted: m })

  await m.react(emojis)
}

handler.help = ['grupos']
handler.tags = ['info']
handler.command = ['grupos', 'links', 'groups']

export default handler