import type { Activity } from "./datatypes/Activity";

function ActivityView(Activity: Activity) {
  return (
    <div key={Activity.id} className="activity-item">
      <h2>{Activity.type}</h2>
      <p>Distance: {Activity.distance} km</p>
      <p>Duration: {Activity.duration} min</p>
      <p>Status: {Activity.broken ? "Broken" : "Working"}</p>
    </div>
  );    

}

export default ActivityView;