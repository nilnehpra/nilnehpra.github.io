/**
 * video.js
 * version: 20180507v4
 */

var VideoList = [
  // anime
  '91天',
  '野球少年',
  '重生計劃',
  '這個美術部有問題',
  'D機關',
  '在下坂本',
  '亞人',
  '逆轉裁判',
  '食戟之靈',
  '暗殺教室',
  '排球少年',
  '黑子的籃球',
  '偵探小隊',
  '黑傑克',
  '速宅男', // "飙速宅男", "飆速宅男", "飚速宅男"
  '頭文字',
  '第一神拳',
  '寄生獸',
  '七大罪',
  // 美劇
  '福爾摩斯',
  '黑名單',
  '絕命毒師',
  '絕命律師',
  'X檔案',
  '紙牌屋',
  '魔術師',
  '電腦狂人',
  // 日劇
  '陸王',
  '荒野',
  '刑警7人',
  '逃避可恥',
  '死亡筆記',
  '重版出來',
  'Specialist',
  '半澤直樹',
  'Doctor-X',
  '孤獨的美食家',
  '深夜食堂',
  '相棒',
  '貓侍',
  '101次求婚',
  // 韓劇
  // 陸劇
  '鄉村愛情',
  // end
  '_END_'
];

var ActorList = [
  // 男演員
  '小泉孝太郎', '神木隆之介',
  '木村拓哉', '唐澤壽明', '東山紀之', '相葉雅紀', '反町隆史', '江口洋介', '沢村一樹', '竹野内豐', '松田翔太',
  '堺雅人', '小栗旬', '大野智', '草剪剛', '阿部寬', '錦戶亮', '玉木宏', '松本潤', '櫻井翔', '水谷豐',
  '尹相铉',
  '胡歌', '瑛太',
  // 女演員
  '仲間由紀惠', '戶田惠梨香', '松島菜菜子', '橋本奈奈未', '飯豐萬理江',
  '新垣結衣', '米倉涼子', '北川景子', '桐谷美玲', '松下奈緒', '筱原涼子', '篠原涼子', '比嘉愛未', '木村佳乃',
  '天海祐希', '相武紗季', '剛力彩芽', '堀北真希', '長澤雅美', '柴咲コウ', '高畑充希', '三吉彩花',
  '柴崎幸', '武井咲', '绫濑遙', '綾瀨遙', '松隆子',
  '沢尻', '澤尻', '波瑠',
  // "杏",
  '李瑤媛', '李瑶媛', '全智賢', '崔智友', '李英愛', '秀愛',
  '劉詩詩', '高圓圓', '江疏影', '王曉晨', '孫俪',
  // end
  '_END_'
];

var VIDEOTOOL = {};

VIDEOTOOL.trimDigits = function (s, d) {
  var len = s.length;
  if (len > d) { // 將超過[d]碼數字之前綴0消去
    len = s.length - d;
    for (var i = 0; i < len; i++) {
      console.log(s.charAt(0));
      if (s.charAt(0) === "0") {
        s = s.substring(1, s.length);
      } else {
        break;
      }
    }
  }

  return s;
};

/**
 * @param {any} keyword
 * @returns [type, data1, data2]
 *   type=1: ["012223_345", "012223-345"]
 *   type=2: ["IPZ", "123"]
 */
VIDEOTOOL.matchAV = function (keyword) {
  var re = /(\d{6})([-_]{1})(\d{3,})/; // 012223_345 or 012223-345, {3,} means 3 or more
  var len;
  var match = keyword.match(re);
  if (match !== null && match.length === 4) {
    match[3] = VIDEOTOOL.trimDigits(match[3], 3); // 將超過3碼數字之前綴0消去
    return [1, '{0}_{1}'.aplFormat(match[1], match[3]), '{0}-{1}'.aplFormat(match[1], match[3])]; // ["012223_345", "012223-345"]
  }

  re = /([A-Za-z\d]+)([-_]?)(\d{3,})/; // ipz123 or ipz-123 or ipz_123 or 300maan-123
  // var match = re.exec(keyword); // ["ipz123", "ipz", "", "123"] or ["ipz123", "ipz", "-", "123"]
  match = keyword.match(re); // ["ipz123", "ipz", "", "123"] or ["ipz123", "ipz", "-", "123"]
  log(match);
  if (match !== null && match.length === 4) {
    match[3] = VIDEOTOOL.trimDigits(match[3], 3); // 將超過3碼數字之前綴0消去
    return [2, match[1], match[3]]; // ["片名", "數字"]
  }

  // match nothing
  return null;
};
