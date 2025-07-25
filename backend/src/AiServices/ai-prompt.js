const { main } = require("./ai-service"); // adjust based on your file structure

module.exports.buildPromptText = ({ destination, days, budget, interests, groupType }) => {
    return `
You are a professional AI travel assistant helping Indian travelers plan customized itineraries.

Please generate a **detailed travel itinerary** for a group of ${groupType}, based on the following preferences:

- Destination: ${destination}
- Number of Days: ${days}
- Budget: ₹${budget} (Indian Rupees)
- Interests: ${interests}
- Group Type: ${groupType}

## Your Output Must Include:

1. **Itinerary Title & Summary**
   - Title for the trip
   - Short description (2–3 lines) summarizing vibe, theme, and budget usage

2. **Weather & Travel Advisory**
   - Current weather Status
   - Packing tips, risks (e.g., landslides), seasonal highlights according to current weather

3. **Day-by-Day Plan**
For each day, include:
- Title for the day (e.g., “Day 2: Solang Valley Adventure & Hadimba Temple”)
- Morning, afternoon, evening plans (chronological)
- ✅ Mention distances between places and expected travel time
- ✅ Give food recommendations: restaurants, street food, local dishes
- ✅ Give stay recommendations with price range, name, and vibe
- ✅ Mention activities with approx. costs (e.g., rafting ₹1000/person)
- ✅ Include any pro tips (e.g., start early for less traffic, hidden gems)

4. **Budget Breakdown (₹)**
Split the ₹${budget} per person into:
- Accommodation
- Activities
- Food
- Transport
- Miscellaneous/Buffer

5. **Local Transport Suggestions**
- How to get around (walking, autos, buses, shared cabs)
- Cost-saving tips for intercity or local travel

6. **Footnotes & Safety Tips**
- Cultural etiquette
- Safety suggestions (esp. altitude, monsoon)
- Cash vs UPI tips
- Permit info (if needed for places like Rohtang)
- Internet connectivity

7. **Format**: Use clear markdown with sections and bullet points. Add emoji icons (e.g., 🚗, 🏞️, 🍴) for readability.

Do not include links or markdown links in the response.

Ensure this is written in a natural, local-friendly tone that feels authentic and is easy to follow. Make sure to **fill all details and avoid vague instructions like “explore nearby” or “eat somewhere”** — be specific.

give the output in this json schema:
{
  "trip_title": "string",
  "duration_days": "number",
  "budget_per_person": "number",
  "season": "string",
  "group_type": "string",
  "highlights": ["string"],

  "weather_advisory": {
    "expected_weather": "string",
    "packing_tips": ["string"],
    "risks": ["string"],
    "seasonal_highlights": ["string"]
  },

  "day_by_day_itinerary": [
    {
      "day": "number",
      "title": "string",
      "activities": ["string"],
      "stay_recommendations": ["string"],
      "transport": "string",
      "food_spots": ["string"],
      "pro_tip": "string",
      "permit_required": "boolean"
    }
  ],

  "budget_breakdown": {
    "accommodation": "number",
    "food_and_drinks": "number",
    "activities_and_entry": "number",
    "local_transport": "number",
    "miscellaneous_buffer": "number",
    "total": "number"
  },

  "local_transport": {
    "walking": "string",
    "auto_rickshaw": "string",
    "local_buses": "string",
    "shared_cabs": "string",
    "tips": ["string"]
  },

  "footnotes_safety_tips": {
    "cultural_etiquette": ["string"],
    "safety": ["string"],
    "payment": {
      "upi": "string",
      "cash": "string"
    },
    "permits": {
      "rohtang_pass_required": "boolean",
      "apply_online": "string"
    },
    "connectivity": {
      "wifi": "string",
      "mobile_networks": "string"
    }
  }
}

dont include anything else it should be like a json file
  `;
};


