export interface Monument {
  id: number;
  name: string;
  location: string;
  year: number;
  description: string;
  funFacts: string[];
}

export interface UserRewards {
  totalPoints: number;
  level: number;
  discoveries: number;
  lastUpdated: Date;
}

export const MOCK_MONUMENTS: Monument[] = [
  {
    id: 1,
    name: "The Great Pyramid of Giza",
    location: "Giza, Egypt",
    year: 2580,
    description: "The oldest and largest of the three pyramids in the Giza pyramid complex, and the oldest of the Seven Wonders of the Ancient World.",
    funFacts: [
      "Built as a tomb for Pharaoh Khufu",
      "Originally stood at 146.5 meters tall",
      "Contains approximately 2.3 million stone blocks"
    ]
  },
  {
    id: 2,
    name: "The Colosseum",
    location: "Rome, Italy",
    year: 80,
    description: "An oval amphitheatre in the centre of Rome, Italy, just east of the Roman Forum. It is the largest ancient amphitheatre ever built.",
    funFacts: [
      "Could hold between 50,000 and 80,000 spectators",
      "Used for gladiatorial contests and public spectacles",
      "Still two-thirds of the original structure remains"
    ]
  },
  {
    id: 3,
    name: "Stonehenge",
    location: "Wiltshire, England",
    year: 3000,
    description: "A prehistoric monument consisting of a ring of standing stones, each around 13 feet high, seven feet wide, and weighing around 25 tons.",
    funFacts: [
      "Built in several stages over 1500 years",
      "Stone blocks transported from 150 miles away",
      "Alignment with the summer and winter solstices"
    ]
  },
  {
    id: 4,
    name: "Machu Picchu",
    location: "Peru",
    year: 1450,
    description: "A 15th-century Inca citadel located in the Eastern Cordillera of southern Peru on a 2,430-metre mountain ridge.",
    funFacts: [
      "Built without the use of wheels or iron tools",
      "Hidden from Spanish conquistadors",
      "Declared a UNESCO World Heritage site in 1983"
    ]
  },
  {
    id: 5,
    name: "The Great Wall of China",
    location: "China",
    year: -220,
    description: "A series of fortifications made of stone, brick, tamped earth, wood, and other materials, generally built along an east-to-west line across the historical northern borders of China.",
    funFacts: [
      "Total length of all walls is approximately 21,196 km",
      "Not a continuous wall but a series of walls and fortifications",
      "Built over several dynasties spanning 2,000 years"
    ]
  },
  {
    id: 6,
    name: "Taj Mahal",
    location: "Agra, India",
    year: 1653,
    description: "An ivory-white marble mausoleum on the south bank of the Yamuna river in the Indian city of Agra. It was commissioned in 1632 by the Mughal emperor Shah Jahan.",
    funFacts: [
      "Built as a tomb for emperor's wife Mumtaz Mahal",
      "Construction took 22 years and 20,000 workers",
      "Changes color throughout the day from pink to white to golden"
    ]
  }
];
