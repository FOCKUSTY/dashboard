import styles from "./guild-side-bar.module.css";

import type { IconType } from "react-icons";
import { IoSettingsOutline, IoHome } from "react-icons/io5";
import { RiSlashCommands2 } from "react-icons/ri";

import { useRouter } from "next/navigation";

import type { IGuild } from "types/guild.type";

type Props = {
  guild: IGuild
}

const icons: {
  Icon: IconType,
  name: string,
  getPath?: (id: string) => string
}[] = [
  {
    Icon: IoHome,
    name: "home",
    getPath: (id) => `/dashboard/${id}`,
  },
  {
    Icon: IoSettingsOutline,
    name: "settings"
  },
  {
    Icon: RiSlashCommands2,
    name: "commands"
  }
]

export const SideBar = ({ guild }: Props) => {
  const router = useRouter();

  return (
    <nav className={styles.section}>
      <div className={styles.main}>
        {
          icons.map(({ Icon, name, getPath }, index) =>
            <Icon
              key={index}
              className={styles.icon}
              size={24}
              name={name}
              onClick={() => router.push(getPath
                ? getPath(guild.id)
                : "/dashboard/"+guild.id+"/"+name)}
            />
          )
        }
      </div>
    </nav>
  )
};

export default SideBar;
