import { CORE_CONCEPTS } from './data';
import Header from './components/Header/Header'
import CoreConcept from './components/CoreConcept/CoreConcept';
import TabButton from './components/TabButton';

function App() {
  function handleClick(selectedBtn){
    console.log(`you select ${selectedBtn}`);
  }
  return (
    <div>
      <Header />
      <main>
        <section id="core-concepts">
          <h2>Core Concepts</h2>
          <ul>
            <CoreConcept
              title={CORE_CONCEPTS[0].title}
              description={CORE_CONCEPTS[0].description}
              image={CORE_CONCEPTS[0].image}
            />
            <CoreConcept {...CORE_CONCEPTS[1]} />
            <CoreConcept {...CORE_CONCEPTS[2]} />
            <CoreConcept {...CORE_CONCEPTS[3]} />
          </ul>
        </section>
        <section id="examples">
          <h2>Examples</h2>
          <menu>
            <TabButton onSelect={()=>handleClick('Components')}>Components</TabButton>
            <TabButton onSelect={()=>handleClick('JSX')}>JSX</TabButton>
            <TabButton onSelect={()=>handleClick('Props')}>Props</TabButton>
            <TabButton onSelect={()=>handleClick('State')}>State</TabButton>
          </menu>
        </section>
      </main>
    </div>
  );
}

export default App;
