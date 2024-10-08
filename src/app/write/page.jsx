"use client";

import Image from "next/image";
import style from "./writePage.module.css";
import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "@/utils/firebase";
import dynamic from "next/dynamic";

const WritePage = () => {
  const { status } = useSession();
  const ReactQuill = dynamic(()=>import('react-quill'),{ssr:false});

  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [media, setMedia] = useState("");
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  const [catSlug, setCatSlug] = useState("");

  useEffect(() => {
    const storage = getStorage(app);
    const upload = () => {
      const name = new Date().getTime() + file.name;
      const storageRef = ref(storage, name);

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {},
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setMedia(downloadURL);
          });
        }
      );
    };

    file && upload();
  }, [file]);

  if (status === "loading") {
    return <div className={style.loading}>Loading...</div>;
  }

  if (status === "unauthenticated") {
    router.push("/");
  }

  const slugify = (str) =>
    str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");

  const handleSubmit = async () => {
    const res = await fetch("/api/posts", {
      method: "POST",
      body: JSON.stringify({
        title,
        desc: value,
        img: media,
        slug: slugify(title),
        catSlug: catSlug || "style", //If not selected, choose the general category
      }),
    });

    if (res.status === 200) {
      const data = await res.json();
      router.push(`/posts/${data.slug}`);
    }
  };

  return (
    <div className={style.container}>
      <input
        type="text"
        placeholder="Title"
        className={style.Input}
        onChange={(e) => setTitle(e.target.value)}
      />
      <select className={style.select} onChange={(e) => setCatSlug(e.target.value)}>
        <option value="style">style</option>
        <option value="fashion">fashion</option>
        <option value="food">food</option>
        <option value="culture">culture</option>
        <option value="travel">travel</option>
        <option value="coding">coding</option>
      </select>
      <div className={style.editor} >
        <button className={style.button} onClick={() => { setOpen(!open) }}>
          <Image src='/plus.png' alt='' width={16} height={16} className={style.plus} />
        </button>
        {open && (
          <div className={style.add}>
            <button className={style.addbutton}>
              <Image src="/text.png" alt='' width={20} height={22} className={style.image} />
            </button>
            <input type='file' id='image' onChange={e => setFile(e.target.files[0])}
              style={{ display: "none" }}
            />
            <button className={style.addbutton}>
              <label htmlFor='image'>
                <Image src='/image.png' alt='' width={21} height={21} className={style.image} />
              </label>
            </button>
            <button className={style.addbutton}>
              <Image src='/video.png' alt='' width={20} height={20} className={style.image} />
            </button>
            <button className={style.addbutton}>
              <Image src='/codearea.png' alt='' width={23} height={23} className={style.image} />
            </button>
          </div>
        )}
        <ReactQuill className={style.textArea} theme='bubble' value={value} onChange={setValue} placeholder='Tell Your Story...' />
      </div>
      <button className={style.publish} onClick={handleSubmit}>
        Publish
      </button>
    </div>
  );
};

export default WritePage;
