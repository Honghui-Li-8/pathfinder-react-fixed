class QueueNode {
  constructor(node, priority) {
    this.node = node;
    this.priority = priority;
  }
}

class PriorityQueue {
  constructor() {
    this.queueItems = [];
  }

  enqueue(node, priority) {
    var tempQNode = new QueueNode(node, priority);
    var added = false;

    for (var i = 0; i < this.queueItems.length; i++) {
      if (priority < this.queueItems[i].priority) {
        // insert tempQNode to position i, delete 0 item

        var temp = this.queueItems.slice(0, i);
        temp.push(tempQNode);
        temp = temp.concat(this.queueItems.slice(i));
        this.queueItems = temp;
        added = true;
        break;
      }
    }

    // if not smaller than any / largest
    if (!added) {
      this.queueItems.push(tempQNode);
    }
  }

  popLowest() {
    // remove and return the lowest priority node
    // shift() remove front node
    if (this.isEmpty()) {
      return "empty";
    }

    return this.queueItems.shift();
  }

  popHighest() {
    // remove and return the highest priority node
    // pop() remove last node
    if (this.isEmpty()) {
      return "empty";
    }

    return this.queueItems.pop();
  }

  isEmpty() {
    // check length of array
    return this.queueItems.length === 0;
  }
}

export { QueueNode };
export default PriorityQueue;
