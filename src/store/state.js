import * as Config from "assets/js/config";

const state = {
  // 当前详情歌手对象
  singer: {},
  // 播放状态
  playing: false,
  // 播放器展开还是收起
  fullScreen: false,
  // 播放列表
  playList: [],
  // 歌曲循序列表，如果是随机播放，跟播放列表的顺序是不一样的
  sequenceList: [],
  // 播放类型
  mode: Config.playMode.sequence,
  // 当前播放索引
  currentIndex: -1,
};

export default state;
