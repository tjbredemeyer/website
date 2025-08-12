import React from 'react';
import './App.css';

const LINKS = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/tjbredemeyer/' },
  { label: 'Teicor', href: 'https://www.teicor.com/' },
  // Email handled separately via obfuscation
];

export default function App() {
  const topbarRef = React.useRef(null);
  const navRef = React.useRef(null);
  const brandRef = React.useRef(null);
  const [stacked,setStacked] = React.useState(false);

  React.useEffect(()=>{
    function check(){
      if(!topbarRef.current || !navRef.current || !brandRef.current) return;
      const totalWidth = topbarRef.current.clientWidth;
      const brandWidth = brandRef.current.clientWidth;
      const navWidth = navRef.current.scrollWidth;
      // 48px padding left/right already inside; allow 32px spacing buffer
      const availableForNav = totalWidth - brandWidth - 64;
      setStacked(navWidth > availableForNav);
    }
    check();
    const ro = new ResizeObserver(check);
    if(topbarRef.current) ro.observe(topbarRef.current);
    window.addEventListener('resize', check);
    return ()=>{ window.removeEventListener('resize', check); ro.disconnect(); };
  },[]);
  function EmailLink() {
    // Base64 parts for obfuscation of real email tj@teicor.com
    // 'tj' -> dGo= , 'teicor.com' -> dGVpY29yLmNvbQ==
    const uPart = 'dGo='; // tj
    const dPart = 'dGVpY29yLmNvbQ=='; // teicor.com
    const [addr,setAddr] = React.useState('');
    React.useEffect(()=>{
      const decode = atob;
      const user = decode(uPart);
      const domain = decode(dPart);
      setAddr(user + '@' + domain);
    },[]);
    if(!addr) return <span>Email</span>;
    return <a href={`mailto:${addr}`}>Email</a>;
  }
  return (
    <div className="page">
      <header ref={topbarRef} className={`topbar ${stacked ? 'stacked' : ''}`}>
        {(() => {
          const isRoot = typeof window !== 'undefined' && window.location.pathname === '/';
          return isRoot ? (
            <span ref={brandRef} className="brand brand-static">TJ Bredemeyer</span>
          ) : (
            <a ref={brandRef} className="brand" href="/">TJ Bredemeyer</a>
          );
        })()}
        <nav ref={navRef} className="nav">
            {LINKS.map(l => (
              <a key={l.label} href={l.href} target={l.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
                {l.label}
              </a>
            ))}
            <EmailLink />
        </nav>
        <span className="topbar-spacer" aria-hidden="true" />
      </header>
      <main className="content">
        <div className="bio-block">
          <p className="intro-top">BBE Energy ⚡<br/><br/>Founder @ Teicor -&gt; we put the Performance in Performance Bookkeeping</p>
          <p className="intro">Co-Founder + 7x Venture Backed. Retail, CPG, Amazon, Tech, Web3.</p>
          <p>Entrepreneurial visionary and growth expert, TJ is a trailblazer in the realms of retail, consumer goods, technology, and the emerging world of Web3. With an impressive career marked by a series of high-impact ventures, TJ has consistently driven customer growth, spearheaded product development, and executedseamless delivery operations.</p>
          <div className="line-grid">
            <div className="line-item">🐻 PartyBear</div>
            <div className="line-item">⚡️ 7x venture-backed</div>
            <div className="line-item">🤝 3x acquisitions</div>
            <div className="line-item">🛍️ Brandable</div>
            <div className="line-item">📈 5x funding rounds</div>
            <div className="line-item">🎯 $200M+ GMV</div>
          </div>
          <p></p>
          <p>Tampa-based father to Ashton & Brock with golden doodle Leo.</p>
          <p className="footer-links">
            {LINKS.map(l => (
              <a key={l.label} href={l.href} target={l.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
                {l.label}
              </a>
            ))}
            <EmailLink />
          </p>
        </div>
      </main>
    </div>
  );
}