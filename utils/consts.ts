export const EMAIL_REGEX = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/;

export const BASIC_API_URL = "https://admin.pozywka.pl/wp-json/wp/v2";

export const DEFAULT_TAGS = [
  { id: 13, name: "Ale cacko!", slug: "ale-cacko" },
  { id: 12, name: "Fenomeny Kulinarne", slug: "fenomeny-kulinarne" },
  { id: 11, name: "Filmy i seriale", slug: "filmy-i-seriale" },
  { id: 10, name: "Książki", slug: "ksiazki" },
  { id: 9, name: "Podróże", slug: "podroze" },
  { id: 8, name: "Miejsca", slug: "miejsca" },
  {
    id: 7,
    name: "Smakołyki",
    slug: "smakolyki",
  },
];

export const DEFAULT_CATEGORIES = [
  { id: 12, name: "Jem", slug: "jem", icon: "🍽️" },
  { id: 6, name: "Mówię", slug: "podcasts", icon: "🎤" },
  { id: 1, name: "Piszę", slug: "posts", icon: "✏️" },
];

export const POSTS_PER_PAGE = 10;

export const SOCIALS = [
  { slug: "fb", link: "https://www.facebook.com/pozywka/" },
  { slug: "ig", link: "https://www.instagram.com/pozywka_/" },
  { slug: "yt", link: "https://www.youtube.com/channel/UC3i8ccfHDUEP7M1HdqESWEA" },
  { slug: "spotify", link: "https://open.spotify.com/show/4rplKIstn56nlTUEPgAYVT?si=c65b94dc83ef4fc1" },
];
