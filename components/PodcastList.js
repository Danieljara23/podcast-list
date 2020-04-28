import Link from "next/link";

const PodcastList = ({ audioClips, onClickPodcast }) => {
  return (
    audioClips.map( clip => (
        <a href={`/podcast/${clip.id}`} onClick={e => onClickPodcast(e, clip)}> { clip.title } </a>
      
    ))
  )
}

export default PodcastList;