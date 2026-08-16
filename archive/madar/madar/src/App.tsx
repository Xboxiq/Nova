import { ThemeProvider } from './theme/ThemeContext';
import { ControlBar } from './showcase/ControlBar';
import { Hero } from './showcase/sections/Hero';
import { Atelier } from './showcase/sections/Atelier';
import { ColorTokens } from './showcase/sections/ColorTokens';
import { Typography } from './showcase/sections/Typography';
import { Buttons } from './showcase/sections/Buttons';
import { Inputs } from './showcase/sections/Inputs';
import { Cards } from './showcase/sections/Cards';
import { Navigation } from './showcase/sections/Navigation';
import { Overlays } from './showcase/sections/Overlays';
import { DataDisplay } from './showcase/sections/DataDisplay';
import { IconLab } from './showcase/sections/IconLab';
import { SignatureCards } from './showcase/sections/SignatureCards';
import { SoftVocabulary } from './showcase/sections/SoftVocabulary';
import { PatternBank } from './showcase/sections/PatternBank';
import { InteractionLab } from './showcase/sections/InteractionLab';
import { FlowForms } from './showcase/sections/FlowForms';
import { TextLists } from './showcase/sections/TextLists';
import { PhysicsLab } from './showcase/sections/PhysicsLab';
import { InteractionBank } from './showcase/sections/InteractionBank';
import { KineticsBank } from './showcase/sections/KineticsBank';
import { LibraryVault } from './showcase/sections/LibraryVault';
import { PatternAtlas } from './showcase/sections/PatternAtlas';
import { AdminAccess } from './showcase/sections/AdminAccess';
import { Trends2026 } from './showcase/sections/Trends2026';
import { DataCollections } from './showcase/sections/DataCollections';
import { HeroLayouts } from './showcase/sections/HeroLayouts';
import { Kinetics99 } from './showcase/sections/Kinetics99';
import { Essentials } from './showcase/sections/Essentials';
import { Motion } from './showcase/sections/Motion';

function App() {
  return (
    <ThemeProvider>
      <ControlBar />
      <Hero />
      <Atelier />
      <ColorTokens />
      <Typography />
      <Buttons />
      <Inputs />
      <Cards />
      <Navigation />
      <Overlays />
      <DataDisplay />
      <IconLab />
      <SignatureCards />
      <SoftVocabulary />
      <PatternBank />
      <InteractionLab />
      <FlowForms />
      <TextLists />
      <PhysicsLab />
      <InteractionBank />
      <KineticsBank />
      <LibraryVault />
      <PatternAtlas />
      <AdminAccess />
      <Trends2026 />
      <DataCollections />
      <HeroLayouts />
      <Kinetics99 />
      <Essentials />
      <Motion />
    </ThemeProvider>
  );
}

export default App;
