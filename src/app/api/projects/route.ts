export function GET() {
  return Response.json(
    {
      projects: [
        {
          id: 1,
          title: "Urban Renewal Initiative",
          description:
            "A project aimed at revitalizing aging city districts through sustainable architecture and community-focused urban planning.",
          image: "https://source.unsplash.com/featured/?urban,architecture",
        },
        {
          id: 2,
          title: "Ocean Cleanup Drive",
          description:
            "An environmental project dedicated to removing plastic waste from the oceans using innovative netting technologies.",
          image: "https://source.unsplash.com/featured/?ocean,cleanup",
        },
        {
          id: 3,
          title: "Digital Literacy for All",
          description:
            "A global initiative to enhance digital skills among underserved populations, focusing on internet safety and basic software competencies.",
          image: "https://source.unsplash.com/featured/?digital,education",
        },
        {
          id: 4,
          title: "Green Rooftops Project",
          description:
            "An eco-friendly project to transform city rooftops into green spaces that provide urban agriculture and reduce building energy usage.",
          image: "https://source.unsplash.com/featured/?greenroof,city",
        },
        {
          id: 5,
          title: "Historic Preservation Society",
          description:
            "A project dedicated to preserving and restoring historical landmarks and buildings to maintain cultural heritage.",
          image: "https://source.unsplash.com/featured/?historic,preservation",
        },
        {
          id: 6,
          title: "Future Farmers Program",
          description:
            "An agricultural initiative to train the next generation of farmers in sustainable farming techniques and technologies.",
          image: "https://source.unsplash.com/featured/?farming,education",
        },
        {
          id: 7,
          title: "Virtual Reality Education",
          description:
            "A project exploring the use of virtual reality to provide immersive educational experiences for students in remote areas.",
          image:
            "https://source.unsplash.com/featured/?virtualreality,education",
        },
        {
          id: 8,
          title: "Smart City Solutions",
          description:
            "A tech-driven project to integrate IoT devices into urban infrastructure, improving efficiency and quality of city services.",
          image: "https://source.unsplash.com/featured/?smartcity,technology",
        },
        {
          id: 9,
          title: "Art for Everyone",
          description:
            "An initiative to make art accessible to all by organizing free art exhibitions and workshops in community centers.",
          image: "https://source.unsplash.com/featured/?art,community",
        },
        {
          id: 10,
          title: "Fitness for Health",
          description:
            "A community health project promoting physical fitness through free public fitness classes and health awareness campaigns.",
          image: "https://source.unsplash.com/featured/?fitness,health",
        },
      ],
    },
  );
}
