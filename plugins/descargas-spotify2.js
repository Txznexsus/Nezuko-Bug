import fetch from 'node-fetch'
import Jimp from 'jimp'
const { proto, generateWAMessageFromContent } = (await import('@whiskeysockets/baileys')).default

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text)
    return m.reply(
      `🍂 *Uso correcto:*\n\n✦ \`${usedPrefix + command}\` <url o nombre de canción>\n\n🍬 Ejemplo:\n${usedPrefix + command} https://open.spotify.com/track/2ROQe6QkIXODJRx0y8UjzV`
    )

  try {
    await conn.sendMessage(m.chat, { react: { text: '🕓', key: m.key } })

    const apiUrl = `https://api.stellarwa.xyz/dl/spotify?url=${encodeURIComponent(text)}&key=Shadow_Core`
    const res = await fetch(apiUrl)
    if (!res.ok) throw await res.text()
    const data = await res.json()
    if (!data.status || !data.data?.download) throw '❌ No pude obtener la descarga del audio.'

    const d = data.data
    const json = {
      title: d.title || 'Desconocido',
      author: 'Spotify Music',
      image: d.thumbnail || null,
      url: d.download
    }

    let info = null
    try {
      const query = encodeURIComponent(json.title)
      const infoRes = await fetch(`https://api.yupra.my.id/api/search/spotify?q=${query}`)
      if (infoRes.ok) {
        const infoData = await infoRes.json()
        info = infoData.result?.[0] || null
      }
    } catch (err) {
      console.log('⚠️ Error al obtener info de Yupra:', err)
    }

    const caption = `
\`\`\`🎧 Título: ${json.title}
🍃 Artista: ${info?.artist || json.author}
🍂 Álbum: ${info?.album || 'Desconocido'}
🪴 Lanzamiento: ${info?.release_date || 'N/A'}
💐 Duración: ${info?.duration || 'N/A'}
🌴 Spotify: ${info?.spotify_preview || text}\`\`\``

    let thumb = null
    if (json.image) {
      try {
        const img = await Jimp.read(json.image)
        img.resize(300, Jimp.AUTO)
        thumb = await img.getBufferAsync(Jimp.MIME_JPEG)
      } catch (err) {
        console.log('⚠️ Error al procesar miniatura:', err)
      }
    }
    const msg = generateWAMessageFromContent(
      m.chat,
      {
        viewOnceMessage: {
          message: {
            messageContextInfo: { deviceListMetadataVersion: 2 },
            interactiveMessage: proto.Message.InteractiveMessage.fromObject({
              body: proto.Message.InteractiveMessage.Body.create({
                text: caption,
              }),
              footer: proto.Message.InteractiveMessage.Footer.create({
                text: '🌿 ᴋᴀɴᴇᴋɪ ʙᴏᴛ ᴠ3 - sᴘᴏᴛɪғʏ ᴍᴜsɪᴄ 🎧',
              }),
              header: proto.Message.InteractiveMessage.Header.create({
                hasMediaAttachment: true,
                documentMessage: {
                  url: json.url,
                  mimetype: 'audio/mpeg',
                  fileName: `${json.title}.mp3`,
                },
                ...(thumb ? { jpegThumbnail: thumb } : {}),
              }),
              nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
                buttons: [
                  {
                    name: 'cta_url',
                    buttonParamsJson: JSON.stringify({
                      display_text: '🍬 ᴇsᴄᴜᴄʜᴀʀ ᴇɴ sᴘᴏᴛɪғʏ',
                      url: info?.spotify_preview || text,
                    }),
                  },
                  {
                    name: 'cta_url',
                    buttonParamsJson: JSON.stringify({
                      display_text: '🕸️ Canal oficial',
                      url: 'https://whatsapp.com/channel/0029VbBPa8EFsn0aLfyZl23j',
                    }),
                  },
                ],
              }),
            }),
          },
        },
      },
      { quoted: m }
    )

    await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id })

    await conn.sendMessage(
      m.chat,
      {
        audio: { url: json.url },
        mimetype: 'audio/mpeg',
        fileName: `${json.title}.mp3`,
        contextInfo: {
          externalAdReply: {
            title: json.title,
            body: info?.artist || json.author,
            mediaType: 2,
            thumbnailUrl: json.image,
            renderLargerThumbnail: true,
            sourceUrl: info?.spotify_preview || text,
          },
        },
      },
      { quoted: m }
    )

    m.react('✅')
  } catch (e) {
    console.error(e)
    m.reply('❌ Error al procesar la descarga de Spotify.')
  }
}

handler.help = ['music <url|nombre>']
handler.tags = ['download']
handler.command = ['music']

export default handler