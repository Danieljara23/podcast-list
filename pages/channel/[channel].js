import { useState } from "react";
import { css, jsx, Global } from '@emotion/core'
import Layout from '../../components/Layout';
import ChannelGrid from '../../components/ChannelGrid';
import PodcastList from '../../components/PodcastList';
import PodcastPlayer from '../PodcastPlayer';
import Error from '../_error';

const channel = ({ channel, audioClips, series, statusCode }) => {
  const [ openPodcast, setPodcast ] = useState(null);

  const setOpenPodcast = (event, podcast) => {
    event.preventDefault();
    if( event.metaKey || event.ctrlKey || event.shiftKey || (event.nativeEvent && event.nativeEvent.which === 2) ){
      return
    }
    setPodcast(podcast);
  }

  const closePodcast = (event) =>{
    event.preventDefault();
    setPodcast(null);
  }

  const styles = css`
    & h1 {
      font-weight: 600;
      padding: 15px;
    }
    & .banner {
      width: 100%;
      padding-bottom: 25%;
      background-position: 50% 50%;
      background-size: cover;
      background-color: #aaa;
    }

    & .modal {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 99999;
    }
		
  `;
  if( statusCode != 200) return <Error statusCode={statusCode} />

  return(
    <Layout title={channel.title}>
      <div css={styles}>
        <div className="banner" style={{ backgroundImage: `url(${channel.urls.banner_image.original})` }} />
        
        { openPodcast && <div className="modal">
          <PodcastPlayer podcast={openPodcast} onClose={closePodcast}  />
          </div> }
        
        <h1>{ channel.title }</h1>

        <h2>Series</h2>
        <ChannelGrid channels={series}/>

        <h2>Últimos Podcasts</h2>
        <PodcastList audioClips={audioClips} onClickPodcast={setOpenPodcast}/>

      </div>
    </Layout>
  )
}

export async function getServerSideProps({ query, res }) {

  let channelId = query.channel;

  try{
    let [ reqChannel, reqAudioClips, reqSeries ] = await Promise.all([
      fetch(`https://api.audioboom.com/channels/${channelId}`),
      fetch(`https://api.audioboom.com/channels/${channelId}/audio_clips`),
      fetch(`https://api.audioboom.com/channels/${channelId}/child_channels`)
    ])

    if( reqChannel.status >= 400 ){
      res.statusCode = reqChannel.status
      return { props: { channel: null, audioClips: null, series: null, statusCode: reqChannel.status }}
    }
  
  
    let dataChannel = await reqChannel.json();
    let channel = dataChannel.body.channel
    
    let dataAudioClips = await reqAudioClips.json();
    let audioClips = dataAudioClips.body.audio_clips
  
    let dataSeries = await reqSeries.json();
    let series = dataSeries.body.channels
  
    return { props: { channel, audioClips, series, statusCode: 200 } }
  }
  catch(e){
    return { props: { channel: null, audioClips: null, series: null, statusCode: 503 }}
  }

  
}

export default channel;