const isTelegram = Object.keys(window).some(key => key.toLowerCase().includes('telegram'))

export default {
  isTelegram
}
