import WorkDetailsProperty from '../WorkDetailsProperty/WorkDetailsProperty';
import { FunctionComponent } from 'react';

type Props = { title?: string; text: string[] };

const WorkDetailsText: FunctionComponent<Props> = ({ title, text }: Props) => {
  return (
    <WorkDetailsProperty title={title}>
      <div className="spaced-text">
        {text.map((para, i) => {
          return <div key={i} dangerouslySetInnerHTML={{ __html: para }} />;
        })}
      </div>
    </WorkDetailsProperty>
  );
};

export default WorkDetailsText;