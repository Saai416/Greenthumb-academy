import { Badge } from "@/components/ui/badge";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { ACADEMY_NAME } from "@/lib/constants";
import { Award, BookOpen, GraduationCap, Heart, Users, Star } from "lucide-react";

const TEAM = [
  {
    id: "founder",
    name: "Malathi M",
    title: "Founder & Director",
    bio: "Founded and directed by Malathi M, an accomplished educator with a B.E and MBA, Green Thumb Academy stands as a beacon of holistic learning and personal growth. Malathi M brings over a decade of tutoring experience, guiding students across all standards with dedication and expertise. As a Certified Career Counselor and a Certified Trainer in Abacus, Vedic Maths and Phonics, she combines innovative teaching methods with personalized mentoring to unlock each student's potential. Her vision is to create a learning environment where knowledge meets creativity and discipline meets inspiration.",
    qualifications: ["B.E", "MBA", "Certified Career Counselor", "Certified Trainer – Abacus", "Certified Trainer – Vedic Maths", "Certified Trainer – Phonics"],
    img: "/gallery/founder.jpeg"
  },
  {
    id: "director",
    name: "Siva Kumar B",
    title: "Director & Advisor",
    bio: "With over 20 years of experience in the software industry, Siva Kumar B has established himself as a seasoned leader in product design, scalable software deployment, and cross-domain system maintenance. His career spans diverse technology landscapes, where he has consistently delivered innovative solutions and guided organizations toward sustainable growth. As Director and Advisor at Green Thumb Academy, he drives strategic initiatives and fosters innovation.",
    qualifications: ["B.Tech (Computer Science), NIT Trichy", "20+ Years in Software Industry", "Product Design & Deployment Expert", "Strategic Leadership & Advisory"],
    img: "/gallery/director.jpeg"
  }
];

const HIGHLIGHTS = [
  { icon: GraduationCap, value: "20+", label: "Years of Excellence" },
  { icon: Users, value: "5,000+", label: "Students Mentored" },
  { icon: BookOpen, value: "14+", label: "Programs Offered" },
  { icon: Award, value: "98%", label: "Board Pass Rate" },
];

export function AboutSection() {
  const revealRef = useScrollReveal<HTMLDivElement>({ threshold: 0.1 });
  const teamRef = useScrollReveal<HTMLDivElement>({ threshold: 0.1 });

  return (
    <section id="about" className="py-20 lg:py-28 bg-background">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div ref={revealRef} className="reveal-target text-center mb-16">
          <Badge variant="outline" className="mb-4 text-primary border-primary/20">About {ACADEMY_NAME}</Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mb-6">Nurturing Excellence & Growth</h2>
          <p className="text-muted-foreground text-lg leading-relaxed max-w-3xl mx-auto">
            Founded by <strong>Malathi M</strong>, an accomplished educator with a B.E and MBA, and guided by <strong>Siva Kumar B</strong>, a technology leader with 20+ years of industry experience, 
            Green Thumb Academy stands as a beacon of holistic learning and personal growth. 
            We offer comprehensive tutoring alongside specialized skill development — empowering every student to realize their full potential.
          </p>
        </div>

        {/* Academy Story */}
        <div className="mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="p-8 rounded-3xl bg-primary/5 border border-primary/10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Heart className="w-5 h-5 text-primary" />
                </div>
                <h4 className="text-xl font-bold">Our Mission</h4>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                To cultivate a generation of confident, curious, and compassionate learners
                through individual attention, inspired discipline, and a deep commitment to
                every child's unique journey.
              </p>
            </div>
            <div className="p-8 rounded-3xl bg-muted/50 border border-border/50">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Star className="w-5 h-5 text-primary" />
                </div>
                <h4 className="text-xl font-bold">Our Vision</h4>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                To be the benchmark for holistic education in Chennai, where academics,
                arts, sports, and life skills converge seamlessly to shape future leaders
                and responsible citizens.
              </p>
            </div>
          </div>

          {/* Highlights Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {HIGHLIGHTS.map((item) => (
              <div key={item.label} className="text-center p-6 rounded-2xl bg-card border border-border/50 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <p className="text-2xl sm:text-3xl font-display font-bold text-foreground">{item.value}</p>
                <p className="text-sm text-muted-foreground mt-1">{item.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Leadership Section */}
        <div ref={teamRef} className="reveal-target">
          <div className="text-center mb-12">
            <span className="inline-block text-primary font-body text-sm font-semibold tracking-widest uppercase mb-3 px-4 py-1 rounded-full bg-primary/8 border border-primary/15">
              Our Leadership
            </span>
            <h3 className="text-2xl sm:text-3xl font-display font-bold">The People Behind the Vision</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {TEAM.map((member) => (
              <div
                key={member.id}
                className="group relative bg-card rounded-3xl border border-border/50 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500"
              >
                {/* Top Accent Bar */}
                <div className="h-1.5 bg-gradient-to-r from-primary via-primary/60 to-transparent" />

                <div className="p-8">
                  {/* Profile Header */}
                  <div className="flex items-start gap-5 mb-6">
                    <div className="relative shrink-0">
                      <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-primary/20 shadow-lg group-hover:border-primary/40 transition-colors duration-300">
                        <img
                          src={member.img}
                          alt={member.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          style={{ objectPosition: 'center 10%' }}
                        />
                      </div>
                      {/* Status dot */}
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full border-2 border-card" />
                    </div>

                    <div className="min-w-0 pt-1">
                      <h4 className="text-xl font-display font-bold text-foreground leading-tight">{member.name}</h4>
                      <p className="text-primary font-semibold text-sm mt-1">{member.title}</p>
                    </div>
                  </div>

                  {/* Bio */}
                  <p className="text-muted-foreground leading-relaxed mb-6 text-[15px]">
                    {member.bio}
                  </p>

                  {/* Qualifications */}
                  <div className="flex flex-wrap gap-2">
                    {member.qualifications.map((q) => (
                      <span
                        key={q}
                        className="inline-flex items-center text-xs font-medium px-3 py-1.5 rounded-full bg-primary/5 text-primary border border-primary/10"
                      >
                        {q}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
