import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Check, Award, Clock, Users, ThumbsUp, Star } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="relative rounded-xl overflow-hidden mb-16">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ 
              backgroundImage: "url('https://images.pexels.com/photos/236731/pexels-photo-236731.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')",
              height: "100%",
              width: "100%"
            }}
          />
          <div className="absolute inset-0 bg-black/60" />
          <div className="relative z-10 py-20 px-6 text-center text-white">
            <h1 className="text-4xl font-bold mb-4">About Alpha Cooling Professional</h1>
            <p className="text-xl max-w-3xl mx-auto">
              We are dedicated to providing exceptional cooling solutions for businesses and industries.
            </p>
          </div>
        </div>
        
        {/* Our Story */}
        <section className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <div className="space-y-4 text-lg">
                <p>
                  Founded in 2005, Alpha Cooling Professional began with a simple mission: to provide reliable, 
                  energy-efficient cooling solutions for businesses. What started as a small team of dedicated 
                  technicians has grown into a leading cooling service provider in the region.
                </p>
                <p>
                  Our commitment to excellence and customer satisfaction has been the driving force behind our 
                  growth. We believe that every business deserves a comfortable environment with cooling systems 
                  that are reliable, efficient, and environmentally friendly.
                </p>
                <p>
                  Today, we serve a wide range of clients across various industries, bringing our expertise 
                  and dedication to every project we undertake.
                </p>
              </div>
            </div>
            <div className="relative h-96 rounded-lg overflow-hidden">
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{ 
                  backgroundImage: "url('https://images.pexels.com/photos/8850593/pexels-photo-8850593.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')" 
                }}
              />
            </div>
          </div>
        </section>
        
        {/* Mission & Values */}
        <section className="mb-16 py-16 px-6 bg-muted rounded-xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Mission & Values</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We are guided by a clear mission and strong values that shape everything we do.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card p-6 rounded-lg shadow-sm">
              <div className="text-yellow-500 mb-4">
                <ThumbsUp className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Our Mission</h3>
              <p>
                To provide exceptional cooling solutions that enhance comfort, efficiency, and productivity 
                while minimizing environmental impact.
              </p>
            </div>
            
            <div className="bg-card p-6 rounded-lg shadow-sm">
              <div className="text-yellow-500 mb-4">
                <Star className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Our Vision</h3>
              <p>
                To be the most trusted and innovative cooling solutions provider, known for excellence, 
                reliability, and commitment to sustainability.
              </p>
            </div>
            
            <div className="bg-card p-6 rounded-lg shadow-sm">
              <div className="text-yellow-500 mb-4">
                <Check className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Our Values</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <div className="mr-2 mt-1 text-yellow-500">•</div>
                  <span>Excellence in every service</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-1 text-yellow-500">•</div>
                  <span>Integrity and transparency</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-1 text-yellow-500">•</div>
                  <span>Innovation and continuous improvement</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-1 text-yellow-500">•</div>
                  <span>Environmental responsibility</span>
                </li>
              </ul>
            </div>
          </div>
        </section>
        
        {/* Our Team */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Leadership Team</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Meet the experienced professionals who lead our company to success.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Michael Richards",
                position: "CEO & Founder",
                bio: "With over 20 years of experience in the cooling industry, Michael leads our company with vision and expertise.",
                image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              },
              {
                name: "Sarah Johnson",
                position: "Technical Director",
                bio: "Sarah oversees all technical operations, ensuring that our services meet the highest quality standards.",
                image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              },
              {
                name: "David Chen",
                position: "Customer Service Manager",
                bio: "David is dedicated to ensuring exceptional customer experiences and building lasting client relationships.",
                image: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              }
            ].map((person, index) => (
              <div key={index} className="group">
                <div className="relative overflow-hidden rounded-t-lg h-64">
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                    style={{ backgroundImage: `url('${person.image}')` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-60" />
                </div>
                <div className="bg-card p-6 rounded-b-lg shadow-sm">
                  <h3 className="text-xl font-semibold">{person.name}</h3>
                  <p className="text-yellow-500 mb-3">{person.position}</p>
                  <p className="text-muted-foreground">{person.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
        
        {/* Stats */}
        <section className="mb-16 py-12 px-6 bg-yellow-500 rounded-xl text-black">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">15+</div>
              <div className="text-black/80 font-medium">Years of Experience</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-black/80 font-medium">Projects Completed</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">50+</div>
              <div className="text-black/80 font-medium">Team Members</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">98%</div>
              <div className="text-black/80 font-medium">Client Satisfaction</div>
            </div>
          </div>
        </section>
        
        {/* CTA */}
        <section className="text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Work With Us?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Contact us today to discuss your cooling needs or schedule a consultation with our experts.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/contact" passHref>
              <Button className="bg-yellow-500 hover:bg-yellow-600 text-black">
                Contact Us
              </Button>
            </Link>
            <Link href="/booking" passHref>
              <Button variant="outline">
                Book a Consultation
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}