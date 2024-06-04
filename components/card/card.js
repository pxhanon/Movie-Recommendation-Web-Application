// import { useState, useEffect } from 'react';

import styles from './card.module.css'

import Image from 'next/image';

import { motion } from 'framer-motion'
import cls from 'classnames';

const Card = (props) => {
    const {
        imgUrl,
        size,
        id,
        description,
    } = props

    // const [imgSrc, setImgSrc] = useState(imgUrl);

    const classMap = {
        veryLarge: styles.vlgItem,
        large: styles.lgItem,
        medium: styles.mdItem,
        small: styles.smItem,
    }

    // const handleOnError = () => {
    //     console.log("Error");
    //     setImgSrc('https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2059&q=80');
    // }

    const scale = id === 0 ? {scaleY: 1.05} : {scale: 1.1};

    console.log(description);

    return (
        <div className={styles.container}>
        <motion.div className={cls(styles.imgMotionWrapper, classMap[size])} whileHover={{ ...scale }}>
            <Image
                src={imgUrl}
                alt='image'
                layout='fill'
                className={styles.cardImg} />
        </motion.div>
    </div>
    )
}

export default Card