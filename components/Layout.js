import Link from "next/link"
import Head from "next/head"
import { css, Global } from '@emotion/core'
import NextNprogress from 'nextjs-progressbar';


const Layout = ({ children, title }) => {

  const bodyStyle = css`
    body {
      width: 100%;
      margin: 0;
      font-family: system-ui;
    }
  `;

  const layoutStyles = css`
    & header {
      color: #fff;
      background: #8756ca;
      padding: 15px;
      text-align: center;
    }

    & header a{
      color: #fff;
      text-decoration: none;
    }
  
  `;
  return(
    <div css={layoutStyles}>
      <NextNprogress
        color="#29D"
        startPosition={0}
        stopDelayMs={0}
        height="5"
      />
      <Head>
        <title> { title } </title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="stylesheet" type="text/css" href="/static/css/nprogress.css" />

      </Head>
      <Global
				styles={bodyStyle}
			/>
      <header><Link href="/"><a>Podcasts</a></Link></header>
      {children}
    </div>
  )
}

export default Layout;