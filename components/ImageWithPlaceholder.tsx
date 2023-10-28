//ref https://easonchang.com/posts/post-custom-image
import Image, {ImageProps} from "next/image"

type Props = ImageProps & {base64?: string}

export default function ImageWithPlaceholder({
  src,
  height,
  width,
  base64,
  alt,
  ...otherProps
}: Props) {
  if (!src){
    return null
  }

  if((typeof src === "string" && (!height || !width))) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={src} height={height} width={width} alt={alt} {...otherProps}/>
    )
  }
  return (
    <Image 
      layout="responsive"
      src={src}
      alt={alt}
      height={height}
      width={width}
      placeholder={base64 ? "blur" : "empty"}
      blurDataURL={base64}
      {...otherProps}
    />
  )
}