import React, { useEffect, useState } from "react";
import { FastAverageColor } from "fast-average-color";

const sampleData = [
  {
    id: 1,
    name: "Woodland Haven",
    description: "Countryside wedding venue",
    rating: 4.8,
    price: "$13,310",
    maxCapacity: 200,
    size: "5,382 ft²",
    freeParking: true,
    freeLunch: true,
    imageUrl: "/images/pexels-1.jpg", // Replace with actual image URL
  },
  {
    id: 2,
    name: "Sunny Meadows",
    description: "Charming outdoor wedding venue",
    rating: 4.6,
    price: "$12,000",
    maxCapacity: 200,
    size: "4,500 ft²",
    freeParking: true,
    freeLunch: false,
    imageUrl: "/images/pexels-2.jpg", // Replace with actual image URL
  },
  {
    id: 3,
    name: "Sunny Meadows",
    description: "Charming outdoor wedding venue",
    rating: 4.6,
    price: "$12,000",
    maxCapacity: 200,
    size: "4,500 ft²",
    freeParking: true,
    freeLunch: false,
    imageUrl: "/images/pexels-3.jpg", // Replace with actual image URL
  },
  {
    id: 4,
    name: "Sunny Meadows",
    description: "Charming outdoor wedding venue",
    rating: 4.6,
    price: "$12,000",
    maxCapacity: 200,
    size: "4,500 ft²",
    freeParking: true,
    freeLunch: false,
    imageUrl: "/images/pexels-1.jpg", // Replace with actual image URL
  },
  {
    id: 5,
    name: "Sunny Meadows",
    description: "Charming outdoor wedding venue",
    rating: 4.6,
    price: "$12,000",
    maxCapacity: 200,
    size: "4,500 ft²",
    freeParking: true,
    freeLunch: false,
    imageUrl: "/images/pexels-2.jpg", // Replace with actual image URL
  },
];

export default function Gifts() {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header */}
      <header className="flex justify-between items-center px-6 py-4 bg-white shadow-md">
        <h1 className="text-lg font-bold text-green-700">WeddingWonders</h1>
        <div className="flex space-x-4">
          <button>
            <span role="img" aria-label="Notifications">
              🔔
            </span>
          </button>
          <button>
            <span role="img" aria-label="Menu">
              🛒
            </span>
          </button>
        </div>
      </header>

      {/* Search and Filter */}
      <div className="p-4">
        <div className="flex items-center bg-white rounded-lg shadow-md px-4 py-2">
          <input
            type="text"
            placeholder="Discover Wedding Venues Faster and Easier..."
            className="flex-1 outline-none"
          />
          <button>
            <span role="img" aria-label="Search">
              🔍
            </span>
          </button>
        </div>

        <div className="flex space-x-4 mt-4 overflow-x-auto">
          {["Church", "Hotel", "Cafe", "Farm", "Beach"].map((category) => (
            <button
              key={category}
              className="flex items-center bg-white rounded-full px-4 py-2 shadow-md"
            >
              <span role="img" aria-label={category}>
                🏛️
              </span>
              <span className="ml-2">{category}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="p-4 space-y-6">
        {sampleData.map((venue) => (
          <VenueCard key={venue.id} venue={venue} />
        ))}
      </div>
    </div>
  );
}

function VenueCard({ venue }: { venue: typeof sampleData[0] }) {
  const [backgroundColor, setBackgroundColor] = useState<string>("#e0e0e0");

  useEffect(() => {
    const fac = new FastAverageColor();

    fac
      .getColorAsync(venue.imageUrl, { algorithm: 'dominant' })
      .then((color) => {
        setBackgroundColor(color.hex); // Set the dominant color as the background
      })
      .catch((error) => {
        console.error("Error extracting colors:", error);
        setBackgroundColor("#dfe6e9"); // Fallback color
      });

    // Cleanup
    return () => fac.destroy();
  }, [venue.imageUrl]);

  return (
    <div className="relative bg-white rounded-lg shadow-md overflow-hidden">
      {/* Background Color */}
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: backgroundColor,
          filter: "brightness(0.8)", // Slight darkening for contrast
        }}
      ></div>

      {/* Image */}
      <img
        src={venue.imageUrl}
        alt={venue.name}
        className="relative z-10 w-full h-48 object-cover"
        onError={(e) => {
          console.error("Image failed to load");
          e.currentTarget.src = "https://via.placeholder.com/400x200"; // Fallback image
        }}
      />

      {/* Glass Effect for Content */}
      <div className="relative z-20 bg-white bg-opacity-75 backdrop-blur-md p-4">
        <h2 className="text-lg font-bold">{venue.name}</h2>
        <p className="text-gray-500">{venue.description}</p>
        <div className="flex justify-between items-center mt-4">
          <span className="text-lg font-bold">{venue.price}</span>
          <button className="bg-gray-200 px-4 py-2 rounded-lg text-gray-800">
            Regalar
          </button>
        </div>
      </div>
    </div>
  );
}