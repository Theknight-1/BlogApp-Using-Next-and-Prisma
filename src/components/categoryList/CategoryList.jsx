import React from 'react';
import style from './categoryList.module.css';
import Link from 'next/link';
import Image from 'next/image';

const getData = async() => {
  const res = await fetch('http://localhost:3000/api/categories', {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error('Failed')
  }
  console.log(res);
  const finaldata = res.json();
  return  finaldata;
}

const CategoryList = async () => {
  const data = await getData();
  return (
    <div className={style.container}>
      <h1 className={style.title}>Popular Categories</h1>
      <div className={style.categories}>
        { data?.map((item) => {
          return <Link key={item._id} href={`/blog?cat=${item.slug}`} className={`${style.category} ${style[item.slug]}`}>
            {item.img ? <Image src={item.img} alt='' width={32} height={32} className={style.image} /> : <Image src='/defaultimg.jpeg' alt='' width={32} height={32} className={style.image}/>}
            {item.title}
          </Link>
        })}
      </div>
    </div>
  )
}

export default CategoryList
