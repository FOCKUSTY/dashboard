"use client";

import styles from "./page.module.css";

import Image from "next/image";

import { useEffect, useState } from "react";

import { validateCookies } from "api/validate-cookies";
import { fetchGuilds } from "api/fetch-guilds";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Mousewheel, Pagination } from "swiper/modules";
import { useRouter } from "next/router";

const resolveGuilds = (guilds: any[]) => {
  if (guilds.length >= 8) {
    return guilds
  } else {
    return [
      ...guilds,
      ...guilds.map(guild => { return { ...guild, id: (+(guild.id + guilds.length)*2) }}),
      ...guilds.map(guild => { return { ...guild, id: (+(guild.id + guilds.length)*3) }}),
    ]
  };
};

export const Page = () => {
  const router = useRouter();
  const [ guilds, setGuilds ] = useState<{id: string, name: string, icon_url: string|null, banner_url: string|null}[]|null>(null);

  useEffect(() => {
    (async () => {
      const token = await validateCookies();

      if (!token) {
        return;
      }
      
      setGuilds(await fetchGuilds(token));
    })();
  }, []);

  if (!guilds) {
    return <></>;
  }

  return (
    <div id={styles.main}>
      <div id={styles.menu}>
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
                <SwiperSlide key={guild.id} className={styles.card} onClick={() => router.push("/dashboard/"+guild.id)}>
                  <Image height={50} width={50} src={guild.icon_url || "/TheVoidAvatarSite.png"} alt={guild.name + " icon"}/>
                  <span>{guild.name}</span>
                </SwiperSlide>
              )
            }
          </div>
        </Swiper>
      </div>
    </div>
  )
};

export default Page;
