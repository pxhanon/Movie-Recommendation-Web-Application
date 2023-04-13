import styles from '../../styles/Video.module.css';

import { useRouter } from "next/router";

import Modal from 'react-modal';

import NavBar from '../../components/nav/navbar';

import clsx from "classnames";

Modal.setAppElement('#__next');

export async function getStaticProps() {
    //data to fetch from API
    const video = {
        title: "Hi cute dog",
        publishTime: "1990-01-01",
        description: "A big red dog that is super cute, can he get any bigger? Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged",
        channelTitle: "Paramount Pictures",
        viewCount: 10000,
    };

    return {
        props: {
          video,
        },
        revalidate: 10, // In seconds
    }
}

export async function getStaticPaths() {
    const listOfVideos = ["mYfJxlgR2jw", "4zH5iYM4wJo", "KCPEHsAViiQ"];
    const paths = listOfVideos.map((videoId) => ({
      params: { videoId },
    }));
  
    return { paths, fallback: "blocking" };
}

const Video = ({ video }) => {
    const router = useRouter();

    const { title, publishTime, description, channelTitle, statistics: { viewCount } = { viewCount: 0 } } = video;

    return (
        <div className={styles.container}>
            <NavBar />
            <Modal
                isOpen={true}
                contentLabel="Watch the video"
                onRequestClose={() => router.back()}
                className={styles.modal}
                overlayClassName={styles.overlay}
            >
                <iframe
                    id="ytplayer"
                    className={styles.videoPlayer}
                    type="text/html"
                    width="100%"
                    height="360"
                    src={`https://www.youtube.com/embed/${router.query.videoId}?autoplay=0&origin=http://example.com&controls=0&rel=1`}
                    // frameBorder="0"
                ></iframe>
                <div className={styles.modalBody}>
                    <div className={styles.modalBodyContent}>
                        <div className={styles.col1}>
                            <p className={styles.publishTime}>{publishTime}</p>
                            <p className={styles.title}>{title}</p>
                            <p className={styles.description}>{description}</p>
                        </div>
                        <div className={styles.col2}>
                            <p className={clsx(styles.subText, styles.subTextWrapper)}>
                                <span className={styles.textColor}>Cast: </span>
                                <span className={styles.channelTitle}>{channelTitle}</span>
                            </p>
                            <p className={clsx(styles.subText, styles.subTextWrapper)}>
                                <span className={styles.textColor}>View Count: </span>
                                <span className={styles.channelTitle}>{viewCount}</span>
                            </p>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default Video