'use strict'

const $ = window.$
const SEARCH = $('.header__search')
const STATIONS = ['ESL_SC2', 'OgamingSC2', 'cretetion', 'freecodecamp', 'storbeck', 'habathcx', 'RobotCaleb', 'noobs2ninjas', 'Fortnite']

const TEMPLATE = function getTemplate(station) {
  $.ajax({
    type: 'GET',
    url: `https://wind-bow.gomix.me/twitch-api/channels/${station}?callback=?`,
    dataType: 'jsonp',
    success: function (data) {
      (function getStreamingStatus() {
        $.ajax({
          type: 'GET',
          url: `https://wind-bow.gomix.me/twitch-api/streams/${data._id}`,
          dataType: 'jsonp',
          success: function (streamingStatus) {
            let template = `
              <li class="main__list-item main__list-item--${streamingStatus.stream ? `online` : `offline`}">
                <div class="main__inner-wrapper">
                  <img class="main__img" src="${data.logo}"/>
                  <a class="main__link" href="${data.url}">
                    <p class="main__station">${data.display_name}</p>
                  </a>
                  ${streamingStatus.stream ? `<p class="main__description">${data.status}</p>` : ``}
                </div>
                <p class="main__status" data-status="${streamingStatus.stream ? `online` : `offline`}">
                  ${streamingStatus.stream ? `online` : `offline`}
                </p>
              </li>
            `
            $('.main__list').append(template)
          },

          error: function (err) {
            console.log(err)
            return err
          }
        })
      }(data))
    },
    error: function (err) {
      console.log(err)
      return err
    }
  })
}

// Take Stations and build template
STATIONS.forEach((station) => {
  TEMPLATE(station)
})

$(document).ready(function () {
  $('.header__options').on('click', function (e) { // Add Click Event on one Element only
    if ($(e.target).hasClass('btn')) { // Target Buttons only
      $('.header__btn').removeClass('header__btn--active')
      $(e.target).addClass('header__btn--active')
    }

    // All/Online/Offline Button Click
    let option = $(e.target).data().option
    switch (option) {
      case 'on':
        if ($('.main__status').data().status === 'offline') {
          $('.main__status').closest('.main__list-item')
            .css('display', 'none')
        } else {
          $('.main__status').closest('.main__list-item')
            .css('display', '')
        }
        break
      case 'off':
        if ($('.main__status').data().status === 'online') {
          $('.main__status').closest('.main__list-item')
            .css('display', 'none')
        } else {
          $('.main__status').closest('.main__list-item')
            .css('display', '')
        }
        break
      case 'all':
      default:
        $('.main__list-item').css('display', '')
        break
    }
  })
})

// Search Mechanism
SEARCH.on('keyup', function (e) {
  let query = e.target.value.toUpperCase()
  let stations = $('.main__station').toArray()
  for (let i = 0; i < stations.length; i++) {
    let station = $(stations[i]).text().toUpperCase()
    if (station.indexOf(query) > -1) {
      $(stations[i]).closest('.main__list-item')
        .css('display', '')
    } else {
      $(stations[i]).closest('.main__list-item')
        .css('display', 'none')
    }
  }
})
