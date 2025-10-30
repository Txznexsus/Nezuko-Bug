/*import speed from 'performance-now'
import { exec } from 'child_process'
import moment from 'moment-timezone'
import fetch from 'node-fetch'

let handler = async (m, { conn }) => {
  let timestamp = speed()
  let latensi = speed() - timestamp

  const start = new Date().getTime()
  await conn.sendMessage(m.chat, { text: `*🍃 𝘊𝘢𝘭𝘤𝘶𝘭𝘢𝘯𝘥𝘰 𝘱𝘪𝘯𝘨...*` }, { quoted: m })
  const end = new Date().getTime()
  const latency = end - start

  const uptime = process.uptime()
  const hours = Math.floor(uptime / 3600)
  const minutes = Math.floor((uptime % 3600) / 60)
  const secondsUp = Math.floor(uptime % 60)
  const uptimeFormatted = `${hours}h ${minutes}m ${secondsUp}s`

  const usedRAM = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)
  const fechaHora = moment().tz('America/Lima').format('YYYY/MM/DD, h:mm A')

  const thumbBuffer = Buffer.from(await (await fetch('https://files.catbox.moe/ge2vz7.jpg')).arrayBuffer())

  exec(`neofetch --stdout`, async (error, stdout) => {
    let sysInfo = stdout.toString("utf-8").replace(/Memory:/, "Ram:")

    let response = 
` \`⚡ 𝗦 𝗧 𝗔 𝗧 𝗨 𝗦 • 𝗣 𝗜 𝗡 𝗚 🌿\`

┌ ° 🌟 *Ping:* ${latency} ms
│ ° 📡 *Latency:* ${latensi.toFixed(4)} ms
│ ° 💻 *RAM Usage:* ${usedRAM} MB
│ ° ⏳ *Uptime:* ${uptimeFormatted}
└ ° 🗓️ *Date/Time:* ${fechaHora}
\`\`\`${sysInfo.trim()}\`\`\`
> 🍃 ᥒᥱzᥙk᥆-ᑲ᥆𝗍`

    await conn.sendMessage(m.chat, {
      text: response,
      mentions: [m.sender],
      contextInfo: {
        externalAdReply: {
          title: '🧃 ᥒᥱzᥙk᥆-ᑲ᥆𝗍 🌾 ',
          body: '🌷 ⍴᥆ᥕᥱrᥱძ ву ᥒᥱ᥊zᥙs',
          thumbnail: thumbBuffer,
          sourceUrl: redes,
          mediaType: 1,
          renderLargerThumbnail: true
        }
      }
    }, { quoted: fkontak })
  })
}

handler.help = ['ping', 'p']
handler.tags = ['info']
handler.command = ['ping', 'p']

export default handler*/

import speed from 'performance-now'
import { exec } from 'child_process'
import moment from 'moment-timezone'
import os from 'os'
import fetch from 'node-fetch'

let handler = async (m, { conn }) => {
  const start = new Date().getTime()
  await conn.sendMessage(m.chat, { text: `*⚙️ 𝘊𝘢𝘭𝘤𝘶𝘭𝘢𝘯𝘥𝘰 𝘱𝘪𝘯𝘨...*` }, { quoted: m })
  const end = new Date().getTime()
  const latency = end - start

  const timestamp = speed()
  const latensi = speed() - timestamp

  const uptime = process.uptime()
  const hours = Math.floor(uptime / 3600)
  const minutes = Math.floor((uptime % 3600) / 60)
  const secondsUp = Math.floor(uptime % 60)
  const uptimeFormatted = `${hours}h ${minutes}m ${secondsUp}s`

  const usedRAM = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)
  const totalRAM = (os.totalmem() / 1024 / 1024).toFixed(2)
  const freeRAM = (os.freemem() / 1024 / 1024).toFixed(2)
  const cpu = os.cpus()[0].model
  const cores = os.cpus().length
  const loadAvg = os.loadavg().map(n => n.toFixed(2)).join(', ')
  const nodeVersion = process.version
  const platform = os.platform()
  const arch = os.arch()
  const fechaHora = moment().tz('America/Lima').format('YYYY/MM/DD, h:mm A')

  const thumbBuffer = Buffer.from(await (await fetch('https://files.catbox.moe/ge2vz7.jpg')).arrayBuffer())

  exec(`neofetch --stdout`, async (error, stdout) => {
    let sysInfo = stdout.toString('utf-8').replace(/Memory:/, 'Ram:')
    let response = 
` \`⚡ 𝗦 𝗧 𝗔 𝗧 𝗨 𝗦 • 𝗣 𝗜 𝗡 𝗚 🌿\`

┌ ° 🌟 *Ping:* ${latency} ms  
│ ° 📡 *Latency:* ${latensi.toFixed(4)} ms  
│ ° 💻 *RAM Usage:* ${usedRAM}/${totalRAM} MB  
│ ° 🧠 *RAM Libre:* ${freeRAM} MB  
│ ° 🏗️ *CPU:* ${cpu.split(' @')[0]} (${cores} Núcleos)  
│ ° ⚙️ *Arquitectura:* ${arch}  
│ ° 🪟 *Sistema:* ${platform.toUpperCase()}  
│ ° 🔢 *Versión Node:* ${nodeVersion}  
│ ° 🔄 *Load Promedio:* ${loadAvg}  
│ ° ⏳ *Uptime:* ${uptimeFormatted}  
└ ° 🗓️ *Date/Time:* ${fechaHora}

\`\`\`${sysInfo.trim()}\`\`\`
> ☄︎ кαиєкι вσт ν3 | 𝙿𝙾𝚆𝙴𝚁𝙴𝙳 𝙱𝚈 𝚂𝙷𝙰𝙳𝙾𝚆-𝚇𝚈𝚉`

    await conn.sendMessage(m.chat, {
      text: response,
      mentions: [m.sender],
      contextInfo: {
        externalAdReply: {
          title: '👑 𝐊𝐚𝐧𝐞𝐤𝐢 𝐁𝐨𝐭 𝐕3 💫 ',
          body: '🌷 ρσωєяє∂ ву ѕнα∂σω',
          thumbnail: thumbBuffer,
          sourceUrl: redes,
          mediaType: 1,
          renderLargerThumbnail: true
        }
      }
    }, { quoted: fkontak })
  })
}

handler.help = ['ping', 'p']
handler.tags = ['info']
handler.command = ['ping', 'p']

export default handler