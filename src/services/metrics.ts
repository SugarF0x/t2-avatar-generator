enum ID {
  GENERATE_AVATAR = 'GENERATE_AVATAR',
  DOWNLOAD_VIDEO = 'DOWNLOAD_VIDEO',
}

function log(id: ID) {
  // @ts-ignore, this one is injected in html head
  ym(98148094, 'reachGoal', id)
}

export default {
  log,
  ID,
}
