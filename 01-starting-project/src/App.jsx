import { useState } from 'react';
import { CORE_CONCEPTS } from './data';
import Header from './components/Header/Header'
import CoreConcept from './components/CoreConcept/CoreConcept';
import TabButton from './components/TabButton';
import { EXAMPLES } from './data';

function App() {
  const [selectedTopic, setSelectedTopic] = useState();
  function handleClick(selectedBtn){
    setSelectedTopic(selectedBtn);
    // console.log(selectedTopic);
  }
  let tabConents = <p>Please select a topic.</p>;
  if(selectedTopic){
    tabConents = <div id='tab-content'>
                    <h3>{EXAMPLES[selectedTopic].title}</h3>
                    <p>{EXAMPLES[selectedTopic].description}</p>
                    <pre>
                      <code>{EXAMPLES[selectedTopic].code}</code>
                    </pre>
                </div>;
  }
  return (
    <div>
      <Header />
      <main>
        <section id="core-concepts">
          <h2>Core Concepts</h2>
          <ul>
            {CORE_CONCEPTS.map((conceptItem)=> <CoreConcept key={conceptItem.title} {...conceptItem}/>)}
          </ul>
        </section>
        <section id="examples">
          <h2>Examples</h2>
          <menu>
            <TabButton isSelected={selectedTopic === 'components'} onSelect={()=>handleClick('components')}>Components</TabButton>
            <TabButton isSelected={selectedTopic === 'jsx'} onSelect={()=>handleClick('jsx')}>JSX</TabButton>
            <TabButton isSelected={selectedTopic === 'props'} onSelect={()=>handleClick('props')}>Props</TabButton>
            <TabButton isSelected={selectedTopic === 'state'} onSelect={()=>handleClick('state')}>State</TabButton>
          </menu>
          {tabConents}
        </section>
      </main>
    </div>
  );
}

export default App;
