/**
* traversing all node of DOM's tree
*/
var walkDom = function walk(node, func){
	func(node);
	node = node.firstChild;
	while(node){
		walk(node, func);
		node = node.nextSibling;
	}
}