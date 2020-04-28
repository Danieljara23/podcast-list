import Link from "next/link"
import { css } from '@emotion/core'
import slugify from '../helpers/slug';

const ChannelGrid = ({ channels }) => {

  const styles = css`
		& .channels {
			display: grid;
			grid-gap: 15px;
			padding: 15px;
      grid-template-columns: repeat( auto-fill, minmax(160px, 1fr));
      
      & a {
        text-decoration: none;
        color: black;
      }
		}

		& .channel {
			display: block;
			border-radius: 3px;
			box-shadow: 0px 2px 6px rgba(0,0,0,0.15);
			margin-botto: 0.5em;

			& img {
				width: 100%;
			}

			& h2 {
				padding: 5px; font-size: 0.9em;
				font-weight: 600;
				margin: 0;
				text-align: center;
			}
		}
  `;
  
  return(
    <div css={styles}>
				<div className="channels">
          {channels.map(channel => (
            <Link href={"/channel/[channel]"} as={`/channel/${channel.id}`}>
              <a className="channel">
                <img src={channel.urls.logo_image.original} alt=""/>
                <h2>{ channel.title }</h2>
              </a>
            </Link>
          ))}
				</div>
			</div>
    
  )
}

export default ChannelGrid