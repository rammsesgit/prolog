import Head from 'next/head'
import NProgress from 'nprogress'
import Router from 'next/router'

Router.onRouteChangeStart = url => {
  NProgress.start()
}
Router.onRouteChangeComplete = () => NProgress.done()
Router.onRouteChangeError = () => NProgress.done()

export default ({ children, title }) => {
  return (
    <div>
      <Head>
        <meta charSet='UTF-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <meta httpEquiv='X-UA-Compatible' content='ie=edge' />

        <link rel='apple-touch-icon' sizes='57x57' href='/icon-its/apple-icon-57x57.png' />
        <link rel='apple-touch-icon' sizes='60x60' href='/icon-its/apple-icon-60x60.png' />
        <link rel='apple-touch-icon' sizes='72x72' href='/icon-its/apple-icon-72x72.png' />
        <link rel='apple-touch-icon' sizes='76x76' href='/icon-its/apple-icon-76x76.png' />
        <link rel='apple-touch-icon' sizes='114x114' href='/icon-its/apple-icon-114x114.png' />
        <link rel='apple-touch-icon' sizes='120x120' href='/icon-its/apple-icon-120x120.png' />
        <link rel='apple-touch-icon' sizes='144x144' href='/icon-its/apple-icon-144x144.png' />
        <link rel='apple-touch-icon' sizes='152x152' href='/icon-its/apple-icon-152x152.png' />
        <link rel='apple-touch-icon' sizes='180x180' href='/icon-its/apple-icon-180x180.png' />
        <link
          rel='icon'
          type='image/png'
          sizes='192x192'
          href='/icon-its/android-icon-192x192.png'
        />
        <link rel='icon' type='image/png' sizes='32x32' href='/icon-its/favicon-32x32.png' />
        <link rel='icon' type='image/png' sizes='96x96' href='/icon-its/favicon-96x96.png' />
        <link rel='icon' type='image/png' sizes='16x16' href='/icon-its/favicon-16x16.png' />
        <link rel='manifest' href='/icon-its/manifest.json' />
        <meta name='msapplication-TileColor' content='#ffffff' />
        <meta name='msapplication-TileImage' content='/icon-its/ms-icon-144x144.png' />
        <meta name='theme-color' content='#ffffff' />

        <title>{title}</title>
      </Head>

      <main>{children}</main>

      <style jsx global>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          border-collapse: collapse;
          outline: none;
        }
        body {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          font-family: sans-serif;
          width: 100vw;
          overflow-x: hidden;
        }
        li {
          list-style: none;
        }
        a {
          text-decoration: none;
        }
        input:focus,
        input:hover {
          background-color: rgba(0, 0, 0, 0.1);
        }

        .btn {
          background: none;
          cursor: pointer;
          border-radius: 3px;
          border: none;
          transition: 0.2s;
        }
        .btn:active {
          transform: scale(0.86);
        }
        .btn.cancel {
          background: linear-gradient(to right, #e72d2d 0%, #ff2f2f 100%);
        }
        .btn.ok {
          background: linear-gradient(to right, #229006 0%, #6cba57 100%);
        }
        .container {
          display: flex;
          justify-content: space-around;
          align-items: center;
          flex-wrap: wrap;
        }
        .column {
          flex-direction: column;
        }
        .row {
          flex-direction: row;
        }
        .between {
          justify-content: space-between;
        }
        .t-center {
          text-align: center;
        }
        .t-justify {
          text-align: justify;
        }
        .t-right {
          text-align: right;
        }
        .t-left {
          text-align: left;
        }
        .bold {
          font-weight: bold;
        }
        .lowercase {
          text-transform: lowercase;
        }
        .uppercase {
          text-transform: uppercase;
        }
        .capitalize {
          text-transform: capitalize;
        }
        .t-err {
          color: #f00;
        }
        .t-ok {
          color: #050;
        }
        .per-100 {
          width: 100%;
        }
        .line {
          display: inline-block;
        }
        .vw-100 {
          width: 100vw;
        }
        .hidden {
          display: none;
        }
        .relative {
          position: relative;
        }
        .absolute {
          position: absolute;
        }
        .not-active {
          pointer-events: none;
          color: gray !important;
        }
        /* <~~ Global */

        /* Make clicks pass-through */
        #nprogress {
          pointer-events: none;
        }

        #nprogress .bar {
          background: #29d;

          position: fixed;
          z-index: 1031;
          top: 0;
          left: 0;

          width: 100%;
          height: 2px;
        }

        /* Fancy blur effect */
        #nprogress .peg {
          display: block;
          position: absolute;
          right: 0px;
          width: 100px;
          height: 100%;
          box-shadow: 0 0 10px #29d, 0 0 5px #29d;
          opacity: 1;

          -webkit-transform: rotate(3deg) translate(0px, -4px);
          -ms-transform: rotate(3deg) translate(0px, -4px);
          transform: rotate(3deg) translate(0px, -4px);
        }

        /* Remove these to get rid of the spinner */
        #nprogress .spinner {
          display: block;
          position: fixed;
          z-index: 1031;
          top: 15px;
          right: 15px;
        }

        #nprogress .spinner-icon {
          width: 25px;
          height: 25px;
          box-sizing: border-box;

          border: solid 2px transparent;
          border-top-color: #29d;
          border-left-color: #29d;
          border-radius: 50%;

          -webkit-animation: nprogress-spinner 400ms linear infinite;
          animation: nprogress-spinner 400ms linear infinite;
        }

        .nprogress-custom-parent {
          overflow: hidden;
          position: relative;
        }

        .nprogress-custom-parent #nprogress .spinner,
        .nprogress-custom-parent #nprogress .bar {
          position: absolute;
        }

        @-webkit-keyframes nprogress-spinner {
          0% {
            -webkit-transform: rotate(0deg);
          }
          100% {
            -webkit-transform: rotate(360deg);
          }
        }
        @keyframes nprogress-spinner {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  )
}
