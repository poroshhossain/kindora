import Image from "next/image"
import Link from "next/link"

const Logo = ({setIsOpen}: {setIsOpen:any}) => {
  return (
     <Link
          href="/"
          className="shrink-0 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          onClick={() => setIsOpen(false)}
        >
          <Image
            src="/images/kindora-logo.png"
            alt="Kindora"
            width={150}
            height={100}
            priority
            className="h-auto w-28 object-contain sm:w-32 dark:hidden"
          />
          <Image
            src="/images/kindora-logo-dark.png"
            alt="Kindora"
            width={150}
            height={100}
            priority
            className="hidden h-auto w-28 object-contain sm:w-32 dark:block"
          />
        </Link>
  )
}
export default Logo