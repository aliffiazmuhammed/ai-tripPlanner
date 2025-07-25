const fs = require("fs");
const PdfPrinter = require("pdfmake");

const fonts = {
    Roboto: {
        normal: "./Pdf-Builder/src/node_modules/pdfmake/fonts/Roboto-Regular.ttf",
        bold: "./Pdf-Builder/src/node_modules/pdfmake/fonts/Roboto-Medium.ttf",
        italics: "./Pdf-Builder/src/node_modules/pdfmake/fonts/Roboto-Italic.ttf",
        bolditalics: "./Pdf-Builder/src/node_modules/pdfmake/fonts/Roboto-MediumItalic.ttf",
    },
};

const printer = new PdfPrinter(fonts);

function generateItineraryPDF(data, res) {
    const docDefinition = {
        content: [
            { text: data.trip_title, style: "title" },
            { text: `${data.duration_days} Days | ₹${data.budget_per_person}/person`, style: "subheader" },
            { text: `Group Type: ${data.group_type}`, style: "info" },

            { text: "\nHighlights:", style: "sectionHeader" },
            {
                ul: data.highlights.map((item) => `• ${item}`),
            },

            { text: "\nWeather & Advisory", style: "sectionHeader" },
            { text: data.weather_advisory.expected_weather },
            { text: "\nPacking Tips:", bold: true },
            { ul: data.weather_advisory.packing_tips },
            { text: "\nRisks:", bold: true },
            { ul: data.weather_advisory.risks },
            { text: "\nSeasonal Highlights:", bold: true },
            { ul: data.weather_advisory.seasonal_highlights },

            ...data.day_by_day_itinerary.map((day) => ({
                stack: [
                    { text: `\nDay ${day.day}: ${day.title}`, style: "dayTitle" },
                    { text: "Activities:", bold: true },
                    { ul: Array.isArray(day.activities) ? day.activities : [day.activities] },
                    { text: "Stay Recommendations:", bold: true },
                    { ul: Array.isArray(day.stay_recommendations) ? day.stay_recommendations : [day.stay_recommendations] },
                    { text: "Transport:", bold: true, margin: [0, 4, 0, 0] },
                    day.transport,
                    { text: "Food Spots:", bold: true },
                    { ul: Array.isArray(day.food_spots) ? day.food_spots : [day.food_spots] },
                    { text: `Pro Tip: ${day.pro_tip}`, italics: true },
                ],
            })),

            { text: "\nBudget Breakdown", style: "sectionHeader" },
            {
                table: {
                    widths: ["*", "*"],
                    body: [
                        ["Accommodation", `₹${data.budget_breakdown.accommodation}`],
                        ["Food & Drinks", `₹${data.budget_breakdown.food_and_drinks}`],
                        ["Activities", `₹${data.budget_breakdown.activities_and_entry}`],
                        ["Local Transport", `₹${data.budget_breakdown.local_transport}`],
                        ["Misc./Buffer", `₹${data.budget_breakdown.miscellaneous_buffer}`],
                        [{ text: "Total", bold: true }, { text: `₹${data.budget_breakdown.total}`, bold: true }],
                    ],
                },
            },

            { text: "\nLocal Transport Tips", style: "sectionHeader" },
            {
                ul: data.local_transport.tips,
            },

            { text: "\nSafety & Etiquette", style: "sectionHeader" },
            { text: "Cultural Etiquette:", bold: true },
            { ul: data.footnotes_safety_tips.cultural_etiquette },
            { text: "Safety:", bold: true },
            { ul: data.footnotes_safety_tips.safety },
        ],
        styles: {
            title: {
                fontSize: 20,
                bold: true,
                alignment: "center",
            },
            subheader: {
                fontSize: 14,
                alignment: "center",
                margin: [0, 4],
            },
            info: {
                fontSize: 11,
                alignment: "center",
                margin: [0, 4, 0, 10],
            },
            sectionHeader: {
                fontSize: 16,
                bold: true,
                margin: [0, 10, 0, 5],
                decoration: "underline",
            },
            dayTitle: {
                fontSize: 13,
                bold: true,
                margin: [0, 10, 0, 5],
            },
        },
    };

    const pdfDoc = printer.createPdfKitDocument(docDefinition);
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=itinerary.pdf");
    pdfDoc.pipe(res);
    pdfDoc.end();
}
module.exports = generateItineraryPDF;