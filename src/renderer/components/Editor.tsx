import React, { useState } from 'react';
import * as Showdown from 'showdown';
import ReactMde from 'react-mde';
import '../App.global.css';

const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true,
});

type Props = {
  md: string | undefined;
  setMd: (val: string) => void;
  title: string;
};

const Editor: React.FC<Props> = ({ md, setMd, title }) => {
  const [selectedTab, setSelectedTab] = useState<'write' | 'preview'>('write');

  return (
    <>
      <h2>{title}</h2>
      <ReactMde
        value={md}
        onChange={(curr) => setMd(curr)}
        selectedTab={selectedTab}
        onTabChange={setSelectedTab}
        generateMarkdownPreview={(markdown) =>
          Promise.resolve(converter.makeHtml(markdown))
        }
      />
    </>
  );
};

export default Editor;
