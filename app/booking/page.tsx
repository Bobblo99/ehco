import { BookingForm } from "@/components/booking-form";
import { Card, CardContent } from "@/components/ui/card";
import { services } from "@/lib/mock-data";

export default function BookingPage() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-4">Book Your Treatment</h1>
            <p className="text-muted-foreground">
              Schedule your cooling therapy session with our expert therapists.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {services.map((service) => (
              <Card key={service.id} className="bg-card">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-2">{service.name}</h3>
                  <p className="text-muted-foreground text-sm mb-3">
                    {service.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-yellow-500 font-semibold">
                      €{service.price}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {service.duration} min
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardContent className="p-6">
              <BookingForm />
            </CardContent>
          </Card>

          <div className="mt-12 bg-muted p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">What to Expect</h2>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="inline-block w-6 h-6 bg-yellow-500 text-black rounded-full flex items-center justify-center mr-3 mt-0.5 font-bold text-sm">
                  1
                </span>
                <span>Select your preferred treatment type and duration.</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-6 h-6 bg-yellow-500 text-black rounded-full flex items-center justify-center mr-3 mt-0.5 font-bold text-sm">
                  2
                </span>
                <span>Choose from available dates and time slots.</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-6 h-6 bg-yellow-500 text-black rounded-full flex items-center justify-center mr-3 mt-0.5 font-bold text-sm">
                  3
                </span>
                <span>Fill in your details and any specific requirements.</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-6 h-6 bg-yellow-500 text-black rounded-full flex items-center justify-center mr-3 mt-0.5 font-bold text-sm">
                  4
                </span>
                <span>Receive confirmation of your booking via email.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
