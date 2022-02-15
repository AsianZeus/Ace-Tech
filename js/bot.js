function inject() {
  ;(function(global) {
    if (!Array.prototype.indexOf) {
      Array.prototype.indexOf = function(obj, start) {
        var i, j
        i = start || 0
        j = this.length
        while (i < j) {
          if (this[i] === obj) {
            return i
          }
          i++
        }
        return -1
      }
    }

    function detectIEEdgeFireFox() {
      var ua = window.navigator.userAgent
      var msie = ua.indexOf('MSIE ')
      if (msie > 0) {
        return {
          browser: 'ie10',
          version: parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10)
        }
      }
      var trident = ua.indexOf('Trident/')
      if (trident > 0) {
        var rv = ua.indexOf('rv:')
        return {
          browser: 'ie11',
          version: parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10)
        }
      }
      var edge = ua.indexOf('Edge/')
      if (edge > 0) {
        return {
          browser: 'edge',
          version: parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10)
        }
      }
      const ff = ua.indexOf('Firefox/')
      if (ff > 0) {
        const rv = ua.indexOf('rv:')
        const version = parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10)
        if (version < 63) {
          return {
            browser: 'firefox',
            version: parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10)
          }
        }
      }
      return false
    }

    function start(noShadow) {
      var shadowHost = document.getElementById('botcopy-widget-root')
      var shadowRoot = shadowHost
      if (!noShadow) {
        shadowRoot = shadowHost.attachShadow({ mode: 'open' })
      }

      var styleTag = document.createElement('link')
      styleTag.rel = 'stylesheet'
      styleTag.type = 'text/css'
      styleTag.href = 'https://widget.botcopy.com/static/css/master.css'
      styleTag.media = 'all'
      shadowRoot.appendChild(styleTag)

      var font = document.createElement('link')
      font.rel = 'stylesheet'
      font.href = 'https://fonts.googleapis.com/css?family=Open+Sans'
      font.media = 'all'
      shadowRoot.appendChild(font)

      var injectedScript = document.createElement('script')
      injectedScript.type = 'text/javascript'
      injectedScript.async = true
      injectedScript.src = 'js/master.js'
      injectedScript.dataset.cookieconsent = 'ignore' // ignore cookiebot consent
      shadowRoot.appendChild(injectedScript, embedderElement)
    }

    if (!global.Botcopy) {
      global.Botcopy = {}
    }

    // just get the embedder element by id, can also be a <div> (in portal) or a <script> for clients
    var embedderElement = document.getElementById(
      'botcopy-embedder-d7lcfheammjct'
    )

    // Create a div
    var div = document.createElement('div')
    div.id = 'botcopy-d7lcfheammjct'

    div.className = 'botcopy-embedder-d7lcfheammjct-embeddable'
    div.innerHTML = '<div id="botcopy-widget-root"></div>'

    document.body.appendChild(div)

    const SNIPPET_ID = 'botcopy-embedder-d7lcfheammjct'
    const currentScript = window.document.getElementById(SNIPPET_ID)
    const disableShadowDom =
      currentScript &&
      (currentScript.getAttribute('data-disableShadowDom') === 'true' ||
        currentScript.getAttribute('data-disableShadowDom') === '1')

    const IEEdgeFirefoxResult = detectIEEdgeFireFox()
    if (IEEdgeFirefoxResult) {
      var shadyScript = document.createElement('script')
      shadyScript.type = 'text/javascript'
      shadyScript.async = false
      shadyScript.src =
        'https://cdnjs.cloudflare.com/ajax/libs/shadydom/1.1.0/shadydom.min.js'
      shadyScript.dataset.cookieconsent = 'ignore'
      shadyScript.addEventListener('load', function() {
        start(disableShadowDom)
      })
      embedderElement.appendChild(shadyScript, embedderElement)
    } else {
      start(disableShadowDom)
    }
  })(this)
}

if (document.body) {
  inject()
} else {
  window.addEventListener('load', inject)
}