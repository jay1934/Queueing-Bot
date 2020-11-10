module.exports = async (message) => {
  if (
    message.content.startsWith('.init') &&
    message.member.hasPermission('ADMINISTRATOR')
  ) {
    if (message.client.message)
      return message.channel.send(
        'I already sent a queue message- please delete the previous one before using this command again.'
      );
    message.delete();
    const embed = await message.channel.send({
      embed: {
        title: 'Waiting Queue for Buffs',
        fields: [
          {
            name: 'Active',
            value: "The queue is empty. Now's your chance! :wind_blowing_face:",
          },
        ],
        footer: {
          text: 'React with :inbox_tray: to join the queue!',
        },
        color: 3066993,
      },
    });

    embed.pin();
    message.client.message = embed;
    await embed.react('📥');
  }
};
