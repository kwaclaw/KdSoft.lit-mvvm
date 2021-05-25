
import { observable, raw } from '@nx-js/observer-util/dist/es.es6.js';

// Pre-order traversal of tree
function* treeNodeEntries(node, parent) {
  if (!node) return;

  yield { node, parent };

  const children = node.children;
  if (!children) return;

  for (let i = 0; i <= children.length; i += 1) {
    yield* treeNodeEntries(children[i], node);
  }
}

class KdSoftTreeNodeModel {
  constructor(id, children = [], properties = {}) {
    this.id = id;
    this.children = children;
    Object.assign(this, properties);
    return observable(this);
  }

  get treeNodeEntries() { return treeNodeEntries(this, null); }

  // returns true if this node is an ancestor of the other node, or if it is the same node
  isAncestorOf(otherNode) {
    for (const entry of treeNodeEntries(this, null)) {
      if (raw(entry.node) == raw(otherNode)) return true;
    }
    return false;
  }

  /*
    NOTE for moveNode():
    We make changes on the raw arrays, because slice() with insertions of proxies
    strip the copied/assigned array elements of any proxies that might wrap them.
    So we need to trigger a reaction explicity by incrementing this.__changeCount
    which is a property that an instance of LitMvvmElement will always observe.
  */
  moveNode(fromId, toId, dropMode) {
    let fromEntry; let toEntry;

    console.log(`Move node ${fromId} -> ${toId}`);

    for (const entry of treeNodeEntries(this, null)) {
      if (entry.node.id === fromId) {
        fromEntry = entry;
      }
      if (entry.node.id === toId) {
        toEntry = entry;
      }
    }

    if (!fromEntry) return;
    if (!toEntry) return;

    const fromNode = raw(fromEntry.node);
    const fromParent = raw(fromEntry.parent);
    if (!fromParent) return;

    const toNode = raw(toEntry.node);
    const toParent = raw(toEntry.parent);

    if (fromNode.isAncestorOf(toNode)) return;

    // it is more reliable to compare ids
    const fromIndx = fromParent.children.findIndex(c => raw(c).id == fromNode.id);
    fromParent.children.splice(fromIndx, 1);

    if (!toParent) {
      if (dropMode === 'inside') {
        toNode.children.push(fromEntry.node);
      }
      // see note above
      this.__changeCount++;
      return;
    }

    const toIndx = toParent.children.findIndex(c => raw(c).id == toNode.id);
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
    // see note above
    this.__changeCount++;

  }
}

export default KdSoftTreeNodeModel;
