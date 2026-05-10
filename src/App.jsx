import { Header } from './components/Header.jsx';
import { PanelTabs } from './components/PanelTabs.jsx';
import { LabPanel } from './components/LabPanel.jsx';
import { Disclaimer } from './components/Disclaimer.jsx';
import { panels, panelById } from './data/index.js';
import { usePersistedState } from './hooks/usePersistedState.js';
import { t } from './i18n.js';

export default function App() {
  const [audience, setAudience] = usePersistedState('lab.audience', 'patient');
  const [lang, setLang] = usePersistedState('lab.lang', 'en');
  const [activePanelId, setActivePanelId] = usePersistedState('lab.activePanel', panels[0].id);
  const activePanel = panelById[activePanelId] ?? panels[0];

  return (
    <div className="app" lang={lang === 'zh' ? 'zh-Hant' : 'en'}>
      <Header audience={audience} setAudience={setAudience} lang={lang} setLang={setLang} />
      <PanelTabs panels={panels} activeId={activePanel.id} onChange={setActivePanelId} lang={lang} />
      <main className="main">
        <h2 className="panel-title">{t(activePanel.name, lang)}</h2>
        <LabPanel key={activePanel.id} panel={activePanel} audience={audience} lang={lang} />
      </main>
      <Disclaimer lang={lang} />
    </div>
  );
}
