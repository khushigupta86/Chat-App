import { ENV } from "./env.js";
import arcjet ,{ shield, detectBot, slidingWindow  } from "@arcjet/node";

const aj = arcjet({
  
  key: ENV.ARCJET_KEY,
  rules: [
    
    shield({ mode: "LIVE" }),
    // Create a bot detection rule
    detectBot({
      mode: "LIVE", 
      allow: [
        "CATEGORY:SEARCH_ENGINE", 
      ],
    }),
    // Create a token bucket rate limit. Other algorithms are supported.
    slidingWindow({
      mode: "LIVE",
      max: 100, // Maximum of 100 requests
      interval: 60, // Refill every 10 seconds
     
    }),
  ],
});

export default aj;