'use client'
import React, { useEffect, useState } from 'react';
import style from './comments.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import useSWR from 'swr';
import { useSession } from 'next-auth/react';

const fetcher = async (url) => {
    const res = await fetch(url);
    const data = await res.json();
    if (!res.ok) {
        const error = new Error(data.message);
        throw error;
    }
    return data;
};

const Comments = ({ postSlug }) => {
    const { data,  mutate , isLoading } = useSWR(`/api/comments?postSlug=${postSlug}`, fetcher);
    const { status } = useSession();
    console.log(status);

    const [desc, setDesc]= useState("");
    const handleSubmit =async (e)=>{
        await fetch(`/api/comments`,{
            method:"POST",
            body : JSON.stringify({desc,postSlug})
        });
        mutate();
    }

    // const handleLike = async (item, postSlug) => {
    //     try {
    //         if (!item.id) {
    //             throw new Error("There is no Comment to like or dislike");
    //         } else {
    //             if (item.likes === 0) {
    //                 // Calculate the new number of likes
    //                 const newLike = item.likes + 1;
                    
    //                 // Make a PUT request to the 'use client' API route
    //                 const response = await fetch(`/api/comments/likes`, {
    //                     method: 'PUT',
    //                     headers: {
    //                         'Content-Type': 'application/json',
    //                     },
    //                     body: JSON.stringify({
    //                         postId: item.id,
    //                         action: 'like',
    //                     }),
    //                 });

    //                 if (response.ok) {
    //                     const responseData = await response.json();
    //                     console.log(responseData);

    //                     // Update the local state or UI as needed
    //                 } else {
    //                     throw new Error('Failed to update likes');
    //                 }
    //             }
    //         }
    //     } catch (error) {
    //         console.error(error);
    //     }
    // };

    // ... Rest of your component code ...

    return (
        <div className={style.container}>
        <h1 className={style.title}>Comment</h1>
            {status === "authenticated" ? (
                <div className={style.write}>
                    <input name="" placeholder='Leave a comment' className={style.input} onChange={e=>setDesc(e.target.value)}></input>
                    <button className={style.button} onClick={handleSubmit}>Send</button>
                </div>
            ) : (
                <Link href="/login" style={{color:"blue"}}> Login to write a commnet</Link>
            )}
            <div className={style.comments}>
                {isLoading ? (
                    'Loading'
                ) : data ? (
                    data.map((item) => (
                        <div className={style.comment} key={item.id}>
                            <div className={style.user}>
                                <Image src={item.user.image ? item.user.image : '/userDefImg.png'} alt='' width={50} height={50} className={style.image} />
                                <div className={style.userInfo}>
                                    <span className={style.username}>{item.user.name}</span>
                                    <span className={style.date}>{item.createdAt.slice(0, 10)}</span>
                                </div>
                            </div>
                            <p className={style.desc}>
                                {item.desc}
                            </p>
                            <div className={style.like}>
                                <span className={style.likebutton} >
                                    <FontAwesomeIcon icon={faThumbsUp} className={`${style.thumb} ${style.thumbsup}`} />
                                    <span className={style.count}>{item.likes}</span>
                                </span>
                                <span className={style.dislikebutton} >
                                    <FontAwesomeIcon icon={faThumbsDown} className={`${style.thumbdown}`} />
                                    <span className={style.count}>{item.dislikes}</span>
                                </span>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No Comments</p>
                )}
            </div>           
        </div>
    );
};

export default Comments;
