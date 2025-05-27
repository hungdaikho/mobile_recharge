const Footer = () => {
  return (
    <footer className="bg-gray-100 pb-14 pt-10 sm:pt-20 px-4 text-md text-gray-900 border-t-1 border-gray-200">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <a href="/">
          <div className="space-y-2">
            <div className="flex items-center justify-center md:justify-normal mb-6">
              <div className="w-16 mr-2">
                <svg viewBox="0 0 72 54" className="w-full h-full">
                  {[
                    [27, 3], [39, 3], [51, 3],
                    [15, 15], [27, 15], [39, 15],
                    [3, 27], [15, 27], [27, 27], [39, 27], [51, 27, 4], [63, 27],
                    [15, 39], [27, 39], [39, 39],
                    [27, 51], [39, 51], [51, 51]
                  ].map(([cx, cy, r = 3], i) => (
                    <circle key={i} cx={cx} cy={cy} r={r} style={{ fill: "rgb(17, 17, 17)" }} />
                  ))}
                </svg>
              </div>
              <span className="text-4xl sm:text-4xl font-bold">cartela.info</span>
            </div>
          </div>
        </a>
        <div className="grid grid-cols-2 col-span-2">
          <ul className="space-y-2">
            <li><a href="/faq">FAQ</a></li>
            <li><a href="/how-to-pay">How do I Recharge &amp; Pay?</a></li>
            <li><a href="/contact">Contact us</a></li>
          </ul>
          <ul className="space-y-2">
            <li><a href="/terms">Terms and conditions</a></li>
            <li><a href="/privacy-policy">Privacy policy</a></li>
            <li><a href="/cookie-policy">Cookie Policy</a></li>
            <li><a href="/return-policy">Return policy</a></li>
          </ul>
        </div>
      </div>

      <div className="mt-12 text-center text-md text-gray-500">
        <p>Cartela.info is an independent service and is not affiliated with other resellers.</p>
        <p>Copyright © 2025 cartela.info. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
