const {PermissionsBitField, EmbedBuilder, ButtonStyle, Client, GatewayIntentBits, ChannelType, Partials, ActionRowBuilder, SelectMenuBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, InteractionType, SelectMenuInteraction, ButtonBuilder } = require("discord.js");
const config = require("./config.js");
const db = require("croxydb")
const client = new Client({
  partials: [
    Partials.Message, 
    Partials.Channel, 
    Partials.GuildMember, 
    Partials.Reaction, 
    Partials.GuildScheduledEvent,
    Partials.User, 
    Partials.ThreadMember, 
  ],
  intents: [
    GatewayIntentBits.Guilds, 
    GatewayIntentBits.GuildMembers, 
    GatewayIntentBits.GuildBans, 
    GatewayIntentBits.GuildEmojisAndStickers,
    GatewayIntentBits.GuildIntegrations,
    GatewayIntentBits.GuildWebhooks, 
    GatewayIntentBits.GuildInvites,
    GatewayIntentBits.GuildVoiceStates, 
    GatewayIntentBits.GuildPresences, 
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions, 
    GatewayIntentBits.GuildMessageTyping, 
    GatewayIntentBits.DirectMessages, 
    GatewayIntentBits.DirectMessageReactions, 
    GatewayIntentBits.DirectMessageTyping, 
    GatewayIntentBits.MessageContent, 
  ],
});

//KAlfheim
module.exports = client;
//KAlfheim
require("./events/message.js")
require("./events/ready.js")
//KAlfheim
client.login(config.token || process.env.TOKEN)
//KAlfheim
const modal = new ModalBuilder()
.setCustomId('form')
.setTitle('Alfheim - Kayıt Sistemi!')
  const a1 = new TextInputBuilder()
  .setCustomId('ICisim')
  .setLabel('ICİsim')
  .setStyle(TextInputStyle.Paragraph) 
  .setMinLength(5)
  .setPlaceholder('Jack Cross')
  .setRequired(true)
  const a2 = new TextInputBuilder()
  .setCustomId('OOCisim')
  .setLabel('OOCisim')
  .setStyle(TextInputStyle.Paragraph) 
  .setMinLength(3)
  .setPlaceholder('Kadir')
  .setRequired(true)
  const a3 = new TextInputBuilder()
  .setCustomId('Yaş')
  .setLabel('Yaş')
  .setStyle(TextInputStyle.Paragraph) 
  .setMinLength(2)
  .setPlaceholder('17')
  .setRequired(true)
  const a4 = new TextInputBuilder()
  .setCustomId('FivemSaati')
  .setLabel('FivemSaati')
  .setStyle(TextInputStyle.Paragraph) 
  .setMinLength(3)
  .setPlaceholder('300')
  .setRequired(true)
  const a5 = new TextInputBuilder()
  .setCustomId('NedenAlfheim')
  .setLabel('NedenAlfheim')
  .setStyle(TextInputStyle.Paragraph) 
  .setMinLength(10)
  .setPlaceholder('Acıklayınız')
  .setRequired(true)
   const row = new ActionRowBuilder().addComponents(a1);
  const row2 = new ActionRowBuilder().addComponents(a2);
  const row3 = new ActionRowBuilder().addComponents(a3);
  const row4 = new ActionRowBuilder().addComponents(a4);
  const row5 = new ActionRowBuilder().addComponents(a5);
  modal.addComponents(row, row2, row3, row4, row5);
client.on('interactionCreate', async (interaction) => {
//KAlfheim
	if(interaction.customId === "kayıt"){
    await interaction.showModal(modal);
	}//KAlfheim
 //KAlfheim
})  
client.on('interactionCreate', async interaction => {//KAlfheim
  if (interaction.type !== InteractionType.ModalSubmit) return;
  if (interaction.customId === 'form') {
    const ICisim = interaction.fields.getTextInputValue('ICisim')
     const OOCisim = interaction.fields.getTextInputValue('OOCisim')
      const Yaş = interaction.fields.getTextInputValue('Yaş')
       const FivemSaati = interaction.fields.getTextInputValue('FivemSaati')
        const NedenAlfheim = interaction.fields.getTextInputValue('NedenAlfheim')
      //KAlfheim
        let log = db.fetch(`log_${interaction.guild.id}`)
      const embed = new EmbedBuilder()
      .setTitle("FRP Kayıt - Kayıt Et!")
      .setDescription(`Kullanıcı: ${interaction.user}\n\nICİsim: **${ICisim}**\n\nOOCisim: **${OOCisim}**\n\nYaş: **${Yaş}**\n\nFivemSaati: **${FivemSaati}**\n\nNedenAlfheim: **${NedenAlfheim}**`)
      .setColor("#007fff")
      const row = new ActionRowBuilder()
      .addComponents(
      new ButtonBuilder()
        .setLabel("Kayıt Et!")
        .setStyle(ButtonStyle.Primary)//KAlfheim
        .setCustomId("kayıtet"),
        new ButtonBuilder()
        .setLabel("Kayıt Etme!")
        .setStyle(ButtonStyle.Danger)
        .setCustomId("kayıtetme"))
      await interaction.reply({content: "Yetkililere formun başarıyla gönderildi.", ephemeral: true})
        client.channels.cache.get(log).send({embeds: [embed], components: [row]}).then(async m => {
     
          db.set(`kullanıcı_${m.id}`, interaction.user.id)
            
            //KAlfheim
        })
      //KAlfheim
    
    }//KAlfheim
  })
    client.on('interactionCreate', interaction => {
	if (!interaction.isButton()) return;
 if (interaction.customId === 'kayıtetme') {
   let message = interaction.message
   message.delete()
   }//KAlfheim
       if (interaction.customId === 'kayıtet') {
 let message = interaction.message
   message.delete()
         let kullanıcı = db.fetch(`kullanıcı_${interaction.message.id}`)
         let rol = db.fetch(`kayıtlı${interaction.guild.id}`)
        interaction.guild.members.cache.get(kullanıcı).roles.add(rol)
         interaction.reply({content: "Kullanıcı Başarıyla kayıt edildi.", ephemeral: true})
        }  
      });
         //KAlfheim
