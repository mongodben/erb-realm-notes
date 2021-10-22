import { useState } from 'react';
import * as Showdown from 'showdown';
import ReactMde from 'react-mde';
import '../App.global.css';

const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true,
});

const Editor = () => {
  const [value, setValue] = useState<string | undefined>('**Hello world!!!**');
  const [selectedTab, setSelectedTab] = useState<'write' | 'preview'>('write');

  return (
    <div>
      <ReactMde
        value={value}
        onChange={setValue}
        selectedTab={selectedTab}
        onTabChange={setSelectedTab}
        generateMarkdownPreview={(markdown) =>
          Promise.resolve(converter.makeHtml(markdown))
        }
      />
    </div>
  );
};

export default Editor;
