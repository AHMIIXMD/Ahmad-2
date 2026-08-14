const axios = require("axios");
const { cmd } = require("../command");

// 📌 Global Configuration
const CHANNEL_JID = '120363429017707564@newsletter';
const CHANNEL_NAME = "QUEEN-MD TECH 🦋";
const MAIN_IMAGE = "https://files.catbox.moe/15j4gb.jpg";

cmd({
  pattern: "srepo",
  desc: "Fetch information about a GitHub repository.",
  category: "other",
  react: "🎀",
  filename: __filename
}, async (conn, m, store, { from, args, reply }) => {
  try {
    const repoName = args.join(" ");
    if (!repoName) {
      return reply("❌ Please provide a GitHub repository in the format 📌 `owner/repo`.");
    }

    const apiUrl = `https://api.github.com/repos/${repoName}`;
    const { data } = await axios.get(apiUrl);

    let responseMsg = `
╭━━━⪨ 🎀 𝐐𝐔𝐄𝐄𝐍 𝐌𝐃 🎀 ⪩━━━╮
  
  📁 ‣ 𝐑𝐞𝐩𝐨   : ${data.name}
  👤 ‣ 𝐎𝐰𝐧𝐞𝐫  : ${data.owner.login}
  ⭐ ‣ 𝐒𝐭𝐚𝐫𝐬  : ${data.stargazers_count}
  🍴 ‣ 𝐅𝐨𝐫𝐤𝐬  : ${data.forks_count}
  📅 ‣ 𝐂𝐫𝐞𝐚𝐭𝐞 : ${new Date(data.created_at).toLocaleDateString()}
  📝 ‣ 𝐃𝐞𝐬𝐜   : ${data.description || "No description"}
  🔗 ‣ 𝐔𝐫𝐥    : ${data.html_url}

╰━━━━━━━━━━━━━━━━━━━━━━╯

> 🎀 *ᴘᴏᴡᴇʀᴇᴅ ʙʏ QUEEN🦋*`;

    await conn.sendMessage(from, { 
      image: { url: MAIN_IMAGE },
      caption: responseMsg.trim(),
      contextInfo: {
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: CHANNEL_JID,
          newsletterName: CHANNEL_NAME,
          serverMessageId: 143
        }
      }
    }, { quoted: m });

  } catch (error) {
    console.error("GitHub API Error:", error);
    reply(`⚠️ Error fetching repository data: ${error.response?.data?.message || error.message}`);
  }
});
