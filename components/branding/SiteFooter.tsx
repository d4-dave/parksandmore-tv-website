export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell footer-inner">
        <p>&copy; {new Date().getFullYear()} Parks &amp; More</p>
        <div className="footer-links">
          <a href="mailto:info@parksandmore.tv">info@parksandmore.tv</a>
          <a href="https://d4designs.shop" target="_blank" rel="noopener noreferrer">
            A project by D4 Designs
          </a>
        </div>
      </div>
    </footer>
  );
}
