/**
 * Soma-FM API handler
 */
 import {stations} from './stations';


export default {
  getChannels( callback ) {

      const list = this._parseChannels(stations);
      return callback(null, list);
    // const apiurl = 'https://somafm.com/channels.json';
    // const error  = 'There was a problem fetching the latest list of music channels from SomaFM.';

    // axios.get( apiurl ).then( res => {
    //   const list = this._parseChannels( res.data.channels );
    //   if ( !list.length ) return callback( error, [] );
    //   return callback( null, list );
    // })
    // .catch( e => {
    //   return callback( error + String( e.message || '' ), [] );
    // });
  },

  // fetch songs for a channel
  getSongs( channel, callback ) {
        const apiurl = channel.songsurl || '';
    const title  = channel.title || '...';
    const error  = 'There was a problem loading the list of songs for channel '+ title +' from SomaFM.';
    return callback(null, []);
    // const apiurl = channel.songsurl || '';
    // const title  = channel.title || '...';
    // const error  = 'There was a problem loading the list of songs for channel '+ title +' from SomaFM.';

    // axios.get( apiurl ).then( res => {
    //   if ( !res.data.songs ) return callback( error, [] );
    //   return callback( null, res.data.songs );
    // })
    // .catch( e => {
    //   return callback( error + String( e.message || '' ), [] );
    // });
  },

  // parse channels list from api response
  _parseChannels( channels ) {
    let output = [];
    for (let c of channels) {
      c.plsfile   = '';
      c.songsurl  = '';
      c.infourl   = '';
      c.twitter   = '#';
      c.mp3file = c.mp3file;
      c.route     = '/channel/'+ c.id;
      c.listeners = c.listeners;
      c.updated   = 1 | 0;
      c.favorite = false;
      c.active = false;
      output.push(c);
    }
    // if ( Array.isArray( channels ) ) {
    //   for ( let c of channels ) {
    //     if ( !Array.isArray( c.playlists ) ) continue;
    //     c.plsfile   = c.playlists.filter( p => ( p.format === 'mp3' && /^(highest|high)$/.test( p.quality ) ) ).shift().url || '';
    //     c.mp3file   = 'https://ice1.somafm.com/'+ c.id +'-128-mp3';
    //     c.songsurl  = 'https://somafm.com/songs/'+ c.id +'.json';
    //     c.infourl   = 'https://somafm.com/'+ c.id +'/';
    //     c.twitter   = c.twitter ? 'https://twitter.com/@'+ c.twitter : '';
    //     c.route     = '/channel/'+ c.id;
    //     c.listeners = c.listeners | 0;
    //     c.updated   = c.updated | 0;
    //     c.favorite  = false;
    //     c.active    = false;
    //     output.push( c );
    //   }
    // }
    return output;
  }
}
