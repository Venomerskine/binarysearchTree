import { Tree } from "./binarySearchTrees.js";

// Generate a random array of numbers < 100
function randomArray(size = 10, max = 100) {
  const arr = [];
  for (let i = 0; i < size; i++) {
    arr.push(Math.floor(Math.random() * max));
  }
  return arr;
}

// 1. Create a balanced BST from random numbers
const array = randomArray(15);
const tree = new Tree(array);

console.log("Initial array:", array);
console.log("Tree created.");

// 2. Confirm that the tree is balanced
console.log("Is the tree balanced?", tree.isBalanced());

// 3. Print all traversals
console.log("Level order:");
tree.levelOrderForEach(node => console.log(node.data));

console.log("Pre-order:");
tree.preOrderForEach(node => console.log(node.data));

console.log("Post-order:");
tree.postOrderForEach(node => console.log(node.data));

console.log("In-order:");
tree.inOrderForEach(node => console.log(node.data));

// 4. Unbalance the tree by adding several large numbers (> 100)
[120, 130, 150, 160, 200, 250].forEach(num => tree.insert(tree.root, num));

// 5. Confirm that the tree is now unbalanced
console.log("Is the tree balanced after inserting >100 values?", tree.isBalanced());

// 6. Rebalance the tree
tree.rebalance();

// 7. Confirm that the tree is balanced again
console.log("Is the tree balanced after rebalancing?", tree.isBalanced());

// 8. Print all traversals again
console.log("Level order (rebalanced):");
tree.levelOrderForEach(node => console.log(node.data));

console.log("Pre-order (rebalanced):");
tree.preOrderForEach(node => console.log(node.data));

console.log("Post-order (rebalanced):");
tree.postOrderForEach(node => console.log(node.data));

console.log("In-order (rebalanced):");
tree.inOrderForEach(node => console.log(node.data));
