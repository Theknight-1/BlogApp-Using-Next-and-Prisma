import React from 'react'
import style from './blogPage.module.css'
import CardList from '@/components/cardList/CardList'

import MenuCategories from '@/components/menuCategories/MenuCategories'
import MenuPost from '@/components/menuPosts/MenuPosts'

const page = ({searchParams}) => {
  const page = parseInt(searchParams.page) || 1;
  const {cat} = searchParams; 
  return (
    <div className={style.container}>
      <h1 className={style.title}>{cat} Blog</h1>
      <div className={style.content}>
        <CardList page={page} cat={cat}/>
        <div className={style.row}>
          <div className={style.coloum}>
          <h1 className={style.heading}>Categories</h1>
          <MenuPost withImage={false} />
          <MenuCategories cat={cat}/>
          </div>
          <MenuPost withImage={true}/>
        </div>
      </div>
    </div>
  )
}

export default page
