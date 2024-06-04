import React, { useState, useEffect } from 'react'
import Select from 'react-select'
import styles from './dropdown.module.css'
import Image from "next/image"
import SectionCards from '../card/section-cards'

// const options = [
//   { value: 'chocolate', label: 'Chocolate' },
//   { value: 'strawberry', label: 'Strawberry' },
//   { value: 'vanilla', label: 'Vanilla' }
// ]

const Dropdown = () => {

    const [movie, setMovie] = useState([])
    const [listMovies, setListMovies] = useState([])
    const [recMovies, setRecMovies] = useState([])
    const [show1, setShow1] = useState(false)
    const [show2, setShow2] = useState(false)
    const [show3, setShow3] = useState(false)
    const [show4, setShow4] = useState(false)
    const [show5, setShow5] = useState(false)


    const empty = ""

    const colorStyles = {
        control: (styles) => ({
            ...styles,
            backgroundColor: "white",
            borderRadius: 7,
        }),
        menuList: (styles) => ({
            ...styles,
            color: "black"
        }),
    }

    useEffect(() => {
        getMovieList()
    }, [])

    useEffect(() => {
        recMovies
    }, [])

    // useEffect(() => {
    //     movie
    // }, [])

    let getMovieList = async () => {
        let response = await fetch('http://127.0.0.1:8000/api/movielist/')
        let movieList = await response.json()
        setListMovies(movieList)
    }

    const optionMovie = listMovies.map((listMovie) => ({
        value: listMovie.toLowerCase(),
        label: listMovie
    }))

    console.log(optionMovie)

    const handleOnChange = (e) => {
        setMovie(e)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const selectedMovie = movie
        await fetch('http://127.0.0.1:8000/api/movierecommend/', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(selectedMovie['label'])
        })
        .then(response => response.json())
        .then(data => {
            setRecMovies(data)
            // console.log(data);
        })
    }

    // const index = recMovies[4][0].indexOf(".")
    // const selected_description = recMovies[4][0].slice(0, index !== -1 ? index : undefined)

    // console.log(recMovies[3][0]);

    const disneyVideos = [
        {
          imgUrl: '/static/cover-1.jpg'
        }
      ]

    return (
        <div>
            <div className={styles.container}>
                {/* <h1 className={styles.subTitle}>Quick Movies Recommender</h1> */}
                <form onSubmit={handleSubmit} className={styles.wrapper}>
                    <div className={styles.selectDropdown}>
                        <Select
                            onChange={handleOnChange}
                            placeholder="Choose Your Interesting Movie"
                            options={optionMovie}
                            noOptionsMessage={() => "No movie found"}
                            styles={colorStyles}
                        />
                    </div>
                    <button className={styles.btnWithIcon}>
                        <Image
                            src="/static/search_icon.svg"
                            alt="Search icon"
                            width={32}
                            height={32}
                        />
                    </button>
                </form>
            </div>
            {
                recMovies.length === 0 ? empty :
                (
                    <div>
                        <h2 className={styles.movieRecom}>Recommendation</h2>
                        <div className={styles.selectionWrapper}>
                            <SectionCards videos={disneyVideos} size='veryLarge' image={recMovies[3][0].toString()} description={recMovies[3][0]} />
                            <div>
                                <h1 className={styles.movieName}>{recMovies[5]}</h1>
                                <div className={styles.sectionWrapper1}>
                                    <h3 className={styles.descriptionTitle}>Description: </h3>
                                    <p className={styles.description}>{recMovies[4][0]}.</p>
                                </div>
                            </div>
                        </div>
                        <div className={styles.sectionWrapper2}>
                            <div>
                                <SectionCards title={recMovies[0][0]} videos={disneyVideos} size='large' image={recMovies[1][0]} description={recMovies[2][0]} />
                                { show1 !== true ?
                                    <label className={styles.readMore} onClick={(e) => setShow1(true)}>read more</label>
                                    :
                                    (
                                        <div>
                                            <h5 className={styles.description1}>{recMovies[2][0]}.</h5>
                                            <label className={styles.showLess} onClick={(e) => setShow1(false)}>show less</label>
                                        </div>
                                    )
                                }
                            </div>
                            <div>
                                <SectionCards title={recMovies[0][1]} videos={disneyVideos} size='large' image={recMovies[1][1]} description={recMovies[2][1]} />
                                { show2 !== true ?
                                    <label className={styles.readMore} onClick={(e) => setShow2(true)}>read more</label>
                                    :
                                    (
                                        <div>
                                            <h5 className={styles.description1}>{recMovies[2][1]}.</h5>
                                            <label className={styles.showLess} onClick={(e) => setShow2(false)}>show less</label>
                                        </div>
                                    )
                                }
                            </div>
                            <div>
                                <SectionCards title={recMovies[0][2]} videos={disneyVideos} size='large' image={recMovies[1][2]} description={recMovies[2][2]} />
                                { show3 !== true ?
                                    <label className={styles.readMore} onClick={(e) => setShow3(true)}>read more</label>
                                    :
                                    (
                                        <div>
                                            <h5 className={styles.description1}>{recMovies[2][2]}.</h5>
                                            <label className={styles.showLess} onClick={(e) => setShow3(false)}>show less</label>
                                        </div>
                                    )
                                }
                            </div>
                            <div>
                                <SectionCards title={recMovies[0][3]} videos={disneyVideos} size='large' image={recMovies[1][3]} description={recMovies[2][3]} />
                                { show4 !== true ?
                                    <label className={styles.readMore} onClick={(e) => setShow4(true)}>read more</label>
                                    :
                                    (
                                        <div>
                                            <h5 className={styles.description1}>{recMovies[2][3]}.</h5>
                                            <label className={styles.showLess} onClick={(e) => setShow4(false)}>show less</label>
                                        </div>
                                    )
                                }
                            </div>
                            <div>
                                <SectionCards title={recMovies[0][4]} videos={disneyVideos} size='large' image={recMovies[1][4]} description={recMovies[2][4]} />
                                { show5 !== true ?
                                    <label className={styles.readMore} onClick={(e) => setShow5(true)}>read more</label>
                                    :
                                    (
                                        <div>
                                            <h5 className={styles.description1}>{recMovies[2][4]}.</h5>
                                            <label className={styles.showLess} onClick={(e) => setShow5(false)}>show less</label>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                )
            }

        </div>
    )
}

export default Dropdown