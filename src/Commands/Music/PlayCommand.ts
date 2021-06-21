import { Player } from 'erela.js';
import { Command } from 'eris';
import config from '../../config';
import KannaClient from '../../Struct/KannaClient';
import i18next from 'i18next';
export default class PlayCommand extends Command {
  constructor(public client: KannaClient) {
    super('play', async (msg, args) => {
      if(!this.client.erela.leastUsedNodes.first()?.connected) {
        msg.channel.createMessage({
          embed: {
            description: i18next.t('utility.music.lavalinkNotConnected'),
            color: config.color,
          },
        });
        return;
      }
      if (!msg.member?.voiceState.channelID) {
        msg.channel.createMessage({
          embed: {
            description: i18next.t('utility.music.mustOnVoice'),
            color: config.color,
          },
        });
        return;
      }
      if (this.client.erela.players.get(msg.guildID as string) && this.client.erela.players.get(msg.guildID as string)?.voiceChannel && msg.member.voiceState.channelID !== this.client.erela.players.get(msg.guildID as string)?.voiceChannel) {
        msg.channel.createMessage({
          embed: {
            description: i18next.t('utility.music.sameAsVoice'),
            color: config.color,
          },
        });
        return;
      }
      const { loadType, tracks, playlist } = await this.client.erela.search(args.join(' '), msg.member);
      if (loadType === 'LOAD_FAILED') {
        msg.channel.createMessage({
          embed: {
            description: i18next.t('utility.music.loadFailed'),
            color: config.color,
          },
        });
        return;
      } if (loadType === 'NO_MATCHES') {
        msg.channel.createMessage({
          embed: {
            description: i18next.t('utility.music.noMatches'),
            color: config.color,
          },
        });
        return;
      }
      const player = new Player({
        voiceChannel: msg.member.voiceState.channelID,
        textChannel: msg.channel.id,
        guild: msg.guildID as string,
        volume: 100,
      });

      if (!player.voiceChannel) player.setVoiceChannel(msg.member.voiceState.channelID);
      if (player.state !== 'CONNECTED') player.connect();

      if (loadType === 'PLAYLIST_LOADED') {
        if (player.state !== 'CONNECTED') player.connect();
        player.queue.add(tracks);
        msg.channel.createMessage({
          embed: {
            description: i18next.t('command.play.addedPlaylistToQueue', { playlistName: playlist?.name, tracks: tracks.length, author: msg.author.username }),
            color: config.color,
            thumbnail: {
              url: tracks[0].thumbnail ?? undefined,
            },
          },
        });
        if (!player.playing && !player.paused && player.queue.totalSize === tracks.length) player.play();
        return;
      }
      if (player.state !== 'CONNECTED') player.connect();
      player.queue.add(tracks[0]);
      msg.channel.createMessage({
        embed: {
          description: i18next.t('command.play.addedTrackToQueue', { trackName: tracks[0].title, author: msg.author.username }),
          color: config.color,
          thumbnail: {
            url: tracks[0].thumbnail ?? undefined,
          },
        },
      });

      if (!player.playing && !player.paused && !player.queue.size) return player.play();
    }, {
      description: 'play music.',
      aliases: ['p'],
      argsRequired: true,
    });
  }

    public category = 'Music'
}
