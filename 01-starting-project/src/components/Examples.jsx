import {useState} from 'react';
import { EXAMPLES } from '../data';
import TabButton from './TabButton';

export default function Examples(){
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
    return(
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
    )
}