/* global window */
import en from './en'
import zhCN from './zh-cn'

// let $lang = 'en';
let $lang = 'zh-cn';
const $messages = {
  en,
  'zh-cn': zhCN
};

function translate(key, messages) {
  if (messages && messages[$lang]) {
    let message = messages[$lang];
    const keys = key.split('.');
    for (let i = 0; i < keys.length; i += 1) {
      const property = keys[i];
      const value = message[property];
      if (i === keys.length - 1) return value;
      if (!value) return undefined;
      message = value;
    }
  }
  return undefined;
}

function t(key) {
  let v = translate(key, $messages);
  if (!v && window && window.x && window.x.spreadsheet && window.x.spreadsheet.$messages) {
    v = translate(key, window.x.spreadsheet.$messages);
  }
  return v || '';
}

function tf(key) {
  return () => t(key);
}

function locale(lang, message) {
  $lang = lang;
  if (message) {
    $messages[lang] = message;
  }
}

export default {
  t,
};

export {
  locale,
  t,
  tf,
};
