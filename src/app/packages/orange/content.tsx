// components/packages/OrangeContent.tsx
export default function OrangeContent() {
    return (
        <div className="max-w-7xl mx-auto p-8 my-10 mt-[-100px] text-gray-800 border rounded-lg shadow bg-white" style={{border: 'none'}}>
            <h1 className="text-2xl font-bold mb-4">
                Reîncărcare directă pentru cartela Orange
            </h1>

            <p className="mb-4">
                Există două opțiuni pentru o reîncărcare Orange pe site-ul cartela.info: fie aveți deja o cartelă Prepay și doriți reîncărcarea creditului Orange, fie aveți Free Sim și doriți să îl activați cu ajutorul site-ului. Pentru orice reîncărcare cartelă Orange puteți alege dintre următoarele variante de opțiuni, mai exact credit, minute sau trafic de internet. Reîncărcarea Orange online se va realiza prin încărcare directă și presupune valori cuprinse între 5 și 200 €.
            </p>

            <p className="mb-4">
                Luați în considerare și faptul că, în cazul unei reîncărcări online Orange, pentru opțiunile cu minute este necesară apelarea unui număr prestabilit pentru activare. În cazul în care doriți opțiunea cu internet, site-ul nostru vă pune la dispoziție valori de reîncărcare cuprinse între 5 și 13 €, fiecare cu propriul pachet. În cazul în care v-ați achiziționat o cartelă PrePay și doriți o încărcare Orange PrePay, țineți minte faptul că în rețeaua Orange veți beneficia de 2000 de minute sau SMS-uri, plus 100 de minute în alte rețele și trafic de internet de 50 MB.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                <div>
                    <h2 className="font-semibold text-lg mb-2">Minute cu 6 € credit:</h2>
                    <ul className="list-disc list-inside space-y-1">
                        <li>3000 min în rețea</li>
                        <li>Nelimitat: SMS în rețea</li>
                        <li>
                            125 de min naționale și internaționale către fix sau SMS naționale
                            din care 50 min sau SMS-uri internaționale pe mobil
                        </li>
                        <li>200 MB trafic de internet</li>
                    </ul>
                </div>

                <div>
                    <h2 className="font-semibold text-lg mb-2">Minute cu 8 € credit:</h2>
                    <ul className="list-disc list-inside space-y-1">
                        <li>Nelimitat: minute în rețea</li>
                        <li>Nelimitat: SMS naționale</li>
                        <li>
                            175 de min naționale și internaționale către fix/ mobil sau
                            SMS-uri internaționale
                        </li>
                        <li>400 MB trafic de internet</li>
                    </ul>
                </div>

                <div>
                    <h2 className="font-semibold text-lg mb-2">Minute cu 10 € credit:</h2>
                    <ul className="list-disc list-inside space-y-1">
                        <li>Nelimitat: minute în rețea</li>
                        <li>Nelimitat SMS naționale</li>
                        <li>
                            200 de minute naționale și internaționale către fix/ mobil sau
                            SMS-uri internaționale
                        </li>
                        <li>800 MB trafic de internet</li>
                    </ul>
                </div>

                <div className="md:col-span-2 lg:col-span-3">
                    <h2 className="font-semibold text-lg mb-2">Minute cu 12 € credit:</h2>
                    <ul className="list-disc list-inside space-y-1">
                        <li>Nelimitat: min în rețea</li>
                        <li>Nelimitat: SMS naționale</li>
                        <li>
                            200 de min naționale și internaționale către fix/ mobil sau
                            SMS-uri internaționale
                        </li>
                        <li>1 GB trafic de internet</li>
                    </ul>
                </div>
            </div>

            <p className="mb-4">
                Înainte de a începe să vă consumați creditul, dacă vă petreceți mai
                mult timp navigând pe internet, vă puteți transfera creditul între altă
                opțiune. De exemplu: trafic de internet, printr-un SMS gratuit la 321 cu
                textul DATA. SIM-urile sunt compatibile cu laptopurile, tabletele sau
                smartphone-uri diverse.
            </p>

            <p>
                Orange s-a făcut remarcat și a câștigat cotă de piață prin acoperirea
                foarte bună și servicii de calitate. Cu Orange Youth, operatorul pune la
                dispoziția celor mai tineri clienți un produs prepaid ce se poate
                personaliza pentru prima oară, astfel încât clientul își poate ajusta
                combinația de minute, SMS-uri și trafic de internet în funcție de
                necesități. Fă acum o reîncărcare cartela Orange cu cardul!
            </p>
        </div>
    );
}
