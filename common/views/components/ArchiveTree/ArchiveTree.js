import { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { classNames } from '@weco/common/utils/classnames';
import { getWork } from '@weco/catalogue/services/catalogue/works';
import { ArchiveNode } from '@weco/common/utils/works';
import TogglesContext from '@weco/common/views/components/TogglesContext/TogglesContext';
import { type Toggles } from '@weco/catalogue/services/catalogue/common';
import Space from '../styled/Space';
import ButtonSolid from '@weco/common/views/components/ButtonSolid/ButtonSolid';
import Modal from '@weco/common/views/components/Modal/Modal';

const Container = styled.div`
  overflow: scroll;
  height: 70vh;
`;

const StyledLink = styled.a`
  display: inline-block;
  background: ${props => (props.isCurrent ? '#ffce3c' : 'transparent')};
  font-weight: ${props => (props.isCurrent ? 'bold' : 'normal')};
  border-color: ${props =>
    props.isCurrent ? props.theme.colors.green : 'transparent'};
  border-radius: 6px;
  padding: 0 6px;
  cursor: pointer;
`;

const Tree = styled.div`
  ul {
    list-style: none;
    padding-left: 0;
    margin-left: 0;
  }

  li {
    position: relative;
    list-style: none;

    a {
      font-weight: bold;
    }
  }

  a {
    text-decoration: none;
  }

  a:focus,
  a:hover {
    text-decoration: underline;
  }

  ul ul {
    padding-left: 62px;

    li {
      a {
        font-weight: normal;
      }
    }

    li::before,
    li::after {
      content: '';
      position: absolute;
      left: -22px;
    }

    li::before {
      border-top: 2px solid #006272;
      top: 20px;
      width: 22px;
      height: 0;
    }

    li::after {
      border-left: 2px solid #006272;
      height: 100%;
      width: 0px;
      top: 10px;
    }

    li:last-child::after {
      height: 10px;
    }
  }
`;

function createWorkNodeFromWork(work) {
  return {
    id: work.id,
    title: work.title,
    alternativeTitles: work.alternativeTitles,
    referenceNumber: work.referenceNumber,
  };
}

function createSiblingsArray(work) {
  return [
    ...work.precededBy.map(item => ({
      work: item,
    })),
    {
      work: createWorkNodeFromWork(work),
      children: work.parts.map(part => ({
        work: part,
        children: part.children,
      })),
    },
    ...work.succeededBy.map(item => ({
      work: item,
    })),
  ];
}

function createCollectionTree(work) {
  const partOfReversed = [...work.partOf].reverse();
  return [
    partOfReversed.reduce(
      (acc, curr, i) => {
        return {
          work: curr,
          children: i === 0 ? createSiblingsArray(work) : [acc],
        };
      },
      {
        work: createWorkNodeFromWork(work),
        children: work.parts.map(part => ({
          work: part,
          children: part.children,
        })),
      }
    ),
  ];
}

// not the one and doesn't have children (DONE - just return it)
// not the one and does have children (DONE, carry on iterating children)
// is the one and doesn't have children (DONE - return with new children if there are some, else just return)
// is the one and does have children ( - do the matching stuff)
function addWorkPartsToCollectionTree(work, collectionTree) {
  return collectionTree.map(node => {
    if (node.work.id !== work.id && !node.children) return node;
    if (node.work.id !== work.id && node.children) {
      return {
        ...node,
        children: addWorkPartsToCollectionTree(work, node.children),
      };
    }
    if (node.work.id === work.id && !node.children) {
      if (work.parts && work.parts.length > 0) {
        return {
          ...node,
          children: work.parts.map(part => ({
            work: part,
          })),
        };
      } else {
        return node;
      }
    }
    if (node.work.id === work.id && node.children) {
      // don't want to overwrite anything that is already there
      const mergedChildren = work.parts.map(part => {
        const matchingItem =
          node.children &&
          node.children.find(currentChild => part.id === currentChild.work.id);
        if (
          matchingItem &&
          matchingItem.children &&
          matchingItem.children.length > 0
        ) {
          return matchingItem;
        } else {
          return {
            work: part,
          };
        }
      });
      return {
        ...node,
        children: mergedChildren,
      };
    }
  });
}

type Work = {|
  // TODO import this and make it work everywhere
  id: string,
  title: string,
  alternativeTitles: [],
  type: 'Work',
  partOf: ArchiveNode[],
|};
type NestedListProps = {|
  currentWorkId: string,
  collectionTree: ArchiveNode[],
|};

type WorkLinkType = {|
  item: ArchiveNode,
  currentWorkId: string,
  toggles: Toggles,
|};

const WorkLink = ({ item, currentWorkId, toggles }: WorkLinkType) => (
  <StyledLink
    style={{
      whiteSpace: 'nowrap',
      display: 'inline-block',
      color: 'black',
    }}
    href={`/works/${item.work.id}`}
    isCurrent={currentWorkId === item.work.id}
  >
    {item.work.title}
    <div
      style={{
        fontSize: '13px',
        color: '#707070',
        textDecoration: 'none',
        padding: '0',
      }}
    >
      {item.work.referenceNumber}
    </div>
  </StyledLink>
);

const NestedList = ({ currentWorkId, collectionTree }: NestedListProps) => {
  return (
    <ul
      className={classNames({
        'font-size-5': true,
      })}
    >
      {collectionTree &&
        collectionTree.map(item => {
          return (
            item.work && (
              <li key={item.work.id}>
                <div style={{ padding: '10px 10px 30px' }}>
                  <TogglesContext.Consumer>
                    {toggles => (
                      <WorkLink
                        item={item}
                        currentWorkId={currentWorkId}
                        toggles={toggles}
                      />
                    )}
                  </TogglesContext.Consumer>
                  {item.children && (
                    <NestedList
                      currentWorkId={currentWorkId}
                      collectionTree={item.children}
                    />
                  )}
                </div>
              </li>
            )
          );
        })}
    </ul>
  );
};
// TODO what happens if go to completely different archive?
const ArchiveTree = ({ work }: { work: Work }) => {
  const toggles = useContext(TogglesContext);
  const [showArchiveTreeModal, setShowArchiveTreeModal] = useState(false);
  const [collectionTree, setCollectionTree] = useState(
    createCollectionTree(work) || []
  );

  useEffect(() => {
    setCollectionTree(createCollectionTree(work));
  }, [work]);

  return (
    <>
      <Space
        className="inline-block"
        h={{ size: 'm', properties: ['margin-right'] }}
        v={{ size: 'm', properties: ['margin-top'] }}
      >
        <ButtonSolid
          icon="tree"
          text={`${work.title} contents`}
          isTextHidden={true}
          clickHandler={() => {
            setShowArchiveTreeModal(!showArchiveTreeModal);
            const partOfPromises = work.partOf.map(part =>
              getWork({ id: part.id, toggles })
            );
            Promise.all(partOfPromises).then(works => {
              let updatedTree;
              works.forEach(work => {
                const tempTree = addWorkPartsToCollectionTree(
                  work,
                  updatedTree || collectionTree
                );
                updatedTree = tempTree;
                // addWorkPartsToCollectionTree not working as expected
              });
              setCollectionTree(updatedTree);
            });
            // now centre the tree
          }}
        />
      </Space>
      <Modal
        isActive={showArchiveTreeModal}
        setIsActive={setShowArchiveTreeModal}
        width="98vw"
      >
        <Container>
          <Tree>
            <NestedList
              currentWorkId={work.id}
              collectionTree={collectionTree}
            />
          </Tree>
        </Container>
      </Modal>
    </>
  );
};
export default ArchiveTree;
