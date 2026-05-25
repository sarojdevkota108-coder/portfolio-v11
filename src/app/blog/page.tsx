import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { IconArrowUpRight, IconClock, IconTag } from '@tabler/icons-react'

const POSTS = [
  {
    id: 1,
    category: 'Networking',
    tag: 'tag-blue',
    title: 'Building a Multi-Site Enterprise WAN in Cisco Packet Tracer',
    excerpt: 'A walkthrough of my NY-to-Tokyo enterprise network simulation — VLANs, NAT, firewalls, and packet-level analysis explained step by step.',
    date: 'Coming Soon',
    readTime: '8 min',
    color: '#4f7fff',
  },
  {
    id: 2,
    category: 'Cloud',
    tag: 'tag-amber',
    title: 'My AWS Cloud Practitioner Study Plan',
    excerpt: 'How I structured my learning path for the AWS Cloud Practitioner Essentials certification — resources, labs, and key concepts.',
    date: 'Coming Soon',
    readTime: '5 min',
    color: '#ffaa00',
  },
  {
    id: 3,
    category: 'Web Dev',
    tag: 'tag-green',
    title: 'Building a Full-Stack Donation System with Django',
    excerpt: 'From requirements to deployment — the architecture, models, authentication and admin panel behind my final year project.',
    date: 'Coming Soon',
    readTime: '10 min',
    color: '#00e599',
  },
  {
    id: 4,
    category: 'Interior Design',
    tag: 'tag-violet',
    title: '3D Residential Design: My 3-Floor Contemporary Project',
    excerpt: 'How I approached a full residential design across three floors — from concept and space planning to material palette and lighting.',
    date: 'Coming Soon',
    readTime: '6 min',
    color: '#a78bfa',
  },
  {
    id: 5,
    category: 'Community',
    tag: 'tag-rose',
    title: 'Training 40+ People in Cybersecurity Awareness',
    excerpt: 'Lessons learned from facilitating cybersecurity training sessions for community members — what worked and what did not.',
    date: 'Coming Soon',
    readTime: '4 min',
    color: '#ff6b8a',
  },
  {
    id: 6,
    category: 'Fitness',
    tag: 'tag-cyan',
    title: 'Applying Engineering Thinking to Personal Fitness',
    excerpt: 'How systems thinking, progressive overload, and measurement protocols from engineering apply directly to strength and nutrition planning.',
    date: 'Coming Soon',
    readTime: '5 min',
    color: '#00d4ff',
  },
]

export default function BlogPage() {
  return (
    <main>
      <Navbar />

      <section
        style={{ paddingTop: '120px', paddingBottom: '80px' }}
        className="max-w-7xl mx-auto px-6 md:px-10"
      >
        {/* Header */}
        <div style={{ marginBottom: '64px' }}>
          <div className="section-eyebrow">Journal</div>
          <h1 className="section-title">
            BLOG &amp;<br />
            <span className="gradient-text-blue">INSIGHTS.</span>
          </h1>
          <p className="section-desc">
            Writing about networking labs, AWS learnings, full-stack development,
            interior design concepts, community experiences and fitness.
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {POSTS.map(post => (
            <article
              key={post.id}
              className="card glass-hover flex flex-col group relative overflow-hidden"
            >
              {/* Top accent line */}
              <div
                className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                style={{ background: `linear-gradient(90deg, transparent, ${post.color}60, transparent)` }}
              />

              <div className="flex items-center justify-between mb-4">
                <span className={`tag ${post.tag}`}>
                  <IconTag size={10} className="mr-1" />
                  {post.category}
                </span>
                <span
                  className="flex items-center gap-1"
                  style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--txt3)' }}
                >
                  <IconClock size={11} />
                  {post.readTime}
                </span>
              </div>

              <h2
                style={{
                  fontFamily: 'var(--font-bebas)',
                  fontSize: '20px',
                  letterSpacing: '.03em',
                  color: 'var(--txt)',
                  lineHeight: 1.2,
                  marginBottom: '10px',
                  flex: 1,
                }}
              >
                {post.title}
              </h2>

              <p
                style={{
                  fontSize: '13px',
                  color: 'var(--txt2)',
                  lineHeight: 1.7,
                  marginBottom: '16px',
                  flex: 2,
                }}
              >
                {post.excerpt}
              </p>

              <div className="flex items-center justify-between mt-auto pt-3 border-t" style={{ borderColor: 'var(--line)' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--txt3)' }}>
                  {post.date}
                </span>
                <span
                  className="flex items-center gap-1 text-[12px] font-semibold transition-colors duration-200"
                  style={{ color: post.color }}
                >
                  Read more <IconArrowUpRight size={13} />
                </span>
              </div>
            </article>
          ))}
        </div>

        {/* Newsletter CTA */}
        <div
          className="mt-16 rounded-2xl p-8 md:p-12 text-center"
          style={{
            background: 'var(--bg2)',
            border: '1px solid var(--line)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(79,127,255,0.05) 0%, transparent 70%)',
            }}
          />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div className="section-eyebrow justify-center mb-3">Stay Updated</div>
            <h3
              style={{
                fontFamily: 'var(--font-bebas)',
                fontSize: '40px',
                letterSpacing: '.04em',
                color: 'var(--txt)',
                marginBottom: '12px',
              }}
            >
              POSTS COMING SOON
            </h3>
            <p style={{ fontSize: '15px', color: 'var(--txt2)', maxWidth: '400px', margin: '0 auto', lineHeight: 1.7 }}>
              I'm working on detailed write-ups across networking, cloud, development, and design.
              Follow me on LinkedIn to be notified.
            </p>
            <a
              href="https://linkedin.com/in/sarojdevkota"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary mt-6 inline-flex"
              style={{ cursor: 'none' }}
            >
              Follow on LinkedIn
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
