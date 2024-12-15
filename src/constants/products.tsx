import pip from "@images/pip.webp";
import sidefolioAceternity2 from "@images/sidefolio-aceternity-2.png";
import kafka from "@images/Kafka.jpg";
import sidefolioAlgochurn2 from "@images/sidefolio-algochurn.png";
import kira_anime from "@images/kira-anime.png";
import sidefolioMoonbeam2 from "@images/sidefolio-moonbeam-2.png";
import hunted_house from "@images/haunted-house1.png";
import haunted_house from "@images/hunted-house.png";
import {Product} from "@/types/products";

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
      <div>
        <p>
          LazyORM is a Python library designed to simplify database interactions with MySQL. It provides a clean and efficient way to work with your data by leveraging lazy loading techniques.{" "}
        </p>
        <strong>Key Features</strong>
        {/*horizontal line*/}
        <hr />
        <ul>
          <li><strong>Lazy Loading:</strong> Fetch data from the database only when it's actually needed, improving performance and reducing memory usage.</li>
          <li><strong>Simplified API:</strong> Interact with your database using intuitive methods for a smooth development experience.</li>
          <li><strong>Connection Pooling:</strong> Manages database connections efficiently for faster and more reliable database access.</li>
          <li><strong>Logging:</strong> Provides comprehensive logging capabilities to help you monitor and troubleshoot database interactions.</li>
        </ul> {" "}
      </div>
    ),
  },
  {
    href: "",
    title: "Kafka Manager with Notification Service",
    description:
      "This project involves the development of a Kafka Manager integrated with a robust Notification Service. Designed with a best-practice architecture, the system facilitates efficient message management and real-time notifications. The manager is seamlessly connected with LazzyORM in Python, ensuring smooth data interactions and enhanced system performance.",
    thumbnail: kafka,
    images: [kafka, sidefolioAlgochurn2],
    stack: ["Python", "Kafka", "MySQL", "LazzyORM"],
    slug: "kafka-manager",
    content: (
      <div>
        <p>
          This project involves the development of a Kafka Manager integrated with a robust Notification Service. Designed with a best-practice architecture, the system facilitates efficient message management and real-time notifications. The manager is seamlessly connected with LazzyORM in Python, ensuring smooth data interactions and enhanced system performance.{" "}
        </p>
        <strong>Key Features</strong>
        {/*horizontal line*/}
        <hr />
        <ul>
          <li><strong>Real-time Notifications:</strong> Stay updated with instant notifications for new messages and system events.</li>
          <li><strong>Message Management:</strong> Manage messages efficiently.</li>
          <li><strong>Robust Architecture:</strong> Built with a scalable and reliable architecture for optimal performance and system stability.</li>
          <li><strong>Seamless Integration:</strong> Seamlessly integrates with LazzyORM for smooth data interactions and enhanced system performance.</li>
          <li><strong>Notification Service:</strong> Supports multiple notification channels (e.g., email, SMS, in-app notifications).
            Ensures high availability and fault tolerance.</li>
          <li><strong>Notification Management:</strong> Best-practice design emphasizing modularity, scalability, and maintainability. Clear separation of concerns for Kafka management and notification functionalities.</li>
        </ul> {" "}
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
      <div>
        <p>
          AnimeHub is a modern web application built with Next.js that serves as a community platform for anime enthusiasts. It features a sleek UI with 3D card animations, real-time updates, and comprehensive anime information sourced from the MyAnimeList API.{" "}
        </p>
        <strong>Key Features</strong>
        {/*horizontal line*/}
        <hr />
        <ul>
          <li>
            <strong>🎨 Modern UI Components:</strong>{" "}
            <ul>
              <li><strong>3D Card Animations:</strong> Interactive cards with depth and motion effects</li>
              <li><strong>Responsive Design:</strong> Seamless experience across all devices</li>
              <li><strong>Dark Theme:</strong> Eye-friendly dark mode interface</li>
            </ul>
          </li>
          <li>
            <strong>🔐 Authentication:</strong>{" "}
            <ul>
              <li>Email/Password login</li>
              <li>OAuth integration with:</li>
              <ul>
                <li>GitHub</li>
                <li>Google</li>
              </ul>
            </ul>
          </li>
          <li>
            <strong>📱 Core Features:</strong>{" "}
            <ul>
              <li>Anime Discovery: Browse and search anime with advanced filters</li>
              <li>Community Features: Join anime-specific communities</li>
              <li>Real-time Updates: Stay updated with the latest anime discussions</li>
              <li>Infinite Scroll: Smooth content loading experience</li>
            </ul>
          </li>
        </ul> {" "}
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
      <div>
        <p>
          Hunted House is a spooky web application built with Three.js. It features a haunted house theme with a dark color scheme, ghostly animations. The site is designed to provide a chilling experience for users, making it perfect for Halloween or horror-themed events.{" "}
        </p>
        <strong>Key Features</strong>
        {/*horizontal line*/}
        <hr />
        <ul>
          <li><strong>Spooky Theme:</strong> Dark color scheme and ghostly animations for a chilling experience</li>
          <li><strong>Interactive Elements:</strong> Engaging interactions and animations to captivate users</li>
          <li><strong>Immersive Experience:</strong> 3D environment with detailed visuals and atmospheric effects</li>
          <li><strong>Perfect for Halloween:</strong> Ideal for Halloween events, horror-themed parties, and spooky occasions</li>
        </ul> {" "}
      </div>
    ),
  },
];
