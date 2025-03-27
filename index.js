'use strict';

const urlFor = require('hexo-util').url_for.bind(hexo);

async function get_aid_via_bilibili_api(bvid) {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 1000);
    
    const response = await fetch(`https://api.bilibili.com/x/web-interface/wbi/view?bvid=${bvid}`, {
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    
    if (!response.ok) throw new Error('API request failed');
    
    const data = await response.json();
    if (data.code !== 0 || !data.data?.aid) throw new Error('Invalid API response');
    
    return data.data.aid.toString();
  } catch (error) {
    return null;
  }
}

function get_aid_from_bvid(bvid) {
  const magicStr = 'FcwAPNKTMug3GV5Lj7EJnHpWsx4tb8haYeviqBz6rkCy12mUSDQX9RdoZf';
  const table = {};
  for (let i = 0; i < magicStr.length; i++) table[magicStr[i]] = BigInt(i);
  let s = [0, 1, 2, 9, 7, 5, 6, 4, 8, 3, 10, 11];
  const BASE = 58n, MAX = (1n << 51n), LEN = 12;
  const XOR = 23442827791579n, MASK = 2251799813685247n;
  let r = 0n;
  for (let i = 3; i < LEN; i++) {
      r = r * BASE + BigInt(table[bvid[s[i]]]);
  }
  return (r & MASK) ^ XOR;
}

hexo.extend.tag.register('bilibili', async function(args) {
    const bvid = args[0];
    if (!bvid) return '';
    
    let aid = await get_aid_via_bilibili_api(bvid);
    if (!aid) {
      aid = get_aid_from_bvid(bvid).toString().replace('n', '');
    }
    
    return `<div style="position: relative; width: 100%; height:0; padding-bottom: 75%;">
              <iframe src="//player.bilibili.com/player.html?isOutside=false&aid=${aid}&bvid=${bvid}&p=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true" style="position: absolute; width: 100%; height: 100%; Left: 0; top:0;"></iframe>
            </div>`;
  }, {async: true});