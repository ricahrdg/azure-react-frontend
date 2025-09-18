import {
  useQuery
} from '@tanstack/react-query'
import type { Activity } from "./datatypes/Activity";
import ActivityView from "./ActivityView";


function ActivityFeed() {
  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ['Activties'],
    queryFn: async () => {
      const response = await fetch(
        'http://127.0.0.1:3000/newEndpoint',
      )

      const text = await response.text();

      console.log(`Response text: ${text}`);

      const parsed = JSON.parse(text);

      return parsed.activities as Activity[];
    },
  })

  if (isPending) return 'Loading...'

  if (error) return 'An error has occurred: ' + error.message

  return (
    <div>
        <h1>Activity Feed</h1>
            <article className="activity-feed">
                {data && data.length > 0 ? (
                    data.map((act : Activity) => (
                      (ActivityView(act))
                    ))
                ) : (
                    <p>No activities found.</p>
                )}
            </article>
            <div>{isFetching ? 'Updating...' : ''}</div>
      </div>
   
  )
}

export default ActivityFeed;
