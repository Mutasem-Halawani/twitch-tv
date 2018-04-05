'use strict'

const $ = window.$
const STATIONS = ['ESL_SC2', 'OgamingSC2', 'cretetion', 'freecodecamp', 'storbeck', 'habathcx', 'RobotCaleb', 'noobs2ninjas', 'Fortnite']

STATIONS.forEach((station) => {
  $.ajax({
    type: 'GET',
    url: `https://wind-bow.gomix.me/twitch-api/channels/${station}?callback=?`,
    dataType: 'jsonp',
    success: function (data) {
      console.log(data)
      $.ajax({
        type: 'GET',
        url: `https://wind-bow.gomix.me/twitch-api/streams/${data._id}`,
        dataType: 'jsonp',
        success: function (streamingStatus) {
          // console.log(streamingStatus)
          let template = `
            ${streamingStatus.stream ? `<li class="main__list-item main__list-item--online">` : `<li class="main__list-item main__list-item--offline">`}
              <a href="${data.url}">
                <p class="main__station">${data.display_name}</p>
              </a>
                <p class="main__status" data-status="${streamingStatus.stream ? `online` : `offline`}">
                  ${streamingStatus.stream ? `online` : `offline`}
                </p>
            </li>
          `
          // console.log(template)
        },
        error: function (err) {
          console.log(err)
        }
      })
    },
    error: function (err) {
      console.log(err)
    }
  })
})
