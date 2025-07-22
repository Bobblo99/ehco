import { ContactForm } from "@/components/contact-form";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-4">Kontaktiere uns</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Hast du Fragen oder benötigst Unterstützung? Nimm Kontakt mit
            unserem Team auf.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-semibold mb-6">
              Schreib uns eine Nachricht
            </h2>
            <Card>
              <CardContent className="p-6">
                <ContactForm />
              </CardContent>
            </Card>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-6">
              Kontaktinformationen
            </h2>
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <MapPin className="h-5 w-5 text-yellow-500 mr-3 mt-0.5" />
                      <div>
                        <h3 className="font-medium">Unser Standort</h3>
                        <p className="text-muted-foreground">
                          Coolingstraße 123
                          <br />
                          Froststadt, FZ 12345
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <Phone className="h-5 w-5 text-yellow-500 mr-3 mt-0.5" />
                      <div>
                        <h3 className="font-medium">Telefon</h3>
                        <p className="text-muted-foreground">
                          Zentrale: +1 (555) 123-4567
                          <br />
                          Support: +1 (555) 987-6543
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <Mail className="h-5 w-5 text-yellow-500 mr-3 mt-0.5" />
                      <div>
                        <h3 className="font-medium">E-Mail</h3>
                        <p className="text-muted-foreground">
                          info@alphacooling.com
                          <br />
                          support@alphacooling.com
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <Clock className="h-5 w-5 text-yellow-500 mr-3 mt-0.5" />
                      <div>
                        <h3 className="font-medium">Geschäftszeiten</h3>
                        <p className="text-muted-foreground">
                          Montag – Freitag: 08:00 – 18:00 Uhr
                          <br />
                          Samstag: 09:00 – 14:00 Uhr
                          <br />
                          Sonntag: Geschlossen
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="mt-6">
                <h3 className="font-medium mb-4">Finde uns</h3>
                <div className="relative w-full h-64 rounded-lg overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d892.4338652988431!2d9.355877897470895!3d49.238893977772676!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47983ca370055571%3A0x177b7f02f4986341!2su.%20Au%2012%2C%2074239%20Hardthausen%20am%20Kocher!5e0!3m2!1sde!2sde!4v1753195459278!5m2!1sde!2sde"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Google Map"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
