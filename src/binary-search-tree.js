const { NotImplementedError } = require("../extensions/index.js");

const { Node } = require("../extensions/list-tree.js");

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
class BinarySearchTree {
  constructor() {
    this.treeRoot = null;
  }

  root() {
    return this.treeRoot;
  }

  add(data) {
    const findTargetNode = (node, value) => {
      if (node.data > value) {
        if (!node.left) {
          node.left = new Node(data);
          return;
        } else {
          findTargetNode(node.left, value);
        }
      } else {
        if (!node.right) {
          node.right = new Node(data);
          return;
        } else {
          findTargetNode(node.right, value);
        }
      }
    };

    if (!this.treeRoot) {
      this.treeRoot = new Node(data);
    } else {
      findTargetNode(this.treeRoot, data);
    }
  }

  findNodeValue(node, value) {
    if (node === null) return null;
    if (node.data === value) {
      return node;
    } else if (node.data > value) {
      return this.findNodeValue(node.left, value);
    } else {
      return this.findNodeValue(node.right, value);
    }
  }

  has(data) {
    return !!this.findNodeValue(this.treeRoot, data);
  }

  find(data) {
    return this.findNodeValue(this.treeRoot, data);
  }

  deleteDeepest(root, delNode) {
    let q = [];
    q.push(root);

    let temp = null;

    // Do level order traversal until last node
    while (q.length > 0) {
      temp = q[0];
      q.shift();

      if (temp == delNode) {
        temp = null;
        return;
      }
      if (temp.right != null) {
        if (temp.right == delNode) {
          temp.right = null;
          return;
        } else q.push(temp.right);
      }

      if (temp.left != null) {
        if (temp.left == delNode) {
          temp.left = null;
          return;
        } else q.push(temp.left);
      }
    }
  }

  remove(data) {
    this.root = this.removeNode(this.treeRoot, data);
    // const findNodeValue = (node, value) => {
    //   if (node === null) return null;
    //   if (node.data === value) {
    //     return "remove";
    //   } else if (node.data > value) {
    //     const isRemove = findNodeValue(node.left, value);
    //     if (isRemove === "remove") {
    //       node.left = node.left.left;
    //     }
    //   } else {
    //     const isRemove = findNodeValue(node.right, value);
    //     if (isRemove === "remove") {
    //       node.right = node.right.right;
    //     }
    //   }
    // };

    // const isRemove = findNodeValue(this.treeRoot, data);
    // if (isRemove === "remove") {
    //   this.treeRoot = this.treeRoot.left;
    // }
  }

  removeNode(current, data) {
    // base case, if the tree is empty

    if (current === null) return current;

    // when value is the same as current's value, this is the node to be deleted

    if (data === current.data) {
      // for case 1 and 2, node without child or with one child

      if (current.left === null && current.right === null) {
        return null;
      } else if (current.left === null) {
        return current.right;
      } else if (current.right === null) {
        return current.left;
      } else {
        /// node with two children, get the inorder successor,
        //smallest in the right subtree

        let tempNode = this.kthSmallestNode(current.right);
        current.data = tempNode.data;

        /// delete the inorder successor

        current.right = this.removeNode(current.right, tempNode.data);
        return current;
      }

      // recur down the tree
    } else if (data < current.data) {
      current.left = this.removeNode(current.left, data);
      return current;
    } else {
      current.right = this.removeNode(current.right, data);
      return current;
    }
  }

  /// helper function to find the smallest node

  kthSmallestNode(node) {
    while (!node.left === null) node = node.left;

    return node;
  }

  min(node) {
    if (node === undefined) {
      return this.min(this.treeRoot);
    }
    if (node?.left?.data === null) {
      return node?.data;
    } else {
      return this.min(node?.left);
    }
  }

  max(node) {
    if (node === undefined) {
      return this.max(this.treeRoot);
    }
    if (node?.right?.data === null) {
      return node?.data;
    } else {
      return this.max(node?.right);
    }
  }
}

module.exports = {
  BinarySearchTree,
};
