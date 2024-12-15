import pip from "@images/pip.webp";
import sidefolioAceternity2 from "@images/sidefolio-aceternity-2.png";
import kafka from "@images/Kafka.jpg";
import sidefolioAlgochurn2 from "@images/sidefolio-algochurn.png";
import kira_anime from "@images/kira-anime.png";
import sidefolioMoonbeam2 from "@images/sidefolio-moonbeam-2.png";
import hunted_house from "@images/haunted-house1.png";
import haunted_house from "@images/hunted-house.png";
import { Product } from "@/types/products";

export const products: Product[] = [
  {
    href: "https://github.com/Dipendra-creator/LazzyORM",
    title: "LazzyORM",
    description:
      "LazyORM is a Python library designed to simplify database interactions with MySQL. It provides a clean and efficient way to work with your data by leveraging lazy loading techniques.",
    thumbnail: pip,
    images: [pip, sidefolioAceternity2],
    stack: ["Python", "MySQL"],
    slug: "lazzyorm",
    content: (
      <div className="space-y-6">
        <p className="text-gray-700 leading-relaxed">
          LazyORM is a Python library designed to simplify database interactions with MySQL. It provides a clean and efficient way to work with your data by leveraging lazy loading techniques.
        </p>
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">Key Features</h3>
          <hr className="border-gray-200 mb-4" />
          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            <li><span className="font-medium">Lazy Loading:</span> Fetch data from the database only when it's actually needed, improving performance and reducing memory usage.</li>
            <li><span className="font-medium">Simplified API:</span> Interact with your database using intuitive methods for a smooth development experience.</li>
            <li><span className="font-medium">Connection Pooling:</span> Manages database connections efficiently for faster and more reliable database access.</li>
            <li><span className="font-medium">Logging:</span> Provides comprehensive logging capabilities to help you monitor and troubleshoot database interactions.</li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    href: "",
    title: "Kafka Manager with Notification Service",
    description:
      "This project involves the development of a Kafka Manager integrated with a robust Notification Service. Designed with a best-practice architecture, the system facilitates efficient message management and real-time notifications.",
    thumbnail: kafka,
    images: [kafka, sidefolioAlgochurn2],
    stack: ["Python", "Kafka", "MySQL", "LazzyORM"],
    slug: "kafka-manager",
    content: (
      <div className="space-y-6">
        <p className="text-gray-700 leading-relaxed">
          This project involves the development of a Kafka Manager integrated with a robust Notification Service. Designed with a best-practice architecture, the system facilitates efficient message management and real-time notifications. The manager is seamlessly connected with LazzyORM in Python, ensuring smooth data interactions and enhanced system performance.
        </p>
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">Key Features</h3>
          <hr className="border-gray-200 mb-4" />
          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            <li><span className="font-medium">Real-time Notifications:</span> Stay updated with instant notifications for new messages and system events.</li>
            <li><span className="font-medium">Message Management:</span> Manage messages efficiently.</li>
            <li><span className="font-medium">Robust Architecture:</span> Built with a scalable and reliable architecture for optimal performance and system stability.</li>
            <li><span className="font-medium">Seamless Integration:</span> Seamlessly integrates with LazzyORM for smooth data interactions and enhanced system performance.</li>
            <li><span className="font-medium">Notification Service:</span> Supports multiple notification channels (e.g., email, SMS, in-app notifications). Ensures high availability and fault tolerance.</li>
            <li><span className="font-medium">Notification Management:</span> Best-practice design emphasizing modularity, scalability, and maintainability. Clear separation of concerns for Kafka management and notification functionalities.</li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    href: "https://kira-anime.vercel",
    title: "Kira Anime",
    description:
      "AnimeHub is a modern web application built with Next.js that serves as a community platform for anime enthusiasts. It features a sleek UI with 3D card animations, real-time updates, and comprehensive anime information sourced from the MyAnimeList API.",
    thumbnail: kira_anime,
    images: [kira_anime, sidefolioMoonbeam2],
    stack: ["Nextjs", "Tailwind Css", "Jikan API", "Rust API"],
    slug: "kira-anime",
    content: (
      <div className="space-y-6">
        <p className="text-gray-700 leading-relaxed">
          AnimeHub is a modern web application built with Next.js that serves as a community platform for anime enthusiasts. It features a sleek UI with 3D card animations, real-time updates, and comprehensive anime information sourced from the MyAnimeList API.
        </p>
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">Key Features</h3>
          <hr className="border-gray-200 mb-4" />
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-gray-900">🎨 Modern UI Components</h4>
              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                <li><span className="font-medium">3D Card Animations:</span> Interactive cards with depth and motion effects</li>
                <li><span className="font-medium">Responsive Design:</span> Seamless experience across all devices</li>
                <li><span className="font-medium">Dark Theme:</span> Eye-friendly dark mode interface</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-900">🔐 Authentication</h4>
              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                <li>Email/Password login</li>
                <li>OAuth integration with:
                  <ul className="list-circle pl-5 mt-1">
                    <li>GitHub</li>
                    <li>Google</li>
                  </ul>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-900">📱 Core Features</h4>
              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                <li><span className="font-medium">Anime Discovery:</span> Browse and search anime with advanced filters</li>
                <li><span className="font-medium">Community Features:</span> Join anime-specific communities</li>
                <li><span className="font-medium">Real-time Updates:</span> Stay updated with the latest anime discussions</li>
                <li><span className="font-medium">Infinite Scroll:</span> Smooth content loading experience</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    href: "https://github.com/Dipendra-creator/Hunted_House",
    title: "Hunted House",
    description:
      "Hunted House is a spooky web application built with Three.js. It features a haunted house theme with a dark color scheme, ghostly animations. The site is designed to provide a chilling experience for users, making it perfect for Halloween or horror-themed events.",
    thumbnail: hunted_house,
    images: [hunted_house, haunted_house],
    stack: ["Three.js", "Javascript"],
    slug: "hunted-house",
    content: (
      <div className="space-y-6">
        <p className="text-gray-700 leading-relaxed">
          Hunted House is a spooky web application built with Three.js. It features a haunted house theme with a dark color scheme, ghostly animations. The site is designed to provide a chilling experience for users, making it perfect for Halloween or horror-themed events.
        </p>
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">Key Features</h3>
          <hr className="border-gray-200 mb-4" />
          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            <li><span className="font-medium">Spooky Theme:</span> Dark color scheme and ghostly animations for a chilling experience</li>
            <li><span className="font-medium">Interactive Elements:</span> Engaging interactions and animations to captivate users</li>
            <li><span className="font-medium">Immersive Experience:</span> 3D environment with detailed visuals and atmospheric effects</li>
            <li><span className="font-medium">Perfect for Halloween:</span> Ideal for Halloween events, horror-themed parties, and spooky occasions</li>
          </ul>
        </div>
      </div>
    ),
  },
];

