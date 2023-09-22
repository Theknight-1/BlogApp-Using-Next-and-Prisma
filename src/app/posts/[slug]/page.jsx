import React from 'react'
import style from './singlePage.module.css'
import Menu from '@/components/menu/Menu'
import Image from 'next/image'
import Comments from '@/components/comments/Comments'

const getData = async (slug) => {
    const res = await fetch(`http://localhost:3000/api/posts/${slug}`, {
        cache: "no-store",
    });
    if (!res.ok) {
        throw new Error('Failed')
    }
    return res.json();
}


const SinglePage = async ({ params }) => {
    const { slug } = params;
    const res = await getData(slug)
    const data = res;
    return (
        <div className={style.container}>
            <div className={style.infoContainer}>
                <div className={style.textContainer}>
                    <h1 className={style.title}>
                        {data?.title}
                    </h1>
                    <div className={style.user}>
                        <div className={style.userImageContainer}>
                            <Image src={data?.user?.image ? data.user.image : '/userDefImg.png'} alt='' fill className={style.avatar} />
                        </div>
                        <div className={style.userTextContainer}>
                            <span className={style.username}>{data.user.name}</span>
                            <span className={style.date}>{data?.createdAt.slice(0, 10)}</span>
                        </div>
                    </div>
                </div>
                <div className={style.imageContainer}>
                    <Image src={data.img ? data.img : '/defPostImg.png'} alt='' fill className={style.image} />
                </div>
            </div>
            <div className={style.content}>
                <div className={style.post}>
                    <div className={style.description} dangerouslySetInnerHTML={{ __html: data?.desc }} />
                    <div className={style.comment}>
                        <Comments postSlug={slug} />
                    </div>
                </div>
                <Menu />
            </div>
        </div>
    )
};
export default SinglePage
