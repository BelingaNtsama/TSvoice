import './App.css';
import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router';

// Lazy-loaded pages
const Home = lazy(() => import('./pages/Home'));
const Plateform = lazy(() => import('./pages/Plateform'));
const Demo = lazy(()=>import('./pages/DemoVocal'))
const Auth = lazy(() => import('./pages/Auth'));
const Account = lazy(()=>import('./pages/Account'))

function App() {
  return (
    <Suspense fallback={<div className="p-8 text-center">Chargement...</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/plateform" element={<Plateform />} />
        <Route path="/demo" element={<Demo />} />
        <Route path="/auth" element={<Auth />} />
        <Route path='/account' element={<Account/>}/>
      </Routes>
    </Suspense>
  );
}

export default App;
