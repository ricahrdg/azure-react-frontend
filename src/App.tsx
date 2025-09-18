import { useState, useEffect } from 'react';

//import { useState } from 'react'
import ActivityFeed from './ActivityFeed'
import './App.css'


// enum equivalent in TypeScript
// Using a const assertion to create a type-safe enum-like object
// This allows us to use the values as types while keeping the object structure.
// This is useful for defining a set of related constants that can be used throughout the application.
// The `as const` assertion ensures that the values are treated as literal types.
// This is a common pattern in TypeScript to create a type-safe enum-like structure.
// The `AppMode` object defines three modes: login, activityFeed, and activity.
// Each mode can be used to control the application's state and render different components based on the current mode.
// The `AppMode` type is derived from the keys of the `AppMode` object
// and can be used to type the `appMode` state variable in the `App` component.
// This allows for better type safety and autocompletion in the code editor.
// The `AppMode` object is exported so that it can be used in other parts of the application.   
export const AppMode = {
  activityFeed: "activityfeed",
  activity: "activity"
} as const;
export type AppMode = typeof AppMode[keyof typeof AppMode];


// The App component is the main component of the application.
// It uses the `useState` hook to manage the application's mode.
// The `appMode` state variable is initialized to `AppMode.login`, which means the application will start in the login mode.
// The `setAppMode` function is used to update the `appMode` state variable when the user clicks on the navigation buttons.
// The component renders a welcome message, the current app content based on the `appMode`, and a navigation bar with buttons to
// switch between the different modes (login, activity feed, and activity).   
function App() {
  const [appMode, setAppMode] = useState<AppMode>(AppMode.activityFeed);

  return (
    <>
    <h1>Velo.Fit</h1>
    {renderAppContent()}
    {renderAppFooter()}
    {callApi()}
    </>
  )

  function callApi() {
    const [data, setData] = useState('');

    useEffect(() => {
      (async function () {
        const { text } = await( await fetch(`/api/message`)).json();
        setData(text);
      })();
    });

    return <div>{data}</div>;
  }

  function renderAppContent() {
    //const actFeed = useActivityFeedNative();
    const feed = ActivityFeed();

    if (appMode === AppMode.activityFeed) {
      return (
        <div className="activityfeed">
          {feed}
        </div>
      )
    } else if (appMode === AppMode.activity) {
      return (
        <div className="activity">
          <h1>Activity</h1>
          {/* Activity content goes here */}
        </div>
      );
    }

  }

  function renderAppFooter() {
    return (
    <div className="app-footer">
      <nav>
        <button onClick={() => setAppMode(AppMode.activityFeed)}>Activity Feed</button>
        <button onClick={() => setAppMode(AppMode.activity)}>Activity</button>
      </nav>
    </div>
    )
  } 

}
 
export default App
