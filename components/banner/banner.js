import styles from "./banner.module.css"

import Image from "next/image"

import { useRouter } from 'next/router'

const Banner = (props) => {
    const {title, subTitle, imgUrl, videoId} = props
    const router = useRouter();

    const handleOnPlay = () => {
        console.log("Play!")
        router.push(`/video/${videoId}`);
    }

    return (
        <div className={styles.container}>
            <h2 className={styles.newsTitle}>News</h2>
            <div className={styles.leftWrapper}>
                <div className={styles.left}>
                    <h3 className={styles.title}>{title}</h3>
                    <h3 className={styles.subTitle}>{subTitle}</h3>
                    <div className={styles.playBtnWrapper}>
                        <button className={styles.btnWithIcon} onClick={handleOnPlay}>
                            {/* <Image
                                src="/static/play_arrow.svg"
                                alt="Play icon"
                                width={32}
                                height={32}
                            /> */}
                            <span className={styles.playText}>Trailer</span>
                        </button>
                    </div>
                </div>
            </div>
            <div
                className={styles.bannerImg}
                style={{
                    background: `url(${imgUrl})`,
                    width: "100%",
                    height: "100%",
                    position: "relative",
                    backgroundSize: "Cover",
                    backgroundPosition: "50% 50%",
                    opacity: "0.7"
                }}
            ></div>
        </div>
    )
}

export default Banner