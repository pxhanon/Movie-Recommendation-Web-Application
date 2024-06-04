import styles from './section-cards.module.css';

import Card from './card';

import clsx from "classnames";

import Link from "next/link";

const SectionCards = (props) => {
    const { title, videos = [], size, image, description} = props;

    console.log(image);

    const index = description.indexOf(".")
    const real_description = description.slice(0, index !== -1 ? index : undefined)

    return (
        <section className={styles.container}>
            <h4 className={styles.title}>{title}</h4>
            <div className={styles.cardWrapper}>
                {videos.map((video, idx) => {
                    return (

                            <Card key={idx} id={idx} imgUrl={image} size={size} description={real_description} />

                    );
                })}
            </div>
        </section>
    );
}

export default SectionCards;