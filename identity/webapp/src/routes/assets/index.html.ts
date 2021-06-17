const style = `
<style>
  html,
  body {
    height: 100vh;
    margin: 0;
  }

  body {
    display: grid;
    place-items: center;
    font-family: 'Helvetica Neue Light Web', HelveticaNeue-Light, 'Helvetica Neue Light', 'Helvetica Neue',
      Helvetica, Arial, sans-serif;
    font-size: 24px;
  }

  @media only screen and (min-width: 600px) {
    body {
      background-color: #f0ede3;
    }
  }

  .container {
    background-color: white;
  }

  @media only screen and (min-width: 600px) {
    .container {
      border-radius: 10px;
      max-width: 40em;
      padding: 3em 0;
    }
  }

  .wrapper {
    display: grid;
  }

  @media only screen and (min-width: 600px) {
    .wrapper {
      grid-template-columns: 1fr 1fr;
    }
  }

  .wrapper > div {
    padding: 3em;
  }

  .logo {
    display: grid;
    place-items: center;
  }

  @media only screen and (min-width: 600px) {
    .logo {
      border-right: 1px solid gainsboro;
    }
  }

  a,
  a:link,
  a:visited {
    color: inherit;
    text-decoration: underline;
  }

  a:hover,
  a:active {
    text-decoration: none;
  }
</style>
`;

const logoSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="256" height="84" viewBox="0 0 166.549 56">
  <title>Wellcome Collection</title>
  <polygon
    fill="black"
    points="32.875,7.228 25.238,7.228 22.573,19.125 22.424,19.125 19.866,7.228 13.009,7.228 10.563,19.125 10.489,19.125 7.635,7.228 0,7.228 6.004,26.463 13.527,26.463 16.381,14.64 16.456,14.64 19.236,26.463 26.759,26.463"
  />
  <path
    fill="black"
    d="M51.129,18.494c0-7.486-3.296-11.748-10.933-11.748 c-6.079,0-10.154,4.56-10.154,10.155c0,6.411,4.629,10.043,10.784,10.043c4.373,0,8.415-1.929,9.896-6.078h-6.856 c-0.592,0.927-1.89,1.371-3.077,1.371c-2.299,0-3.558-1.556-3.741-3.744H51.129z M37.085,14.677 c0.333-2.075,1.592-3.225,3.78-3.225c1.888,0,3.223,1.446,3.223,3.225H37.085z"
  />
  <rect fill="black" x="50.636" width="7.34" height="26.463" />
  <rect fill="black" x="59.712" width="7.338" height="26.463" />
  <path
    fill="black"
    d="M86.91,14.528c-0.445-5.299-4.744-7.782-9.783-7.782 c-5.783,0-10.417,4.041-10.417,10.117c0,6.079,4.634,10.082,10.417,10.082c5.188,0,9.301-2.928,10.005-8.154h-7.005 c-0.148,1.518-1.26,2.815-2.854,2.815c-2.817,0-3.225-2.407-3.225-4.744c0-2.334,0.408-4.779,3.225-4.779 c0.778,0,1.409,0.22,1.853,0.629c0.48,0.409,0.742,1.037,0.814,1.816H86.91z"
  />
  <path
    fill="black"
    d="M99.643,16.827c0,2.038-0.37,4.78-3.148,4.78c-2.781,0-3.15-2.742-3.15-4.78 c0-2.039,0.369-4.743,3.15-4.743C99.273,12.083,99.643,14.788,99.643,16.827z M106.982,16.827c0-5.337-3.263-10.081-10.487-10.081 c-7.228,0-10.488,4.744-10.488,10.081c0,5.335,3.261,10.118,10.488,10.118C103.719,26.945,106.982,22.162,106.982,16.827z"
  />
  <path
    fill="black"
    d="M106.785,26.463h7.339V16.047c0-2.001,0.631-3.445,2.484-3.445 c2.225,0,2.407,1.63,2.407,3.445v10.416h7.339V16.047c0-2.001,0.629-3.445,2.483-3.445c2.223,0,2.409,1.63,2.409,3.445v10.416h7.34 V13.27c0-3.116-1.668-6.523-6.599-6.523c-4.782,0-6.263,2.779-6.56,3.002c-0.89-1.929-3.112-3.002-5.191-3.002 c-2.666,0-4.816,0.814-6.299,3.04h-0.073V7.228h-7.08V26.463z"
  />
  <path
    fill="black"
    d="M159.447,18.494c0-7.486-3.298-11.748-10.933-11.748 c-6.077,0-10.155,4.56-10.155,10.155c0,6.411,4.634,10.043,10.785,10.043c4.374,0,8.414-1.929,9.896-6.078h-6.857 c-0.591,0.927-1.889,1.371-3.074,1.371c-2.298,0-3.558-1.556-3.744-3.744H159.447z M145.403,14.677 c0.332-2.075,1.593-3.225,3.78-3.225c1.889,0,3.225,1.446,3.225,3.225H145.403z"
  />
  <path
    fill="black"
    d="M31.329,42.585c-0.445-5.299-4.745-7.783-9.783-7.783 c-5.784,0-10.416,4.04-10.416,10.118C11.13,51,15.762,55,21.546,55c5.188,0,9.301-2.927,10.004-8.153h-7.003 c-0.147,1.521-1.261,2.818-2.852,2.818c-2.82,0-3.226-2.411-3.226-4.745c0-2.335,0.406-4.782,3.226-4.782 c0.775,0,1.407,0.225,1.854,0.631c0.481,0.407,0.737,1.038,0.813,1.816H31.329z"
  />
  <path
    fill="black"
    d="M43.692,44.883c0,2.038-0.369,4.782-3.149,4.782s-3.149-2.744-3.149-4.782 s0.369-4.745,3.149-4.745S43.692,42.845,43.692,44.883z M51.031,44.883c0-5.338-3.262-10.081-10.488-10.081 c-7.229,0-10.488,4.743-10.488,10.081C30.055,50.22,33.314,55,40.543,55C47.77,55,51.031,50.22,51.031,44.883z"
  />
  <rect fill="black" x="50.647" y="28.056" width="7.34" height="26.464" />
  <rect fill="black" x="59.724" y="28.056" width="7.338" height="26.464" />
  <path
    fill="black"
    d="M87.811,46.552c0-7.488-3.3-11.75-10.934-11.75 c-6.077,0-10.152,4.559-10.152,10.155C66.725,51.369,71.357,55,77.508,55c4.373,0,8.413-1.926,9.896-6.076h-6.856 c-0.595,0.925-1.891,1.37-3.077,1.37c-2.299,0-3.559-1.557-3.745-3.742H87.811z M73.765,42.734 c0.333-2.075,1.596-3.225,3.779-3.225c1.891,0,3.226,1.447,3.226,3.225H73.765z"
  />
  <path
    fill="black"
    d="M106.553,42.585c-0.443-5.299-4.743-7.783-9.784-7.783 c-5.782,0-10.412,4.04-10.412,10.118C86.357,51,90.987,55,96.769,55c5.189,0,9.304-2.927,10.008-8.153h-7.006 c-0.147,1.521-1.259,2.818-2.853,2.818c-2.819,0-3.227-2.411-3.227-4.745c0-2.335,0.407-4.782,3.227-4.782   c0.778,0,1.407,0.225,1.854,0.631c0.481,0.407,0.738,1.038,0.812,1.816H106.553z"
  />
  <path
    fill="black"
    d="M114.174,29.429h-7.34v5.854h-3.26v4.521h3.26v9.193 c0,5.261,3.448,5.745,6.561,5.745c1.558,0,3.226-0.224,4.707-0.224v-5.559c-0.555,0.073-1.112,0.108-1.668,0.108 c-1.854,0-2.26-0.775-2.26-2.556v-6.709h3.928v-4.521h-3.928V29.429z"
  />
  <rect fill="black" x="119.014" y="28.056" width="7.336" height="5.153" />
  <rect fill="black" x="119.014" y="35.284" width="7.336" height="19.236" />
  <path
    fill="black"
    d="M139.727,44.883c0,2.038-0.371,4.782-3.148,4.782 c-2.781,0-3.151-2.744-3.151-4.782s0.37-4.745,3.151-4.745C139.356,40.138,139.727,42.845,139.727,44.883z M147.067,44.883 c0-5.338-3.263-10.081-10.488-10.081c-7.228,0-10.489,4.743-10.489,10.081c0,5.337,3.262,10.117,10.489,10.117 C143.804,55,147.067,50.22,147.067,44.883z"
  />
  <path
    fill="black"
    d="M146.537,54.52h7.337V44.365c0-3.075,1.669-3.706,2.93-3.706 c2.149,0,2.408,1.556,2.408,3.78V54.52h7.338V41.324c0-4.41-3.15-6.521-6.596-6.521c-2.928,0-4.894,1.002-6.267,2.926h-0.072 v-2.444h-7.078V54.52z"
  />
</svg>
`;

export default function buildHtml(bundle: string, prefix = ''): string {
  return `
<html lang="en">
  <head>
    <title>Account management</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link
      rel="apple-touch-icon"
      sizes="180x180"
      href="https://i.wellcomecollection.org/assets/icons/apple-touch-icon.png"
    />
    <link
      rel="shortcut icon"
      href="https://i.wellcomecollection.org/assets/icons/favicon.ico"
      type="image/ico"
    />
    <link
      rel="icon"
      type="image/png"
      href="https://i.wellcomecollection.org/assets/icons/favicon-32x32.png"
      sizes="32x32"
    />
    <link
      rel="icon"
      type="image/png"
      href="https://i.wellcomecollection.org/assets/icons/favicon-16x16.png"
      sizes="16x16"
    />
    <link
      rel="manifest"
      href="https://i.wellcomecollection.org/assets/icons/manifest.json"
    />
    <link
      rel="mask-icon"
      href="https://i.wellcomecollection.org/assets/icons/safari-pinned-tab.svg"
      color="#000000"
    />
    <script crossorigin src="https://unpkg.com/react@16/umd/react.development.js"></script>
    <script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
  </head>
  <body>
    <noscript>
      ${style}
      <div class="container">
        <div class="wrapper">
          <div class="logo">
            <a href="https://wellcomecollection.org/">
              ${logoSvg}
            </a>
          </div>
          <div>
            <p>JavaScript must be enabled to register an account or log in.</p>
            <p>
              For further assistance, please
              <a
                href="https://wellcomelibrary.org/using-the-library/services-and-facilities/contact-us/"
                target="_blank"
                rel="noopener noreferrer"
              >
                contact us
              </a>
            </p>
          </div>
        </div>
      </div>
    </noscript>
    <div id="root" data-context-path="${prefix}"></div>
    <script type="application/javascript" src="${bundle}"></script>
  </body>
</html>
`;
}
