import { useEffect, useMemo, useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { OverviewPage, DiscoverPage, BookingsPage, PartnersPage, OperationsPage, InventoryPage, SupportPage } from './components/Pages';
import { INITIAL_STATE, ROLE_MODULES, SERVICES } from './data/mockData';

const STORAGE_KEY = 'bloom-demo-state-v1';

function readState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? { ...INITIAL_STATE, ...JSON.parse(raw) } : INITIAL_STATE;
  } catch {
    return INITIAL_STATE;
  }
}

export default function App() {
  const [state, setState] = useState(readState);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const modules = ROLE_MODULES[state.role] || ROLE_MODULES.customer;
  const currentModule = modules.find((module) => module.id === state.view) || modules[0];

  const changeView = (view) => setState((prev) => ({ ...prev, view }));

  const changeRole = (role) => {
    setState((prev) => ({
      ...prev,
      role,
      view: 'home'
    }));
  };

  const setAddress = (address) => {
    setState((prev) => ({ ...prev, address }));
  };

  const addBooking = (serviceId) => {
    const service = SERVICES.find((item) => item.id === serviceId) || SERVICES[0];

    setState((prev) => ({
      ...prev,
      view: 'bookings',
      bookings: [
        {
          id: `BL-${Math.floor(1000 + Math.random() * 9000)}`,
          service: service.name,
          partner: 'Anika Rao',
          date: '2026-09-20',
          time: '10:30 AM',
          status: 'Confirmed',
          address: prev.address,
          price: service.price
        },
        ...prev.bookings
      ]
    }));
  };

  const pageMap = useMemo(
    () => ({
      home: <OverviewPage bookings={state.bookings} address={state.address} onViewChange={changeView} onAddBooking={addBooking} />,
      discover: <DiscoverPage services={SERVICES} address={state.address} onAddBooking={addBooking} onAddressChange={setAddress} />,
      bookings: <BookingsPage bookings={state.bookings} />,
      partners: <PartnersPage />,
      operations: <OperationsPage />,
      inventory: <InventoryPage />,
      support: <SupportPage />
    }),
    [state]
  );

  return (
    <div className="app-shell">
      <Sidebar
        role={state.role}
        modules={modules}
        currentView={state.view}
        onViewChange={changeView}
        onRoleChange={changeRole}
        profileName="Riya Sharma"
      />

      <main className="main-panel">
        <header className="topbar">
          <div className="mobile-brand">
            <span className="brand-mark">b</span>
            <span>Bloom</span>
          </div>
          <div className="breadcrumb">
            <span>Bloom workspace</span>
            <span className="divider">/</span>
            <strong>{currentModule.label}</strong>
          </div>

          <div className="top-actions">
            <button type="button" className="icon-button" aria-label="Notifications">
              ♧
            </button>
            <button type="button" className="avatar-button" aria-label="Profile">
              RS
            </button>
          </div>
        </header>

        <div className="content">{pageMap[state.view] || pageMap.home}</div>
      </main>
    </div>
  );
}
