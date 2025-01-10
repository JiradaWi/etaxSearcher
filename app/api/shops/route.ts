/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const sheetUrl =
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vSOqJd4HynvRwlDiWlFtVJXqCdT_YWvkp7GZ2K8MKC0pjPzAgI2iwXNXO8V9CE3lLzbZAr3TnSdWoKL/pub?output=csv";
    const response = await fetch(sheetUrl);

    if (!response.ok) {
      throw new Error("Failed to fetch data from Google Sheets");
    }

    const csvData = await response.text();
    const rows = csvData.split("\n").map((row) => row.split(","));

    // Convert CSV rows to JSON
    const headers = rows[0].map((header) => header.trim());
    // Log headers to identify the date field
    console.log(headers);
    console.log(headers); // Added console log to display headers
    const jsonData = rows
      .slice(1)
      .map((row) => {
        const obj: any = {};
        row.forEach((value, index) => {
          const header = headers[index];
          if (header) {
            // Check if header exists
            if (header.startsWith("tags-")) {
              // Initialize tags array if it doesn't exist
              if (!obj.tags) {
                obj.tags = [];
              }
              // Add the tag to the array
              obj.tags.push(value.trim());
              obj.tags = obj.tags.filter(Boolean);
            } else {
              obj[header] = value.trim(); // Clean each value
            }
          }
        });
        return obj;
      })
      .reverse();

    return NextResponse.json(jsonData);
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
