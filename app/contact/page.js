export const metadata = {
  title: "Contact · Diya Limbani",
};

const links = [
  { label: "Email", value: "diyalimbani173@gmail.com", href: "mailto:diyalimbani173@gmail.com" },
  { label: "GitHub", value: "letDiyaCode", href: "https://github.com/letDiyaCode" },
  { label: "LinkedIn", value: "Diya Limbani", href: "https://www.linkedin.com/in/diya-limbani-b80b84325/" },
];

export default function Contact() {
  return (
    <section className="content">
      <h1 className="page-title">
        Get in <span className="gradient-text">touch</span>
      </h1>
      <p className="lead">
        Want to work together or just say hi? Reach me through any of these.
      </p>

      <ul className="contact-list">
        {links.map((link) => {
          const isExternal = link.href.startsWith("http");
          return (
            <li key={link.label}>
              <a
                href={link.href}
                className="contact-item"
                {...(isExternal ? { target: "_blank", rel: "noreferrer" } : {})}
              >
                <span className="contact-label">{link.label}</span>
                <span className="contact-value">{link.value}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
