import Image from "next/image"

type Props = {
  className?: string,
  url?: string,
  alt: string,
} & ({
  name?: undefined
  spanClassName?: undefined
} | {
  name: string
  spanClassName?: string
});

const ImageComponent = ({ className, url, alt }: Omit<Props, "name">) => {
  return <Image
    src={url || "/TheVoidAvatarSite.png"}
    alt={alt}
    width={50}
    height={50}
    style={{
      height: "50px",
      width: "50px",
      borderRadius: "100%"
    }}
    className={className}
  />
}

export const IconComponent = ({ className, url, alt, name, spanClassName }: Props) => {
  return name
    ? <div>
        <ImageComponent className={className} alt={alt} url={url} />
        <span className={spanClassName}>{name}</span>
      </div>
    :  <ImageComponent className={className} alt={alt} url={url} />
}