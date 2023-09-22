import React from 'react';
import style from './footer.module.css';
import Image from 'next/image';
import Link from 'next/link';

const footer = () => {
  return (

    <div className={style.container}>
      <div className={style.info}>
        <div className={style.knightHelmet}>
          <div className={style.logo}>The Knight</div>
        </div>
        <p className={style.desc}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Et ratione corporis amet. Quis expedita, labore nam autem obcaecati odio ut?Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, adipisci?
        </p>
        <div className={style.icons}>
          <Image src="/facebook.png" alt='' width={20} height={20} />
          <Image src="/instagram.png" alt='' width={20} height={20} />
          <Image src="/twitter.png" alt='' width={20} height={20} />
          <Image src="/youtube.png" alt='' width={20} height={20} />
        </div>
      </div>
      <div className={style.links}>
        <div className={style.list}>
          <span className={style.listTitle}>Links</span>
          <Link href='/'>Homepage</Link>
          <Link href='/'>Blog</Link>
          <Link href='/'>About</Link>
          <Link href='/'>Contact</Link>
        </div>
        <div className={style.list}>
          <span className={style.listTitle}>Tags</span>
          <Link href='/'>Style</Link>
          <Link href='/'>Fashion</Link>
          <Link href='/'>Coding</Link>
          <Link href='/'>Travel</Link>
        </div>
        <div className={style.list}>
          <span className={style.listTitle}>Social</span>
          <Link href='/'>Facebook</Link>
          <Link href='/'>Instagram</Link>
          <Link href='/'>Twitter</Link>
          <Link href='/'>Youtube</Link>
        </div>
      </div>
    </div>
  );
}

export default footer;
