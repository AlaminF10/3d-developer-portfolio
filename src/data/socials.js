import { FaGithub, FaFacebook, FaInstagram, FaWhatsapp, FaEnvelope } from "react-icons/fa";

// WhatsApp uses a click-to-chat link (wa.me) instead of printing the raw number,
// which keeps the number away from simple spam scrapers.
const WHATSAPP_NUMBER = "8801853400546"; // country code + number, no "+" or spaces

export const socials = [{
        name: "GitHub",
        handle: "@MohammadAlAmin10",
        url: "https://github.com/MohammadAlAmin10",
        icon: FaGithub,
        color: "#e6e6f0",
    },
    {
        name: "Facebook",
        handle: "Rakin0415",
        url: "https://www.facebook.com/Rakin0415/",
        icon: FaFacebook,
        color: "#3b82f6",
    },
    {
        name: "Instagram",
        handle: "@___mak10",
        url: "https://www.instagram.com/___mak10/",
        icon: FaInstagram,
        color: "#ec4899",
    },
    {
        name: "WhatsApp",
        handle: "Chat with me",
        url: `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      "Hi Al Amin, I saw your portfolio and would like to talk."
    )}`,
        icon: FaWhatsapp,
        color: "#22c55e",
    },
    {
        name: "Email",
        handle: "mohammadalamin2352210@gmail.com",
        url: "mailto:mohammadalamin2352210@gmail.com",
        icon: FaEnvelope,
        color: "#a78bfa",
    },
];