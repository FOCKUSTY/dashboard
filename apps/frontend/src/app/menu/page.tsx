"use client";

import styles from "./page.module.css";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { CSSProperties, useEffect, useState, Suspense } from "react";
import useMediaQuery from "hooks/media.hook";

import { validateCookies } from "api/validate-cookies";
import { fetchGuilds } from "api/fetch-guilds";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Mousewheel, Pagination } from "swiper/modules";

import { Api } from "api";

import type { ICardGuild } from "types/guild.type";

const resolveGuilds = (guilds: ICardGuild[]): (ICardGuild & { key?: string })[] => {
  if (guilds.length >= 8) {
    return guilds
  } else {
    return [
      ...guilds,
      ...guilds.map(guild => { return { ...guild, id: guild.id, key: (+(guild.id + guilds.length)*2) }}),
      ...guilds.map(guild => { return { ...guild, id: guild.id, key: (+(guild.id + guilds.length)*3) }}),
    ]
  };
};

const Parent = ({ children, style }: { children: React.ReactNode, style?: CSSProperties }) => {
  return (
    <div className="page-center">
      <div id={styles.main} style={style}>
        {children}
      </div>
    </div>
  )
}

const Page = () => {
  const router = useRouter();
  const [ guilds, setGuilds ] = useState<ICardGuild[]|null>(null);
  const [ loaded, setLoaded ] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const token = await validateCookies();

      if (!token) {
        return;
      }
      
      setGuilds((await fetchGuilds(token)));
      setLoaded(true);
    })();
  }, []);

  const isScreenToSmall = useMediaQuery("(width < 368px)");

  if (!loaded) {
    return (
      <Parent style={{flexDirection: "column", margin: "0 0 0 30%"}}>
        Загрузка...
      </Parent>
    )
  }

  if (!guilds || guilds.length === 0) {
    return (
      <Parent style={{flexDirection: "column", margin: "0 0 0 30%"}}>
        <span>Мы не нашли у Вас серверов, но Вы всегда можете пригласить нас!</span>
        <button onClick={() => (window.location.href = Api.invite_url)}>
          Пригласить The Voidy
        </button>
      </Parent>
    )
  };

  if (guilds.length <= 2 || isScreenToSmall) {
    return (
      <Parent style={isScreenToSmall ? {flexDirection: "column"} : {flexDirection: "column", margin: "0 0 0 30%"}}>
        {
          guilds.map(guild =>
            <div key={guild.id} className={styles.card} onClick={() => router.push("/dashboard/"+guild.id)}>
              <Image height={50} width={50} src={guild.icon_url || "/TheVoidAvatarSite.png"} alt={guild.name + " icon"}/>
              <span>{guild.name}</span>
            </div>
          )
        }
      </Parent>
    )
  }

  return (
    <Parent>
      <Swiper
        direction={"vertical"}
        slidesPerView={5}
        centeredSlides={true}
        coverflowEffect={{
          rotate: 30,
          stretch: 0,
          depth: 100,
          modifier: 1,
          scale: 0.925,
          slideShadows: true
        }}
        mousewheel={{
          enabled: true,
          thresholdDelta: 70
        }}
        effect="coverflow"
        pagination={{ clickable: true, }}
        spaceBetween={30}
        modules={[Mousewheel, Pagination, EffectCoverflow]}
        loop={true}
        keyboard={true}
        className={`${styles.swiper} mySwiper mousewheel-control-swiper rounded`}
      >
        <div className="swiper-wrapper">
          {
            resolveGuilds(guilds).map(guild =>
              <SwiperSlide key={guild.key || guild.id} className={styles.card} onClick={() => {
                router.push("/dashboard/"+guild.id);
                router.refresh();
              }}>
                <Image height={50} width={50} src={guild.icon_url || "/TheVoidAvatarSite.png"} alt={guild.name + " icon"}/>
                <span>{guild.name}</span>
              </SwiperSlide>
            )
          }
        </div>
      </Swiper>
    </Parent>
  )
};

export default Page;
