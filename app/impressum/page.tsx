export default function ImpressumPage() {
  return (
    <div className="min-h-screen py-16 px-4 max-w-3xl mx-auto text-gray-800">
      <h1 className="text-3xl font-bold mb-6">Impressum</h1>

      <section className="space-y-4 mb-8">
        <p className="font-medium">Angaben gemäß § 5 DDG</p>
        <p>
          Sabine Ehmann <br />
          Untere Au 12 <br />
          74239 Hardthausen am Kocher
        </p>

        <p>
          <strong>Vertreten durch:</strong> <br />
          Sabine Ehmann
        </p>

        <p>
          <strong>Kontakt:</strong> <br />
          Telefon: 0160-98988048 <br />
          E-Mail:{" "}
          <a
            href="mailto:sabine.ehmann@eh-co.com"
            className="text-yellow-600 underline"
          >
            sabine.ehmann@eh-co.com
          </a>
        </p>
      </section>

      <section className="space-y-6 mb-8">
        <div>
          <h2 className="text-2xl font-semibold mb-2">Haftungsausschluss</h2>

          <h3 className="text-xl font-medium mb-1">Haftung für Inhalte</h3>
          <p className="text-sm leading-relaxed">
            Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für
            die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können
            wir jedoch keine Gewähr übernehmen. Als Diensteanbieter sind wir
            gemäß § 7 Abs.1 DDG für eigene Inhalte auf diesen Seiten nach den
            allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 DDG sind wir
            als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder
            gespeicherte fremde Informationen zu überwachen oder nach Umständen
            zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
            Verpflichtungen zur Entfernung oder Sperrung der Nutzung von
            Informationen nach den allgemeinen Gesetzen bleiben hiervon
            unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem
            Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei
            Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese
            Inhalte umgehend entfernen.
          </p>

          <h3 className="text-xl font-medium mt-6 mb-1">Haftung für Links</h3>
          <p className="text-sm leading-relaxed">
            Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren
            Inhalte wir keinen Einfluss haben. Deshalb können wir für diese
            fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der
            verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber
            der Seiten verantwortlich. Die verlinkten Seiten wurden zum
            Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft.
            Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht
            erkennbar. Eine permanente inhaltliche Kontrolle der verlinkten
            Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung
            nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir
            derartige Links umgehend entfernen.
          </p>

          <h3 className="text-xl font-medium mt-6 mb-1">Urheberrecht</h3>
          <p className="text-sm leading-relaxed">
            Die durch die Seitenbetreiber erstellten Inhalte und Werke auf
            diesen Seiten unterliegen dem deutschen Urheberrecht. Die
            Vervielfältigung, Bearbeitung, Verbreitung und jede Art der
            Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der
            schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
            Downloads und Kopien dieser Seite sind nur für den privaten, nicht
            kommerziellen Gebrauch gestattet. Soweit die Inhalte auf dieser
            Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte
            Dritter beachtet. Insbesondere werden Inhalte Dritter als solche
            gekennzeichnet. Sollten Sie trotzdem auf eine
            Urheberrechtsverletzung aufmerksam werden, bitten wir um einen
            entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen
            werden wir derartige Inhalte umgehend entfernen.
          </p>

          <h3 className="text-xl font-medium mt-6 mb-1">Datenschutz</h3>
          <p className="text-sm leading-relaxed">
            Die Nutzung unserer Webseite ist in der Regel ohne Angabe
            personenbezogener Daten möglich. Soweit auf unseren Seiten
            personenbezogene Daten (beispielsweise Name, Anschrift oder
            E-Mail-Adressen) erhoben werden, erfolgt dies, soweit möglich, stets
            auf freiwilliger Basis. Diese Daten werden ohne Ihre ausdrückliche
            Zustimmung nicht an Dritte weitergegeben. Wir weisen darauf hin,
            dass die Datenübertragung im Internet (z. B. bei der Kommunikation
            per E-Mail) Sicherheitslücken aufweisen kann. Ein lückenloser Schutz
            der Daten vor dem Zugriff durch Dritte ist nicht möglich. Der
            Nutzung von im Rahmen der Impressumspflicht veröffentlichten
            Kontaktdaten durch Dritte zur Übersendung von nicht ausdrücklich
            angeforderter Werbung und Informationsmaterialien wird hiermit
            ausdrücklich widersprochen. Die Betreiber der Seiten behalten sich
            ausdrücklich rechtliche Schritte im Falle der unverlangten Zusendung
            von Werbeinformationen, etwa durch Spam-Mails, vor.
          </p>

          {/* <h3 className="text-xl font-medium mt-6 mb-1">Google Analytics</h3>
          <p className="text-sm leading-relaxed">
            Diese Website benutzt Google Analytics, einen Webanalysedienst der
            Google Inc. („Google“). Google Analytics verwendet sog. „Cookies“,
            Textdateien, die auf Ihrem Computer gespeichert werden und die eine
            Analyse der Benutzung der Website durch Sie ermöglichen. Die durch
            den Cookie erzeugten Informationen über Ihre Benutzung dieser
            Website (einschließlich Ihrer IP-Adresse) wird an einen Server von
            Google in den USA übertragen und dort gespeichert. Google wird diese
            Informationen benutzen, um Ihre Nutzung der Website auszuwerten, um
            Reports über die Websiteaktivitäten für die Websitebetreiber
            zusammenzustellen und um weitere mit der Websitenutzung und der
            Internetnutzung verbundene Dienstleistungen zu erbringen.
          </p>
          <p className="text-sm leading-relaxed">
            Auch wird Google diese Informationen gegebenenfalls an Dritte
            übertragen, sofern dies gesetzlich vorgeschrieben oder soweit Dritte
            diese Daten im Auftrag von Google verarbeiten. Google wird in keinem
            Fall Ihre IP-Adresse mit anderen Daten der Google in Verbindung
            bringen. Sie können die Installation der Cookies durch eine
            entsprechende Einstellung Ihrer Browser Software verhindern; wir
            weisen Sie jedoch darauf hin, dass Sie in diesem Fall gegebenenfalls
            nicht sämtliche Funktionen dieser Website voll umfänglich nutzen
            können. Durch die Nutzung dieser Website erklären Sie sich mit der
            Bearbeitung der über Sie erhobenen Daten durch Google in der zuvor
            beschriebenen Art und Weise und zu dem zuvor benannten Zweck
            einverstanden.
          </p>

          <h3 className="text-xl font-medium mt-6 mb-1">Google AdSense</h3>
          <p className="text-sm leading-relaxed">
            Diese Website benutzt Google AdSense, einen Webanzeigendienst der
            Google Inc., USA („Google“). Google AdSense verwendet sog. „Cookies“
            sowie „Web Beacons“ (kleine unsichtbare Grafiken), durch die
            Informationen wie der Besucherverkehr auf dieser Website analysiert
            werden können. Die durch Cookies und Web Beacons erzeugten
            Informationen über die Benutzung dieser Website (einschließlich der
            IP-Adresse der Nutzer) und Auslieferung von Werbeformaten werden an
            einen Server von Google in den USA übertragen und dort gespeichert.
            Diese Informationen können von Google an Vertragspartner von Google
            weitergegeben werden. Google wird Ihre IP-Adresse jedoch nicht mit
            anderen von Ihnen gespeicherten Daten zusammenführen.
          </p>
          <p className="text-sm leading-relaxed">
            Sie können das Speichern der Cookies durch eine entsprechende
            Einstellung Ihrer Browser-Software verhindern. Durch die Nutzung
            dieser Website erklären Sie sich mit der Bearbeitung der über Sie
            erhobenen Daten durch Google in der zuvor beschriebenen Art und
            Weise und zu dem zuvor benannten Zweck einverstanden.
          </p> */}
        </div>
      </section>

      <p className="text-xs text-gray-500">
        Erstellt mit dem{" "}
        <a
          href="https://impressum-generator.de"
          className="underline text-yellow-600"
          rel="dofollow"
          target="_blank"
        >
          Impressum-Generator
        </a>{" "}
        von WebsiteWissen.com.
      </p>
    </div>
  );
}
