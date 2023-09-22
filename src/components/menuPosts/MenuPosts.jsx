import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import style from './menuPosts.module.css'

const MenuPost = (props) => {
    return (
        <>
            <div className={style.items}>
                <Link href='/' className={style.item}>
                    {props.withImage && <div className={style.imageContainer}>
                        <Image src='/p1.jpeg' alt='' fill className={style.image} />
                    </div>}
                    <div className={style.textContainer}>
                        <span className={`${style.category} ${style.travel}`}>Travel</span>
                        <h3 className={style.postTitle}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deser.</h3>
                        <div className={style.detail}>
                            <span className={style.username}>Jhon Doe</span>
                            <span className={style.date}> - 10.03.2023</span>
                        </div>
                    </div>
                </Link>
                <Link href='/' className={style.item}>
                    {props.withImage && (<div className={style.imageContainer}>
                        <Image src='/p1.jpeg' alt='' fill className={style.image} />
                    </div>)}
                    <div className={style.textContainer}>
                        <span className={`${style.category} ${style.culture}`}>culture</span>
                        <h3 className={style.postTitle}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deser.</h3>
                        <div className={style.detail}>
                            <span className={style.username}>Jhon Doe</span>
                            <span className={style.date}> - 10.03.2023</span>
                        </div>
                    </div>
                </Link>
                <Link href='/' className={style.item}>
                    {props.withImage && (<div className={style.imageContainer}>
                        <Image src='/p1.jpeg' alt='' fill className={style.image} />
                    </div>)}
                    <div className={style.textContainer}>
                        <span className={`${style.category} ${style.food}`}>Food</span>
                        <h3 className={style.postTitle}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deser.</h3>
                        <div className={style.detail}>
                            <span className={style.username}>Jhon Doe</span>
                            <span className={style.date}> - 10.03.2023</span>
                        </div>
                    </div>
                </Link>
                <Link href='/' className={style.item}>
                    {props.withImage &&  (<div className={style.imageContainer}>
                        <Image src='/p1.jpeg' alt='' fill className={style.image} />
                    </div>)}
                    <div className={style.textContainer}>
                        <span className={`${style.category} ${style.fashion}`}>Fashion</span>
                        <h3 className={style.postTitle}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deser.</h3>
                        <div className={style.detail}>
                            <span className={style.username}>Jhon Doe</span>
                            <span className={style.date}> - 10.03.2023</span>
                        </div>
                    </div>
                </Link>
            </div>
        </>
    );
}

export default MenuPost
