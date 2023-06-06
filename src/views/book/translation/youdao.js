import $ from 'jquery'
import CryptoJS from 'crypto-js'

function getMp3Url(query) {
  const appKey = '515207d24815b668'; // 应用id
  const key = 'VVNatxtPwtMnsh6TlHIOKErWUwQ3u8nb' //注意：暴露appSecret，有被盗用造成损失的风险 秘钥
  const salt = (new Date).getTime();
  const curtime = Math.round(new Date().getTime() / 1000);
  // const query = '您好，欢迎再次使用有道智云文本翻译API接口服务';
  // 多个query可以用\n连接  如 query='apple\norange\nbanana\npear'
  const from = 'zh-CHS';
  const to = 'en';
  const str1 = appKey + truncate(query) + salt + curtime + key;
  // const vocabId =  '您的用户词表ID';
  const sign = CryptoJS.SHA256(str1).toString(CryptoJS.enc.Hex);
  return new Promise((resolve, reject) => {
    $.ajax({
      url: 'https://openapi.youdao.com/api',
      type: 'post',
      dataType: 'jsonp',
      data: {
        q: query,
        appKey: appKey,
        salt: salt,
        from: from,
        to: to,
        sign: sign,
        signType: "v3",
        curtime: curtime,
        // vocabId: vocabId,
      },
      success: function (data) {
        resolve(data.translation[0])
      },
      fail(err) {
        reject(err)
      }
    });
  })
}

function truncate(q) {
  const len = q.length;
  if (len <= 20) return q;
  return q.substring(0, 10) + len + q.substring(len - 10, len);
}

export { getMp3Url }