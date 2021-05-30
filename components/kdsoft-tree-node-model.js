import { raw } from '@nx-js/observer-util/dist/es.es6.js';

// Pre-order traversal of tree
function* treeNodeEntries(node, parent, nodeIndex) {
  if (!node) return;

  yield { node, parent, nodeIndex };

  const children = node.children;
  if (!children) return;

  for (let i = 0; i <= children.length; i += 1) {
    yield* treeNodeEntries(children[i], node, i);
  }
}

class KdSoftTreeNodeModel {
  constructor(id, children = [], properties = {}) {
    this.id = id;
    this.children = children;
    Object.assign(this, properties);
  }

  get treeNodeEntries() { return treeNodeEntries(this, null, -1); }

  // returns true if this node is an ancestor of the other node, or if it is the same node
  isAncestorOf(otherNode) {
    for (const entry of treeNodeEntries(this, null, -1)) {
      if (raw(entry.node) == raw(otherNode)) return true;
    }
    return false;
  }

  moveNode(fromId, toId, dropMode) {
    let fromEntry; let toEntry;

    console.log(`Move node ${fromId} -> ${toId}`);

    for (const entry of treeNodeEntries(this, null)) {
      if (entry.node.id === fromId) {
        fromEntry = entry;
        if (toEntry) break;
      }
      if (entry.node.id === toId) {
        toEntry = entry;
        if (fromEntry) break;
      }
    }

    if (!fromEntry) return;
    if (!toEntry) return;

    const fromNode = fromEntry.node;
    const fromParent = fromEntry.parent;
    if (!fromParent) return;

    const toNode = toEntry.node;
    const toParent = toEntry.parent;

    if (fromNode.isAncestorOf(toNode)) return;

    const fromIndx = fromEntry.nodeIndex;
    fromParent.children.splice(fromIndx, 1);

    if (!toParent) {
      if (dropMode === 'inside') {
        toNode.children.push(fromEntry.node);
      }
      return;
    }

    const moveDownSameParent = (fromParent.id === toParent.id) && (fromEntry.nodeIndex < toEntry.nodeIndex);
    // if we move down the same parent, then the target index has changed by -1
    const toIndx = moveDownSameParent ? toEntry.nodeIndex - 1: toEntry.nodeIndex;
    switch (dropMode) {
      case 'before':
        toParent.children.splice(toIndx, 0, fromEntry.node);
        break;
      case 'after':
        toParent.children.splice(toIndx + 1, 0, fromEntry.node);
        break;
      case 'inside':
        toNode.children.push(fromEntry.node);
        break;
      default:
        break;
    }
  }
}

export default KdSoftTreeNodeModel;
