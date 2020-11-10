module.exports = (reaction, user) => {
  if (user.id === user.client.user.id)
    reaction.message.react(reaction.emoji.name);
};
