// components/packages/TelekomContent.tsx
export default function TelekomContent() {
  return (
    <div className="max-w-7xl mx-auto p-8 my-10 mt-[-100px] text-gray-800 border rounded-lg shadow bg-white">
      <h1 className="text-2xl font-bold mb-4">
        Reîncărcare directă pentru cartela Telekom
      </h1>

      <p className="mb-4">
        Grație sistemului de reîncărcare Telekom electronică a cartelelor PrePay veți avea acces, prin intermediul operatorului, la 3 pachete:
      </p>
      <ul className="list-disc list-inside mb-4 space-y-1">
        <li>Reîncărcare cartela Telekom Direct fără cod Pin</li>
        <li>Reîncărcare Telekom Credit</li>
        <li>Reîncărcare Telekom cu minute cu cod PIN</li>
      </ul>

      <p className="mb-4">
        Beneficiați de opțiunea de reîncărcare Telekom online prin urmarea unor pași simpli și puteți reactualiza creditul telefonului în doar câteva minute. Încărcarea cartelei Telekom se poate face cu valoarea necesară, de la 6 la 200 €. Indiferent de tipul cartelei, fie ea Frog, Vibe, MTV Mobile sau Internet veți putea reîncărca sau activa SIM-ul în doar câțiva pași simpli.
      </p>
      <p className="mb-6">Descoperiți câteva dintre opțiunile puse la dispoziție:</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <div>
          <h2 className="font-semibold text-lg mb-2">Opțiunea Extra Date M cu 5.95 € credit:</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>Bonus Extra Voce M, gratis pe o cartelă nouă Telekom</li>
            <li>1000 MB la viteză 4G (din care 500 bonus)</li>
            <li>100 minute internaționale către mobil bonus</li>
          </ul>
        </div>
        <div>
          <h2 className="font-semibold text-lg mb-2">Opțiunea Extra Voce M cu 5.95 € credit:</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>Bonus Extra Voce M, gratis pe o cartelă nouă Telekom</li>
            <li>1000 minute naționale și fix internaționale/SMS-uri naționale (din care 500 bonus)</li>
            <li>100 minute internaționale către mobil bonus</li>
          </ul>
        </div>
        <div>
          <h2 className="font-semibold text-lg mb-2">Opțiunea Extra S cu 4.95 € credit:</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>NELIMITAT minute și SMS-uri în rețelele fixe și mobile Telekom Romania</li>
            <li>200 minute naționale și fix internaționale/SMS-uri naționale (din care 100 Bonus)</li>
            <li>100 MB trafic de internet (din care 50 MB Bonus)</li>
          </ul>
        </div>
        <div>
          <h2 className="font-semibold text-lg mb-2">Opțiunea Extra L cu 6.95 € credit:</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>Bonus Extra Voce M, gratis pe o cartelă nouă Telekom</li>
            <li>1000 minute naționale și fix internaționale/SMS-uri naționale (din care 500 bonus)</li>
            <li>100 minute internaționale către mobil bonus</li>
          </ul>
        </div>
        <div>
          <h2 className="font-semibold text-lg mb-2">Opțiunea Extra XL cu 9.95 € credit:</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>Bonus Extra Voce M, gratis pe o cartelă nouă Telekom</li>
            <li>1500 minute naționale și fix internaționale/SMS-uri naționale (din care 500 bonus)</li>
            <li>100 minute internaționale către mobil bonus</li>
          </ul>
        </div>
        <div>
          <h2 className="font-semibold text-lg mb-2">Extraopțiunea MTV 7x cu 5.00 € credit:</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>Bonus la alegere: 120 minute naționale/internaționale fix/SMS-uri naționale sau 350 MB trafic de date</li>
            <li>Bonus MTV7x, gratis pe o cartelă nouă MTV Mobile</li>
            <li>NELIMITAT minute/SMS-uri în rețelele MTV Mobile și Telekom Romania</li>
            <li>120 minute naționale/internaționale către fix/SMS-uri naționale</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
