// ItineraryPDF.jsx
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";

// Optional: Use a nice Google font
Font.register({
  family: "Roboto",
  fonts: [
    {
      src: "/Fonts/Roboto-Regular.ttf",
      fontWeight: 400,
    },
    {
      src: "/Fonts/Roboto-Bold.ttf",
      fontWeight: 700,
    },
    {
      src: "/Fonts/Roboto-Italic.ttf",
      fontStyle: "italic",
      fontWeight: 400,
    }, // add this line
  ],
});


// Styles
const styles = StyleSheet.create({
  page: {
    fontFamily: "Roboto",
    padding: 30,
    backgroundColor: "#fafafa",
  },
  header: {
    fontSize: 26,
    marginBottom: 12,
    fontWeight: "bold",
    textAlign: "center",
    color: "#1a237e",
    letterSpacing: 1,
  },
  subHeader: {
    fontSize: 14,
    marginBottom: 20,
    textAlign: "center",
    color: "#546e7a",
  },
  section: {
    marginBottom: 15,
    padding: 12,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    border: "1px solid #e0e0e0",
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#1e88e5",
    marginBottom: 6,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  text: {
    fontSize: 11,
    lineHeight: 1.6,
    color: "#424242",
  },
  dayBlock: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#e3f2fd",
    borderLeft: "4px solid #1e88e5",
    borderRadius: 5,
  },
  dayTitle: {
    fontSize: 13,
    fontWeight: "bold",
    marginBottom: 4,
    color: "#0d47a1",
  },
});

// Component
const ItineraryPDF = ({ data }) => {

    console.log("data is ", data.budget_breakdown);
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.header}>{data.trip_title}</Text>
        <Text style={styles.subHeader}>
          Duration: {data.duration_days} Days | Budget: ₹
          {data.budget_per_person}/person | Season: {data.season}
        </Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Group Type</Text>
          <Text style={styles.text}>{data.group_type}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Trip Highlights</Text>
          {data.highlights.map((item, i) => (
            <Text key={i} style={styles.text}>
              • {item}
            </Text>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Weather & Advisory</Text>
          <Text style={styles.text}>
            {data.weather_advisory.expected_weather}
          </Text>

          <Text style={[styles.text, { marginTop: 5, fontWeight: "bold" }]}>
            Packing Tips:
          </Text>
          {data.weather_advisory.packing_tips.map((tip, i) => (
            <Text key={i} style={styles.text}>
              • {tip}
            </Text>
          ))}

          <Text style={[styles.text, { marginTop: 5, fontWeight: "bold" }]}>
            Risks:
          </Text>
          {data.weather_advisory.risks.map((risk, i) => (
            <Text key={i} style={styles.text}>
              • {risk}
            </Text>
          ))}

          <Text style={[styles.text, { marginTop: 5, fontWeight: "bold" }]}>
            Seasonal Highlights:
          </Text>
          {data.weather_advisory.seasonal_highlights.map((item, i) => (
            <Text key={i} style={styles.text}>
              • {item}
            </Text>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Day-by-Day Itinerary</Text>
          {data.day_by_day_itinerary.map((day, i) => (
            <View key={i} style={styles.dayBlock}>
              <Text style={styles.dayTitle}>
                Day {day.day}: {day.title}
              </Text>

              <Text style={styles.text}>Activities:</Text>
              {Array.isArray(day.activities) &&
                day.activities.map((act, idx) => (
                  <Text key={idx} style={styles.text}>
                    • {act}
                  </Text>
                ))}

              <Text style={styles.text}>Stay Recommendations:</Text>
              {Array.isArray(day.stay_recommendations) &&
                day.stay_recommendations.map((stay, idx) => (
                  <Text key={idx} style={styles.text}>
                    • {stay}
                  </Text>
                ))}

              <Text style={[styles.text, { marginTop: 4 }]}>
                Transport: {day.transport}
              </Text>

              <Text style={styles.text}>Food Spots:</Text>
              {Array.isArray(day.food_spots) &&
                day.food_spots.map((spot, idx) => (
                  <Text key={idx} style={styles.text}>
                    • {spot}
                  </Text>
                ))}

              <Text style={[styles.text, { fontStyle: "italic" }]}>
                Pro Tip: {day.pro_tip}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Budget Breakdown (₹)</Text>
          {[
            ["Accommodation", data.budget_breakdown.accommodation],
            ["Food & Drinks", data.budget_breakdown.food_and_drinks],
            ["Activities", data.budget_breakdown.activities_and_entry],
            ["Local Transport", data.budget_breakdown.local_transport],
            ["Misc./Buffer", data.budget_breakdown.miscellaneous_buffer],
            ["Total", data.budget_breakdown.total],
          ].map(([label, amount], i) => (
            <Text
              key={i}
              style={[styles.text, label === "Total" && { fontWeight: "bold" }]}
            >
              {label}: ₹{amount}
            </Text>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Local Transport Tips</Text>
          {Array.isArray(data.local_transport.tips) &&
            data.local_transport.tips.map((tip, i) => (
              <Text key={i} style={styles.text}>
                • {tip}
              </Text>
            ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Safety & Etiquette</Text>

          <Text style={[styles.text, { fontWeight: "bold" }]}>
            Cultural Etiquette:
          </Text>
          {Array.isArray(data.footnotes_safety_tips.cultural_etiquette) &&
            data.footnotes_safety_tips.cultural_etiquette.map((tip, i) => (
              <Text key={i} style={styles.text}>
                • {tip}
              </Text>
            ))}

          <Text style={[styles.text, { fontWeight: "bold", marginTop: 5 }]}>
            Safety:
          </Text>
          {Array.isArray(data.footnotes_safety_tips.safety) &&
            data.footnotes_safety_tips.safety.map((tip, i) => (
              <Text key={i} style={styles.text}>
                • {tip}
              </Text>
            ))}
        </View>
      </Page>
    </Document>
  );
};

export default ItineraryPDF;
