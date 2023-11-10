import { GuildMember, MessageReaction, Role, User } from 'discord.js';

export default {
  name: 'messageReactionAdd',
  async execute(reaction: MessageReaction, user: User) {
    const emoji = reaction.emoji;

    if (emoji.id == '1170553087015014420' && reaction.count == 1) {
      const users = [];
      (await reaction.message.guild.members.fetch()).map(
        (member: GuildMember) => {
          if (
            member.roles.cache.find((role: Role) => role.name == 'Athenian')
          ) {
            users.push(member.user.username);
          }
          return member;
        }
      );
      console.log(users);
    }
  },
};
