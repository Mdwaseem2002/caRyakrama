import Image from "next/image";
import { Phone, Clock, Mail, MapPin } from "lucide-react";

export default function Contact() {
  return (
    <main className="min-h-screen max-w-5xl mx-auto px-4 py-10" style={{ background: "var(--background)" }}>
      <h1 className="text-3xl font-bold mb-8" style={{ color: "var(--foreground)" }}>Contact Us</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left: Showroom image + contact info */}
        <div className="flex flex-col gap-4">
          {/* Showroom Image */}
          <div className="relative w-full h-52 rounded-2xl overflow-hidden shadow-sm">
            <Image
              src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=800&auto=format&fit=crop"
              alt="caRyakrama Bengaluru Showroom"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          {/* Call Us Button */}
          <a
            href="tel:+97143772503"
            className="flex items-center justify-center gap-2 bg-primary text-white font-semibold py-4 rounded-xl hover:bg-primary/90 transition-colors text-base"
          >
            <Phone className="w-5 h-5" />
            Call Us
          </a>

          {/* Details */}
          <div className="rounded-2xl shadow-sm divide-y mt-4 md:mt-0" style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--border)" }}>
            <div className="flex flex-col sm:flex-row justify-between sm:items-center px-4 sm:px-5 py-3 sm:py-4 gap-1 sm:gap-0" style={{ borderColor: "var(--border)" }}>
              <span className="text-primary text-sm font-medium flex items-center gap-2">
                <Phone className="w-4 h-4" /> Phone
              </span>
              <a href="tel:+919876543210" className="font-bold text-sm" style={{ color: "var(--foreground)" }}>
                +91 98765 43210
              </a>
            </div>
            <div className="flex flex-col sm:flex-row justify-between sm:items-center px-4 sm:px-5 py-3 sm:py-4 gap-1 sm:gap-0" style={{ borderColor: "var(--border)" }}>
              <span className="text-primary text-sm font-medium flex items-center gap-2">
                <Clock className="w-4 h-4" /> Working hours
              </span>
              <span className="font-bold text-sm" style={{ color: "var(--foreground)" }}>Sun–Sat : 9 AM – 12 AM</span>
            </div>
            <div className="flex flex-col sm:flex-row justify-between sm:items-center px-4 sm:px-5 py-3 sm:py-4 gap-1 sm:gap-0" style={{ borderColor: "var(--border)" }}>
              <span className="text-primary text-sm font-medium flex items-center gap-2">
                <Mail className="w-4 h-4" /> Email
              </span>
              <a
                href="mailto:info@caryakrama.in"
                className="font-bold text-sm hover:text-primary"
                style={{ color: "var(--foreground)" }}
              >
                info@caryakrama.in
              </a>
            </div>
          </div>
        </div>

        {/* Right: Map + Address */}
        <div className="flex flex-col gap-4">
          {/* Address Header */}
          <div className="rounded-2xl shadow-sm p-4 sm:p-5" style={{ backgroundColor: "var(--card-bg)" }}>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-2">
              <div>
                <h2 className="font-bold text-base mb-1" style={{ color: "var(--foreground)" }}>
                  CaRyalaya Bengaluru
                </h2>
                <p className="text-sm flex items-start gap-1" style={{ color: "var(--muted)" }}>
                  <MapPin className="w-4 h-4 shrink-0 mt-0.5" style={{ color: "#fe2c55" }} />
                  Coffee Day Near BDA Complex, RT Nagar<br />
                  Bengaluru 560032, Karnataka, India
                </p>
              </div>
              <a
                href="https://maps.google.com/?q=CaRyalaya+RT+Nagar+Bengaluru"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-semibold px-4 py-2.5 rounded-lg transition-colors whitespace-nowrap self-start sm:self-auto"
                style={{ 
                  backgroundColor: "color-mix(in srgb, #fe2c55 10%, transparent)", 
                  color: "#fe2c55"
                }}
              >
                <MapPin className="w-3.5 h-3.5" />
                Get directions
              </a>
            </div>
          </div>

          {/* Embedded Google Map */}
          <div className="rounded-2xl overflow-hidden shadow-sm flex-1 min-h-[320px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.1234567890!2d77.5988!3d13.0218!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae17f4a7df5f91%3A0x3232b4e9c8b4e1a1!2sRT%20Nagar%2C%20Bengaluru!5e0!3m2!1sen!2sin!4v1700000000000"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "320px" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </main>
  );
}
