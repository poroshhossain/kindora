import { EventRecord } from "@/types/types"
import Link from "next/link"
interface EditEventProp{
    event:EventRecord
}
const EditEvent = (event: EditEventProp) => {
    console.log('edit item' , event)
    return (
        <Link
            href={``}
            className="flex-1 rounded-lg bg-primary px-4 py-2.5 text-center text-sm font-semibold text-primary-foreground"
        >
            Edit
        </Link>
    )
}
export default EditEvent