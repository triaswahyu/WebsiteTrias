import { useState, useEffect } from 'react';
import { Calculator as CalculatorIcon, ArrowLeftRight, Sun, Moon } from 'lucide-react';
import Calculator from './components/Calculator';
import Converter from './components/Converter';
import './App.css';

type Tab = 'calculator' | 'converter';

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('calculator');
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('theme');
    return saved === 'dark' ? 'dark' : 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>
          <CalculatorIcon size={28} strokeWidth={2.5} />
          <span>Kalkulator Saintifik</span>
          <small>by Trias Wahyu Sriyono</small>
        </h1>
        <button 
          className="theme-toggle" 
          onClick={toggleTheme}
          title={theme === 'light' ? 'Mode Gelap' : 'Mode Terang'}
        >
          {theme === 'light' ? <Moon size={22} /> : <Sun size={22} />}
        </button>
      </header>

      <nav className="tab-nav">
        <button 
          className={`tab-btn ${activeTab === 'calculator' ? 'active' : ''}`}
          onClick={() => setActiveTab('calculator')}
        >
          <CalculatorIcon size={20} />
          <span>Kalkulator</span>
        </button>
        <button 
          className={`tab-btn ${activeTab === 'converter' ? 'active' : ''}`}
          onClick={() => setActiveTab('converter')}
        >
          <ArrowLeftRight size={20} />
          <span>Konverter</span>
        </button>
      </nav>

      <main className="app-content">
        {activeTab === 'calculator' ? <Calculator /> : <Converter />}
      </main>

      <footer className="app-footer">
        <p>Dibuat dengan React + TypeScript</p>
      </footer>
    </div>
  );
}

export default App;
