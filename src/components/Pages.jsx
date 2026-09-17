import { useState } from 'react';
import { formatMoney, formatDate } from '../lib/formatters';

export function StatusPill({ status }) {
  const tone = String(status || '').toLowerCase();
  const className = `status-pill ${tone.includes('confirm') ? 'confirmed' : tone.includes('complete') ? 'completed' : tone.includes('cancel') ? 'cancelled' : 'pending'}`;

  return <span className={className}>{status}</span>;
}

export function PageHeader({ eyebrow, title, description, action }) {
  return (
    <div className="page-head">
      <div>
        <span className="eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        {description ? <p>{description}</p> : null}
      </div>
      {action ? <div className="action-group">{action}</div> : null}
    </div>
  );
}

function BookingRow({ booking }) {
  const date = formatDate(booking.date);

  return (
    <div className="booking-row">
      <div className="date-tile">
        <strong>{date.day}</strong>
        <small>{date.month}</small>
      </div>

      <div className="booking-copy">
        <h3>{booking.service}</h3>
        <p>
          {booking.time} · {booking.partner || 'Bloom professional'} · {booking.address}
        </p>
      </div>

      <StatusPill status={booking.status} />

      <button type="button" className="btn btn-ghost">
        View details
      </button>
    </div>
  );
}

function ServiceCard({ service, onAddBooking }) {
  return (
    <article className="service-card">
      <div className="service-art">{service.art}</div>
      <div className="service-body">
        <span className="eyebrow">{service.category} · {service.duration}</span>
        <h3>{service.name}</h3>
        <p>{service.description}</p>

        <div className="service-meta">
          <span className="price">{formatMoney(service.price)}</span>
          <button type="button" className="btn btn-primary" onClick={() => onAddBooking(service.id)}>
            Book
          </button>
        </div>
      </div>
    </article>
  );
}

export function OverviewPage({ bookings, address, onViewChange, onAddBooking }) {
  const nextBooking = bookings.find((booking) => booking.status === 'Confirmed') || bookings[0];

  return (
    <>
      <PageHeader
        eyebrow="Saturday, 19 September"
        title="Good morning, Riya."
        description="Your personal care plan, in one calm place."
        action={<button type="button" className="btn btn-primary" onClick={() => onViewChange('discover')}>+ Book a service</button>}
      />

      <div className="dashboard-grid">
        <div className="card hero-card">
          <div>
            <span className="eyebrow">Your next moment</span>
            <h2>{nextBooking ? 'A little time, just for you.' : 'Make space for yourself.'}</h2>
            <p>
              {nextBooking
                ? `${nextBooking.service} is booked for ${formatDate(nextBooking.date).full}.`
                : 'Discover trusted professionals who come to you.'}
            </p>
          </div>

          <button type="button" className="btn btn-secondary" onClick={() => onViewChange(nextBooking ? 'bookings' : 'discover')}>
            {nextBooking ? 'View booking' : 'Explore services'} →
          </button>
        </div>

        <div className="card metric-card">
          <span className="eyebrow">This month</span>
          <strong>{bookings.length}</strong>
          <small>care moments booked</small>
        </div>

        <div className="card metric-card">
          <span className="eyebrow">Bloom balance</span>
          <strong>₹450</strong>
          <small>available rewards</small>
        </div>
      </div>

      <div className="section-heading">
        <h2>Upcoming visits</h2>
        <button type="button" className="link-button" onClick={() => onViewChange('bookings')}>
          See all bookings →
        </button>
      </div>

      <div className="booking-list">
        {nextBooking ? <BookingRow booking={nextBooking} /> : <div className="empty-state">No upcoming visits yet.</div>}
      </div>

      <div className="section-heading">
        <h2>Made for your rhythm</h2>
      </div>

      <div className="quick-grid">
        <button type="button" className="quick-card" onClick={() => onViewChange('discover')}>
          <span>✧</span>
          <b>Glow & skin</b>
          <small>Facials and rituals</small>
        </button>
        <button type="button" className="quick-card" onClick={() => onViewChange('discover')}>
          <span>⌁</span>
          <b>Hair at home</b>
          <small>Style without travel</small>
        </button>
        <button type="button" className="quick-card" onClick={() => onViewChange('discover')}>
          <span>☼</span>
          <b>Wellness</b>
          <small>Feel restored</small>
        </button>
        <button type="button" className="quick-card" onClick={() => onViewChange('support')}>
          <span>♡</span>
          <b>Need help?</b>
          <small>We are here for you</small>
        </button>
      </div>
    </>
  );
}

export function DiscoverPage({ services, address, onAddBooking, onAddressChange }) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All categories');

  const filtered = services.filter((service) => {
    const matchQuery = `${service.name} ${service.description}`.toLowerCase().includes(query.toLowerCase());
    const matchCategory = category === 'All categories' || service.category === category;
    return matchQuery && matchCategory;
  });

  const categories = ['All categories', ...new Set(services.map((item) => item.category))];

  return (
    <>
      <PageHeader
        eyebrow="The Bloom edit"
        title="Find your next ritual"
        description="Thoughtful services from trained professionals — wherever you are."
        action={<button type="button" className="btn btn-secondary" onClick={() => onAddressChange(address)}>⌖ {address}</button>}
      />

      <div className="catalog-toolbar">
        <input className="search-input" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search services..." />
        <select className="filter-select" value={category} onChange={(event) => setCategory(event.target.value)}>
          {categories.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      <div className="service-grid">
        {filtered.length ? (
          filtered.map((service) => <ServiceCard key={service.id} service={service} onAddBooking={onAddBooking} />)
        ) : (
          <div className="empty-state">No services match that search.</div>
        )}
      </div>
    </>
  );
}

export function BookingsPage({ bookings }) {
  return (
    <>
      <PageHeader
        eyebrow="Your care plan"
        title="My bookings"
        description="Keep every appointment, update the details, and follow your professional in real time."
        action={<button type="button" className="btn btn-primary">+ New booking</button>}
      />

      <div className="booking-list">
        {bookings.length ? bookings.map((booking) => <BookingRow key={booking.id} booking={booking} />) : <div className="empty-state">No bookings yet.</div>}
      </div>
    </>
  );
}

export function PartnersPage() {
  const rows = [
    ['Anika Rao', 'Skin & wellness', 'Available today', '92%'],
    ['Meera Kapoor', 'Hair & styling', 'On a visit', '84%'],
    ['Kavya Menon', 'Nails & beauty', 'Available today', '97%']
  ];

  return (
    <>
      <PageHeader
        eyebrow="Partner network"
        title="Professionals"
        description="A live view of partner readiness, quality, and capacity."
        action={<button type="button" className="btn btn-primary">+ Add partner</button>}
      />

      <div className="card table-card">
        <table className="data-table">
          <thead>
            <tr>
              <th>Partner</th>
              <th>Speciality</th>
              <th>Availability</th>
              <th>Quality score</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(([name, expertise, availability, score]) => (
              <tr key={name}>
                <td>{name}</td>
                <td>{expertise}</td>
                <td><StatusPill status={availability} /></td>
                <td>
                  <div className="score-wrap">
                    <strong>{score}</strong>
                    <div className="progress-bar">
                      <span style={{ width: score }} />
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export function OperationsPage() {
  const modules = [
    ['Booking & scheduling', 'Healthy', 'Slot engine and dispatch'],
    ['Payments & wallet', 'Mocked', 'Ready for provider adapter'],
    ['Notifications', 'Mocked', 'Email / SMS / WhatsApp port'],
    ['Identity & access', 'Local', 'Role-aware demo session']
  ];

  return (
    <>
      <PageHeader
        eyebrow="Control room"
        title="Operations overview"
        description="A single, calm view of bookings, partner supply, and the customer promise."
        action={<button type="button" className="btn btn-secondary">Export report</button>}
      />

      <div className="dashboard-grid">
        <div className="card metric-card">
          <span className="eyebrow">Today’s bookings</span>
          <strong>24</strong>
          <small>↑ 12% from last Saturday</small>
        </div>
        <div className="card metric-card">
          <span className="eyebrow">Fulfilment rate</span>
          <strong>96%</strong>
          <small>within promised slot</small>
        </div>
        <div className="card metric-card">
          <span className="eyebrow">Open support</span>
          <strong>06</strong>
          <small>2 need attention</small>
        </div>
      </div>

      <div className="section-heading">
        <h2>Platform modules</h2>
      </div>

      <div className="card table-card">
        <table className="data-table">
          <tbody>
            {modules.map(([label, status, description]) => (
              <tr key={label}>
                <td>
                  <strong>{label}</strong>
                  <small>{description}</small>
                </td>
                <td><StatusPill status={status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export function InventoryPage() {
  const rows = [
    ['Facial essentials · SK-001', '48 units', '20 units', 'Healthy'],
    ['Gel colour set · NT-044', '12 units', '15 units', 'Pending'],
    ['Massage oils · WL-008', '31 units', '10 units', 'Healthy']
  ];

  return (
    <>
      <PageHeader
        eyebrow="Supply & readiness"
        title="Inventory kits"
        description="Consumables stay close to the professional who needs them."
        action={<button type="button" className="btn btn-primary">+ Add kit</button>}
      />

      <div className="card table-card">
        <table className="data-table">
          <thead>
            <tr>
              <th>Kit / SKU</th>
              <th>Available</th>
              <th>Reorder point</th>
              <th>Health</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(([label, available, reorder, status]) => (
              <tr key={label}>
                <td>{label}</td>
                <td>{available}</td>
                <td>{reorder}</td>
                <td><StatusPill status={status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export function SupportPage() {
  return (
    <>
      <PageHeader
        eyebrow="We have you"
        title="Support & SOS"
        description="Questions, reschedules, and urgent help should never feel complicated."
      />

      <div className="two-col">
        <div className="card">
          <span className="eyebrow">Quick help</span>
          <h2>How can we help today?</h2>

          <div className="quick-grid support-grid">
            <button type="button" className="quick-card">
              <span>◌</span>
              <b>Chat with Bloom</b>
            </button>
            <button type="button" className="quick-card">
              <span>↻</span>
              <b>Reschedule a visit</b>
            </button>
            <button type="button" className="quick-card">
              <span>?</span>
              <b>FAQs</b>
            </button>
            <button type="button" className="quick-card">
              <span>!</span>
              <b>Emergency SOS</b>
            </button>
          </div>
        </div>

        <div className="card">
          <span className="eyebrow">Recent conversation</span>
          <h3>Welcome to Bloom support</h3>
          <p className="muted">This demo is ready for a real messaging adapter when needed.</p>
          <button type="button" className="btn btn-secondary">Start a conversation</button>
        </div>
      </div>
    </>
  );
}
