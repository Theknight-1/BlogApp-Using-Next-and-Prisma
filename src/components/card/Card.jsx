import Image from "next/image";
import style from "./card.module.css";
import Link from "next/link";

const Card = (props) => {
  return (
    <div className={style.container} key={props.key}>
      <div className={style.imageContainer}>
      <Link href={`/posts/${props.item.slug}`}>
        <Image src={props.item.img===null ? '/defPostImg.png' : props.item.img} alt=''  fill className={style.image} />
      </Link>
      </div>
      <div className={style.textContainer}>
        <div className={style.detail}>
          <span className={style.date}>{props.item.createdAt.substring(0,10)} - </span>
          <span className={style.category}>{props.item.catSlug}</span>
        </div>
        <Link href={`/posts/${props.item.slug}`} >
          <h1>{props.item.title}</h1>
        </Link>
        <p className={style.desc}>{props.item.desc}</p>
        <Link href={`/posts/${props.item.slug}`} className={style.link}>Read More</Link>
      </div>
    </div>
  )
};

export default Card;
