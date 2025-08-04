import Link from 'next/link'

export default function Page() {
  return (
    <>
      <header className="header-container">
        <h1 className="header-title">calendar</h1>
        <Link href="/checklist" className="nav-button">
          Go to Checklist
        </Link>
      </header>
      <main className="grid-container"></main>
      <header className="header-container">
        <h1 className="header-title">calendar</h1>
      </header>
      <main className="grid-container">
          <div className="calendar-box">1</div>
          <div className="calendar-box">2</div>
          <div className="calendar-box">3</div>
          <div className="calendar-box">4</div>
          <div className="calendar-box">5</div>
          <div className="calendar-box">6</div>
          <div className="calendar-box">1</div>
          <div className="calendar-box">2</div>
          <div className="calendar-box">3</div>
          <div className="calendar-box">4</div>
          <div className="calendar-box">5</div>
          <div className="calendar-box">6</div>
          <div className="calendar-box">1</div>
          <div className="calendar-box">2</div>
          <div className="calendar-box">3</div>
          <div className="calendar-box">4</div>
          <div className="calendar-box">5</div>
          <div className="calendar-box">6</div>
          <div className="calendar-box">1</div>
          <div className="calendar-box">2</div>
          <div className="calendar-box">3</div>
          <div className="calendar-box">4</div>
          <div className="calendar-box">5</div>
          <div className="calendar-box">6</div>
          <div className="calendar-box">1</div>
          <div className="calendar-box">2</div>
          <div className="calendar-box">3</div>
          <div className="calendar-box">4</div>
          <div className="calendar-box">5</div>
          <div className="calendar-box">6</div>
        </main>
      </>
  );}
