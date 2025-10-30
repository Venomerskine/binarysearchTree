class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

export class Tree {
  constructor(array) {
    const sortedUniqueArray = [...new Set(array)].sort((a, b) => a - b);
    this.root = this.buildTree(sortedUniqueArray, 0, sortedUniqueArray.length - 1);
  }


  buildTree(arr, start, end) {
    if (start > end) return null;

    const mid = Math.floor((start + end) / 2);
    const node = new Node(arr[mid]);

    node.left = this.buildTree(arr, start, mid - 1);
    node.right = this.buildTree(arr, mid + 1, end);

    return node;
  }


  insert(root, key) {
    if (root === null) return new Node(key);

    if (key < root.data)
      root.left = this.insert(root.left, key);
    else if (key > root.data)
      root.right = this.insert(root.right, key);

    return root;
  }


  getSuccessor(curr) {
    curr = curr.right;
    while (curr !== null && curr.left !== null)
      curr = curr.left;
    return curr;
  }


  delNode(root = this.root, x) {
    if (root === null) return root;

    if (x < root.data)
      root.left = this.delNode(root.left, x);
    else if (x > root.data)
      root.right = this.delNode(root.right, x);
    else {

      if (root.left === null) return root.right;
      if (root.right === null) return root.left;

      const succ = this.getSuccessor(root);
      root.data = succ.data;
      root.right = this.delNode(root.right, succ.data);
    }
    return root;
  }

  find(root = this.root, value){
    if (root === null) return null;

    if (root.data === value){
      return root
    } else if(value > root.data){
      this.find(root.right, value)
    } else {
      this.find(root.left, value)
    }
  }

levelOrderForEach(callback) {
  if (typeof callback !== 'function') {
    throw new Error('A callback function is required');
  }

  if (!this.root) return;

  const queue = [this.root];

  while (queue.length > 0) {
    const current = queue.shift();
    callback(current); 

    if (current.left) queue.push(current.left);
    if (current.right) queue.push(current.right);
  }
}

inOrderForEach(callback, node = this.root) {
  if (typeof callback !== 'function') {
    throw new Error('A callback function is required');
  }

  if (node === null) return;

  this.inOrderForEach(callback, node.left); 
  callback(node);                           
  this.inOrderForEach(callback, node.right); 
}

preOrderForEach(callback, node = this.root) {
  if (typeof callback !== 'function') {
    throw new Error('A callback function is required');
  }

  if (node === null) return;

  callback(node);                            
  this.preOrderForEach(callback, node.left); 
  this.preOrderForEach(callback, node.right);
}

postOrderForEach(callback, node = this.root) {
  if (typeof callback !== 'function') {
    throw new Error('A callback function is required');
  }

  if (node === null) return;

  this.postOrderForEach(callback, node.left); 

  this.postOrderForEach(callback, node.right); 
  callback(node);                              
}

height(value, node = this.root) {
  if (node === null) return -1; 

  if (node.data === value) {
    return this.#nodeHeight(node);
  } else if (value < node.data) {
    return this.height(value, node.left);
  } else {
    return this.height(value, node.right);
  }
}

#nodeHeight(node) {
  if (node === null) return -1;
  const leftHeight = this.#nodeHeight(node.left);
  const rightHeight = this.#nodeHeight(node.right);
  return 1 + Math.max(leftHeight, rightHeight);
}

depth(value, node = this.root, currentDepth = 0) {
  if (node === null) return null; // Value not found
  if (node.value === value) return currentDepth;

  if (value < node.value) {
    return this.depth(value, node.left, currentDepth + 1);
  } else {
    return this.depth(value, node.right, currentDepth + 1);
  }
}

isBalanced(node = this.root) {
  if (node === null) return true;

  const leftHeight = this._height(node.left);
  const rightHeight = this._height(node.right);

  const balanceFactor = Math.abs(leftHeight - rightHeight);

  return (
    balanceFactor <= 1 &&
    this.isBalanced(node.left) &&
    this.isBalanced(node.right)
  );
}


_height(node) {
  if (node === null) return -1;
  return 1 + Math.max(this._height(node.left), this._height(node.right));
}

rebalance() {
  if (this.isBalanced()) return this.root; 

  const values = [];
  this.inOrderForEach(node => values.push(node.value));
  this.root = this.buildTree(values);
  return this.root;
}


}