import { API_BASE_URL } from "@/lib/api"

const UpcomingEventsPage = async () => {
  const res = await fetch(`${API_BASE_URL}/events`);
  const data = await res.json();
  console.log(data)
  return (
    <div>UpcomingEventsPage</div>
  )
}
export default UpcomingEventsPage