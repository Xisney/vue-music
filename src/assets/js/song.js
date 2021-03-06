import { getSongsUrl } from "api/song";
import { ERR_OK } from "api/config";

export default class Song {
  constructor({ id, mid, singer, name, album, duration, image, url }) {
    this.id = id;
    this.mid = mid;
    this.name = name;
    this.album = album;
    this.duration = duration;
    this.image = image;
    this.url = url;
    this.singer = singer;
  }
}

export function createSong(musicData) {
  return new Song({
    id: musicData.songid,
    mid: musicData.songmid,
    name: musicData.songname,
    album: musicData.albumname,
    singer: filterSinger(musicData.singer),
    duration: musicData.interval, // 歌曲时长
    image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
    url: musicData.url,
  });
}

export function isValidMusic(musicData) {
  return musicData.songid && musicData.albummid;
  // &&(!musicData.pay || musicData.pay.payalbumprice === 0)
}

function filterSinger(singer) {
  const res = [];
  if (!singer || singer.length === 0) {
    return null;
  }
  singer.forEach((el) => {
    res.push(el.name);
  });
  return res.join("/");
}

export function processSongsUrl(songs) {
  if (!songs.length) {
    return Promise.resolve(songs);
  }
  return getSongsUrl(songs).then((res) => {
    if (res.code === ERR_OK) {
      let midUrlInfo = res.url_mid.data.midurlinfo;
      midUrlInfo.forEach((info, index) => {
        let song = songs[index];
        song.url = `http://dl.stream.qqmusic.qq.com/${info.purl}`;
      });
    }
    return songs;
  });
}
