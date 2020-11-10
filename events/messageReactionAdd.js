module.exports = (reaction, user) => {
  if (user.bot) return;

  function update(message = reaction.message) {
    message.edit({
      embed: {
        ...message.embeds[0],
        fields: [
          {
            name: 'Active',
            value: reaction.client.queue.length
              ? reaction.client.queue
                  .slice(0, 4)
                  .map((id, idx) => `${idx + 1}. <@${id}>`)
                  .join('\n')
              : "The queue is empty. Now's your chance! :wind_blowing_face:",
          },
          {
            name: 'Waiting',
            value: reaction.client.queue[4]
              ? reaction.client.queue
                  .slice(4)
                  .map((id, idx) => `${idx + 1}. <@${id}>`)
                  .join('\n')
              : "Nobody's waiting :wind_blowing_face:",
          },
        ],
      },
    });
  }

  function admit(user) {
    reaction.client.guilds.cache
      .first()
      .roles.cache.get(require('../config.json').roleID)
      .members.forEach((member) => {
        member
          .send({
            embed: {
              author: {
                name: user.username,
                iconURL: user.displayAvatarURL(),
              },
              title: `${user.tag} is ready for buffing!`,
              description: `<@${user.id}>`,
              footer: {
                text: 'Please react ✅ once you have finished serving them',
              },
              color: 3066993,
            },
          })
          .then((msg) => {
            msg.react('✅');
            reaction.client.active.set(msg.id, user.id);
          });
      });

    user.send(
      "You're up! An alert has been sent to the buffing team- please be patient and they will get to you as soon as possible."
    );
  }

  if (
    reaction.emoji.name === '📥' &&
    reaction.message.id === reaction.client.message.id
  ) {
    if (!reaction.client.queue.includes(user.id)) {
      reaction.client.queue.push(user.id);
      if (reaction.client.queue.slice(0, 4).includes(user.id)) {
        admit(user);
      }
      update();
    }
    reaction.users.remove(user);
  } else if (reaction.client.active.has(reaction.message.id)) {
    const id = reaction.client.active.get(reaction.message.id);
    reaction.client.queue.splice(reaction.client.queue.indexOf(id), 1);
    reaction.users.remove(user);
    reaction.message.edit({
      embed: { color: 3066993, title: "You're all set!" },
    });
    reaction.message.delete({ timeout: 5000 });
    reaction.client.active.delete(reaction.message.id);
    if (reaction.client.queue[3])
      admit(reaction.client.users.cache.get(reaction.client.queue[3]));
    update(reaction.client.message);
  }
};
